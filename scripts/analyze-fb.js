const fs = require('fs');
const html = fs.readFileSync('fb_og.html', 'utf8');

// Find og:image
const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
if (ogImageMatch) {
  console.log('OG Image URL:', ogImageMatch[1].replace(/&amp;/g, '&'));
}

// Find all URLs in the HTML
const urlRegex = /https:\\\/\\\/[a-zA-Z0-9.-]+\.fbcdn\.net\\\/[^"\\]+/g;
const fbcdn = html.match(urlRegex) || [];
console.log('fbcdn links:', fbcdn.length);
fbcdn.slice(0, 5).forEach(u => console.log(u.replace(/\\\//g, '/')));

// Search for mentions of color, hex codes, or posts
const hexRegex = /#[0-9a-fA-F]{6}/g;
const hexes = [...new Set(html.match(hexRegex) || [])];
console.log('Found hex colors in page:', hexes);

// Let's print the title and description
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
console.log('Page Title:', titleMatch ? titleMatch[1] : 'None');

// Search for bio or about text
const aboutMatch = html.match(/"description":{"text":"([^"]+)"}/);
console.log('About match:', aboutMatch ? aboutMatch[1] : 'None');
