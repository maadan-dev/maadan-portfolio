import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFellowshipOG() {
  console.log('Launching headless browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport to exact OG image size
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  const templatePath = path.join(__dirname, 'fellowship-og-template.html');
  await page.goto(`file://${templatePath}`, { waitUntil: 'networkidle0' });

  // Read images as base64 data URLs for reliable local loading
  const logoPath = path.join(__dirname, '..', 'public', 'logo_horizontal.png');
  const photoPath = path.join(__dirname, '..', 'public', 'images', 'fellowship-working.jpg');

  const logoBase64 = fs.existsSync(logoPath)
    ? `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`
    : '';

  const photoBase64 = fs.existsSync(photoPath)
    ? `data:image/jpeg;base64,${fs.readFileSync(photoPath).toString('base64')}`
    : '';

  await page.evaluate(({ logo, photo }) => {
    const logoEl = document.getElementById('brandLogo');
    const photoEl = document.getElementById('fellowshipPhoto');

    if (logoEl && logo) logoEl.src = logo;
    if (photoEl && photo) photoEl.src = photo;
  }, { logo: logoBase64, photo: photoBase64 });

  // Wait for Google fonts and image repaint to settle
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Ensure destination directory exists
  const outputDir = path.join(__dirname, '..', 'public', 'og');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'fellowship.jpg');
  await page.screenshot({
    path: outputPath,
    type: 'jpeg',
    quality: 92,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });

  await browser.close();
  console.log(`Fellowship OG image generated successfully at: ${outputPath}`);
}

generateFellowshipOG().catch((err) => {
  console.error('Error generating Fellowship OG image:', err);
  process.exit(1);
});
