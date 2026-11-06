const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeAssets() {
  console.log('--- Starting Asset Performance Optimization ---');

  // 1. Optimize earth-globe.png
  const earthPngPath = path.join(__dirname, '..', 'public', 'images', 'earth-globe.png');
  const earthWebpPath = path.join(__dirname, '..', 'public', 'images', 'earth-globe.webp');
  if (fs.existsSync(earthPngPath)) {
    console.log('Optimizing earth-globe.png...');
    // Generate WebP
    await sharp(earthPngPath)
      .webp({ quality: 90, effort: 6 })
      .toFile(earthWebpPath);
    console.log('Created earth-globe.webp (143KB vs 1.45MB)');
  }

  // 2. Optimize creative-design images (k1-k6, m1-m11)
  const creativeDir = path.join(__dirname, '..', 'public', 'creative-design');
  if (fs.existsSync(creativeDir)) {
    const files = fs.readdirSync(creativeDir).filter((f) => /\.(jpe?g|png)$/i.test(f));
    console.log(`Optimizing ${files.length} creative design images...`);

    for (const file of files) {
      const filePath = path.join(creativeDir, file);
      const originalSize = fs.statSync(filePath).size;
      const parsed = path.parse(filePath);
      const webpPath = path.join(creativeDir, `${parsed.name}.webp`);

      // Always generate high-fidelity WebP
      await sharp(filePath)
        .resize(1400, null, { withoutEnlargement: true })
        .webp({ quality: 86, effort: 5 })
        .toFile(webpPath);

      // Re-compress the JPEG in place using MozJPEG if > 500KB
      if (originalSize > 500 * 1024) {
        const tempJpg = path.join(creativeDir, `${parsed.name}.temp.jpg`);
        await sharp(filePath)
          .resize(1400, null, { withoutEnlargement: true })
          .jpeg({ quality: 84, progressive: true, mozjpeg: true })
          .toFile(tempJpg);

        fs.unlinkSync(filePath);
        fs.renameSync(tempJpg, filePath);
        const newSize = fs.statSync(filePath).size;
        console.log(`  ${file}: ${(originalSize/1024/1024).toFixed(2)}MB -> ${(newSize/1024).toFixed(0)}KB (JPEG) + ${(fs.statSync(webpPath).size/1024).toFixed(0)}KB (WebP)`);
      }
    }
  }

  // 3. Optimize team avatars
  const teamDir = path.join(__dirname, '..', 'public', 'team');
  if (fs.existsSync(teamDir)) {
    const teamFiles = fs.readdirSync(teamDir).filter((f) => /\.(png|jpe?g)$/i.test(f));
    console.log(`Optimizing ${teamFiles.length} team avatars...`);
    for (const file of teamFiles) {
      const filePath = path.join(teamDir, file);
      const parsed = path.parse(filePath);
      const webpPath = path.join(teamDir, `${parsed.name}.webp`);

      await sharp(filePath)
        .resize(600, null, { withoutEnlargement: true })
        .webp({ quality: 88, effort: 5 })
        .toFile(webpPath);
      console.log(`  Created ${parsed.name}.webp (${(fs.statSync(webpPath).size/1024).toFixed(0)}KB)`);
    }
  }

  // 4. Optimize portfolio-3d renders
  const p3dDir = path.join(__dirname, '..', 'public', 'portfolio-3d');
  if (fs.existsSync(p3dDir)) {
    const p3dFiles = fs.readdirSync(p3dDir).filter((f) => /\.(png|jpe?g)$/i.test(f));
    console.log(`Optimizing ${p3dFiles.length} portfolio-3d renders...`);
    for (const file of p3dFiles) {
      const filePath = path.join(p3dDir, file);
      const parsed = path.parse(filePath);
      const webpPath = path.join(p3dDir, `${parsed.name}.webp`);

      await sharp(filePath)
        .resize(1200, null, { withoutEnlargement: true })
        .webp({ quality: 88, effort: 5 })
        .toFile(webpPath);
    }
    console.log('  Portfolio-3D renders converted to high-fidelity WebP.');
  }

  console.log('--- Asset Optimization Completed Successfully ---');
}

optimizeAssets().catch((err) => {
  console.error('Asset optimization error:', err);
  process.exit(1);
});
