const fs = require('fs');
const html = fs.readFileSync('fb_og.html', 'utf8');

const mediaIds = [...html.matchAll(/media_id=(\d+)/g)].map(m => m[1]);
console.log('Unique Media IDs:', [...new Set(mediaIds)]);

const scontent = [...html.matchAll(/(https:\\\/\\\/[^"'\s\\]*fbcdn[^"'\s\\]*)/g)].map(m => m[1]);
console.log('FBCDN URLs:', scontent.length);
const cleanUrls = [...new Set(scontent)].map(u => u.replace(/\\\//g, '/').replace(/&amp;/g, '&')).filter(u => u.includes('.jpg') || u.includes('.png'));
console.log('Image URLs:', cleanUrls.length);
cleanUrls.slice(0, 10).forEach((u, i) => console.log(`[${i+1}] ${u}`));
