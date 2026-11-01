import re

with open('fb_photos.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

print('Length:', len(text))
for m in re.findall(r'<meta property="og:[^"]+" content="[^"]+"', text):
    print(m)

urls = re.findall(r'https?://[^\s"\'<>\\]+', text)
fb_imgs = [u for u in urls if 'lookaside' in u or 'fbsbx' in u or 'scontent' in u]
print('Total FB image/media URLs:', len(fb_imgs))
unique_imgs = list(set(fb_imgs))
for i, u in enumerate(unique_imgs[:10]):
    print(f'[{i+1}] {u}')
