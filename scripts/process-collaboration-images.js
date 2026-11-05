const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const baseDir = path.join(process.cwd(), 'public', 'images', 'for-collaboration');

const dirs = [
  path.join(baseDir, 'print-media'),
  path.join(baseDir, 'tv-media'),
  path.join(baseDir, 'recognitions'),
  path.join(baseDir, 'collaborations')
];

dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

async function processAll() {
  // 1. Print media
  const printMediaSrc = path.join(process.cwd(), 'for-collaboration-images', 'Print Media Coverage');
  const printFiles = fs.readdirSync(printMediaSrc).filter(f => f.endsWith('.png'));
  for (const f of printFiles) {
    const src = path.join(printMediaSrc, f);
    const dest = path.join(baseDir, 'print-media', f);
    fs.copyFileSync(src, dest);
    const webpDest = path.join(baseDir, 'print-media', f.replace('.png', '.webp'));
    await sharp(src).webp({ quality: 90 }).toFile(webpDest);
  }
  console.log('Print media processed:', printFiles.length);

  // 2. TV media
  const tvMediaSrc = path.join(process.cwd(), 'for-collaboration-images', 'T.V Media Coverage');
  const tvFiles = fs.readdirSync(tvMediaSrc).filter(f => f.endsWith('.png'));
  for (const f of tvFiles) {
    const src = path.join(tvMediaSrc, f);
    let outName = f;
    if (f.startsWith('Screenshot')) {
      outName = 'cnbc.png';
    }
    const dest = path.join(baseDir, 'tv-media', outName);
    fs.copyFileSync(src, dest);
    const webpDest = path.join(baseDir, 'tv-media', outName.replace('.png', '.webp'));
    await sharp(src).webp({ quality: 90 }).toFile(webpDest);
  }
  console.log('TV media processed:', tvFiles.length);

  // 3. Top Recognitions
  const recogSrc = path.join(process.cwd(), 'for-collaboration-images', 'top recognisation and achievements');
  const recogFiles = fs.readdirSync(recogSrc).filter(f => f.endsWith('.png')).sort();
  for (let i = 0; i < recogFiles.length; i++) {
    const src = path.join(recogSrc, recogFiles[i]);
    const num = i + 1;
    const outPng = path.join(baseDir, 'recognitions', 'recog-' + num + '.png');
    const outWebp = path.join(baseDir, 'recognitions', 'recog-' + num + '.webp');
    await sharp(src).webp({ quality: 88 }).toFile(outWebp);
    await sharp(src).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(outPng);
  }
  console.log('Top recognitions processed:', recogFiles.length);

  // 4. Collaboration
  const collabSrc = path.join(process.cwd(), 'for-collaboration-images', 'Collaboration');
  const collabFiles = fs.readdirSync(collabSrc).filter(f => f.endsWith('.png')).sort();
  for (let i = 0; i < collabFiles.length; i++) {
    const src = path.join(collabSrc, collabFiles[i]);
    const num = i + 1;
    const outPng = path.join(baseDir, 'collaborations', 'collab-' + num + '.png');
    const outWebp = path.join(baseDir, 'collaborations', 'collab-' + num + '.webp');
    await sharp(src).webp({ quality: 90 }).toFile(outWebp);
    fs.copyFileSync(src, outPng);
  }
  console.log('Collaborations processed:', collabFiles.length);
}

processAll().catch(err => {
  console.error(err);
  process.exit(1);
});
