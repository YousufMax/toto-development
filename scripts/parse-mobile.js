const fs = require('fs');
const html = fs.readFileSync('fb_mobile.html', 'utf8');

const imgRegex = /https:\/\/[^"'\s<>]+\.(?:jpg|jpeg|png|webp)[^"'\s<>]*/gi;
const imgs = Array.from(new Set(html.match(imgRegex) || [])).map(u => u.replace(/&amp;/g, '&'));
console.log('Mobile HTML images count:', imgs.length);
imgs.forEach((u, i) => console.log(`[${i+1}] ${u}`));
