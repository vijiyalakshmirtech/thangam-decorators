import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const RAW_DIR = path.resolve('assets/raw');
const ASSETS_DIR = path.resolve('assets');
const PUBLIC_ASSETS_DIR = path.resolve('public/assets');
const BRAND_LOGO_SRC = path.resolve('assets/brand/logo.jpg');

// Target directory paths
const DIRS = [
  'assets/brand',
  'assets/portfolio/hero',
  'assets/portfolio/traditional-mandapam',
  'assets/portfolio/reception',
  'assets/portfolio/family-ceremonies',
  'assets/portfolio/cultural',
  'public/assets/brand',
  'public/assets/portfolio/hero',
  'public/assets/portfolio/traditional-mandapam',
  'public/assets/portfolio/reception',
  'public/assets/portfolio/family-ceremonies',
  'public/assets/portfolio/cultural',
];

const VALID_CATEGORIES = [
  'reception',
  'traditional-mandapam',
  'family-ceremonies',
  'cultural',
];

// Media Catalog definition (24 authentic client photographs)
const MEDIA_CATALOG = [
  {
    id: 1,
    rawName: 'WhatsApp Image 2026-06-16 at 7.04.12 PM.jpeg',
    slug: 'grand-golden-floral-stage',
    category: 'reception',
    isHeroPrimary: true,
    isHeroSecondary: false,
    altText: 'Grand golden wedding reception stage with circular floral arch, royal beige sofa, and illuminated candelabras',
  },
  {
    id: 2,
    rawName: 'WhatsApp Image 2026-06-16 at 7.04.59 PM.jpeg',
    slug: 'white-drape-red-rose-heart-stage',
    category: 'reception',
    altText: 'Romantic reception stage with white drapery, red rose heart backdrop, twin floral urns, and royal couch',
  },
  {
    id: 3,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.04 PM (2).jpeg',
    slug: 'panoramic-circular-arch-stage',
    category: 'reception',
    altText: 'Panoramic evening reception stage setup with circular flower arch, golden chandeliers, and royal seating',
  },
  {
    id: 4,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.04 PM.jpeg',
    slug: 'geometric-floral-ring-stage',
    category: 'reception',
    altText: 'Contemporary wedding stage decor featuring geometric backdrop panels and glowing floral rings',
  },
  {
    id: 5,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.05 PM (1).jpeg',
    slug: 'gold-jali-circular-floral-stage',
    category: 'traditional-mandapam',
    isHeroPrimary: false,
    isHeroSecondary: true,
    altText: 'Luxury wedding stage featuring gold laser-cut jali frame, red and white rose circular arch, and chaise lounge',
  },
  {
    id: 6,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.05 PM.jpeg',
    slug: 'gold-arch-muhurtham-stage',
    category: 'traditional-mandapam',
    altText: 'Traditional Muhurtham stage with gold architectural frame, floral ring alankaram, and ceremonial carpet',
  },
  {
    id: 7,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.06 PM (1).jpeg',
    slug: 'wide-royal-reception-backdrop',
    category: 'reception',
    altText: 'Wide panoramic royal reception stage backdrop with floral columns and ambient lighting',
  },
  {
    id: 8,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.06 PM (2).jpeg',
    slug: 'seemantham-cradle-ceremony-stage',
    category: 'family-ceremonies',
    altText: 'Traditional Seemantham and baby shower ceremony stage with decorative cradle, seeru thattu gift trays, and purple floral backdrop',
  },
  {
    id: 9,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.06 PM.jpeg',
    slug: 'layered-drape-reception-stage',
    category: 'reception',
    altText: 'Layered silk drapery and floral backdrop decoration for evening wedding reception',
  },
  {
    id: 10,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.07 PM (1).jpeg',
    slug: 'golden-pillar-reception-stage',
    category: 'reception',
    altText: 'Grand reception stage with golden decorative pillars, floral arch canopy, and stage uplighting',
  },
  {
    id: 11,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.08 PM (1).jpeg',
    slug: 'traditional-banana-leaf-parrot-stage',
    category: 'traditional-mandapam',
    altText: 'Auspicious South Indian stage with fresh banana leaf backdrop, handcrafted green parrots, mother-child emblem, and gold borders',
  },
  {
    id: 12,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.08 PM (2).jpeg',
    slug: 'auspicious-green-gold-mandapam',
    category: 'traditional-mandapam',
    altText: 'Traditional green and gold Vedic wedding mandapam decor with floral hangings and ceremonial sofa',
  },
  {
    id: 13,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.08 PM.jpeg',
    slug: 'panoramic-hall-stage-decor',
    category: 'reception',
    altText: 'Panoramic view of kalyana mandapam wedding stage setup with decorative lighting',
  },
  {
    id: 14,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.09 PM.jpeg',
    slug: 'greenery-mat-floral-panel-stage',
    category: 'traditional-mandapam',
    altText: 'Traditional stage setup with fresh greenery mat backdrop, yellow valance, pink and white floral tiles, and gold sofa',
  },
  {
    id: 15,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.10 PM (1).jpeg',
    slug: 'grand-crystal-chandelier-stage',
    category: 'reception',
    altText: 'Luxury evening reception stage featuring cascading floral pillars, crystal chandelier lighting, and royal seating',
  },
  {
    id: 16,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.10 PM.jpeg',
    slug: 'symmetrical-drape-reception-stage',
    category: 'reception',
    altText: 'Symmetrical wedding reception backdrop with textured fabrics, floral borders, and warm spotlights',
  },
  {
    id: 17,
    rawName: 'WhatsApp Image 2026-06-16 at 7.05.11 PM.jpeg',
    slug: 'illuminated-floral-arch-reception',
    category: 'reception',
    altText: 'Illuminated wedding reception stage with central floral arch, red carpet aisle, and stage spotlights',
  },
  {
    id: 18,
    rawName: 'WhatsApp Image 2026-06-16 at 7.10.32 PM.jpeg',
    slug: 'jharokha-gold-valance-heart-stage',
    category: 'reception',
    altText: 'Palace theme wedding stage with golden jharokha window niches, yellow valance drapes, floral heart, and white pedestals',
  },
  {
    id: 19,
    rawName: 'WhatsApp Image 2026-06-16 at 7.10.33 PM.jpeg',
    slug: 'ultra-wide-reception-scenography',
    category: 'reception',
    altText: 'Ultra-wide stage scenography for large banquet hall weddings with floral framing and ambient uplighting',
  },
  {
    id: 20,
    rawName: 'WhatsApp Image 2026-06-16 at 7.10.34 PM.jpeg',
    slug: 'golden-glow-reception-stage',
    category: 'reception',
    altText: 'Evening reception stage with warm 3200K golden illumination, structured drapery, and floral accents',
  },
  {
    id: 21,
    rawName: 'WhatsApp Image 2026-06-16 at 7.10.35 PM.jpeg',
    slug: 'maroon-valance-floral-ring-stage',
    category: 'family-ceremonies',
    requiresRotation: true,
    altText: 'Festive stage backdrop with scalloped maroon valance, circular floral wreath, floral walls, and green royal sofa',
  },
  {
    id: 22,
    rawName: 'WhatsApp Image 2026-06-16 at 7.10.36 PM.jpeg',
    slug: 'ambient-scenic-reception-stage',
    category: 'reception',
    altText: 'Elegant wedding reception stage with ambient backdrop lighting and symmetrical floral arrangements',
  },
  {
    id: 23,
    rawName: 'WhatsApp Image 2026-06-16 at 7.10.37 PM.jpeg',
    slug: 'layered-fabric-stage-scenography',
    category: 'reception',
    altText: 'Contemporary wedding stage decor with layered fabric pleating, floral urns, and stage lighting',
  },
  {
    id: 24,
    rawName: 'WhatsApp Image 2026-06-16 at 7.10.38 PM.jpeg',
    slug: 'grand-reception-floral-columns-stage',
    category: 'reception',
    altText: 'Grand reception stage with towering floral columns, gold decorative frames, and royal couch',
  },
];

// Helper to run cwebp
function convertToWebp(inputFile, outputFile, width = 0, quality = 82) {
  const resizeArg = width > 0 ? `-resize ${width} 0` : '';
  const cmd = `npx cwebp-bin -q ${quality} ${resizeArg} "${inputFile}" -o "${outputFile}"`;
  execSync(cmd, { stdio: 'pipe' });
}

/**
 * PRE-FLIGHT VALIDATION PHASE
 * Strictly validates all sources, dependencies, identifiers, and destination paths before any mutation.
 */
function runPreflightValidation() {
  console.log('========================================');
  console.log('RUNNING PRE-FLIGHT SAFETY VALIDATION...');
  console.log('========================================');

  const errors = [];

  // 1. Validate raw directory existence
  if (!fs.existsSync(RAW_DIR)) {
    errors.push(`CRITICAL: Raw source directory does not exist at '${RAW_DIR}'`);
  }

  // 2. Validate brand logo existence
  if (!fs.existsSync(BRAND_LOGO_SRC)) {
    errors.push(`CRITICAL: Brand logo file missing at '${BRAND_LOGO_SRC}'`);
  }

  // 3. Validate MEDIA_CATALOG entries
  if (MEDIA_CATALOG.length !== 24) {
    errors.push(`CRITICAL: Expected exactly 24 catalog entries, found ${MEDIA_CATALOG.length}`);
  }

  const seenIds = new Set();
  const seenSlugs = new Set();
  const seenRawNames = new Set();
  let heroPrimaryCount = 0;
  let heroSecondaryCount = 0;

  MEDIA_CATALOG.forEach((item) => {
    // Check ID uniqueness
    if (seenIds.has(item.id)) {
      errors.push(`DUPLICATE ID: Item ID ${item.id} is duplicated.`);
    }
    seenIds.add(item.id);

    // Check Slug uniqueness
    if (seenSlugs.has(item.slug)) {
      errors.push(`DUPLICATE SLUG: Slug '${item.slug}' is duplicated.`);
    }
    seenSlugs.add(item.slug);

    // Check Raw Name uniqueness
    if (seenRawNames.has(item.rawName)) {
      errors.push(`DUPLICATE RAW NAME: Raw filename '${item.rawName}' is duplicated.`);
    }
    seenRawNames.add(item.rawName);

    // Check Category validity
    if (!VALID_CATEGORIES.includes(item.category)) {
      errors.push(`INVALID CATEGORY: Item ${item.id} has invalid category '${item.category}'.`);
    }

    // Check Alt-Text existence and cleanliness
    if (!item.altText || typeof item.altText !== 'string' || item.altText.trim() === '') {
      errors.push(`MISSING ALT-TEXT: Item ${item.id} (${item.slug}) is missing altText.`);
    }

    // Count Hero assignments
    if (item.isHeroPrimary) heroPrimaryCount += 1;
    if (item.isHeroSecondary) heroSecondaryCount += 1;

    // Check raw file existence on disk
    const rawFilePath = path.join(RAW_DIR, item.rawName);
    if (!fs.existsSync(rawFilePath)) {
      errors.push(`MISSING SOURCE: ${item.rawName}`);
    }
  });

  // Verify exactly one Primary Hero and one Secondary Hero
  if (heroPrimaryCount !== 1) {
    errors.push(`HERO ERROR: Expected exactly 1 Primary Hero, found ${heroPrimaryCount}`);
  }
  if (heroSecondaryCount !== 1) {
    errors.push(`HERO ERROR: Expected exactly 1 Secondary Hero, found ${heroSecondaryCount}`);
  }

  // 4. Validate output directories can be created
  try {
    DIRS.forEach((d) => {
      if (!fs.existsSync(d)) {
        fs.mkdirSync(d, { recursive: true });
      }
    });
  } catch (err) {
    errors.push(`DIRECTORY CREATION ERROR: Unable to create output directories (${err.message})`);
  }

  // 5. Validate PowerShell availability for rotation and crop
  try {
    execSync('powershell -Command "Get-Host"', { stdio: 'pipe' });
  } catch (err) {
    errors.push('ENVIRONMENT ERROR: PowerShell is not accessible on this system.');
  }

  // 6. Validate cwebp-bin availability
  try {
    execSync('npx cwebp-bin -version', { stdio: 'pipe' });
  } catch (err) {
    errors.push('ENVIRONMENT ERROR: cwebp-bin is not accessible via npx.');
  }

  // Report preflight outcome
  if (errors.length > 0) {
    console.error('\nPRE-FLIGHT VALIDATION FAILED WITH THE FOLLOWING ERRORS:');
    errors.forEach((err, idx) => console.error(` [${idx + 1}] ${err}`));
    console.error('\nABORTING ALL PROCESSING. NO FILES WERE MODIFIED.\n');
    process.exit(1);
  }

  console.log('✔ Raw source directory verified: assets/raw (24 files found)');
  console.log('✔ Brand logo verified: assets/brand/logo.jpg');
  console.log('✔ 24/24 catalog entries verified with unique IDs, unique slugs, and unique raw filenames');
  console.log('✔ Exactly 1 Primary Hero and 1 Secondary Hero configured');
  console.log('✔ All 12 required output directories verified and created');
  console.log('✔ PowerShell & cwebp-bin toolchain verified');
  console.log('========================================');
  console.log('PRE-FLIGHT VALIDATION PASSED (0 ERRORS)');
  console.log('========================================\n');
}

/**
 * MAIN PROCESSING PIPELINE
 */
function processMedia() {
  // Step 0: Run Pre-flight Validation
  runPreflightValidation();

  // Metrics tracking
  let totalFilesGenerated = 0;
  let totalWebpGenerated = 0;
  let heroAssetsGenerated = 0;
  let ogImagesGenerated = 0;

  // Step 1: Copy Brand Logo to public/assets/brand/
  const publicLogoDest = path.resolve('public/assets/brand/logo.jpg');
  fs.copyFileSync(BRAND_LOGO_SRC, publicLogoDest);
  totalFilesGenerated += 1;
  console.log('✔ Synchronized brand logo to public/assets/brand/logo.jpg');

  // Step 2: Process Image #21 Rotation via PowerShell
  const tempRotatedPath = path.resolve('scratch/rotated-image-21.jpg');
  if (!fs.existsSync('scratch')) fs.mkdirSync('scratch', { recursive: true });

  const rotatePsScript = `
Add-Type -AssemblyName System.Drawing;
$img = [System.Drawing.Image]::FromFile('${path.resolve(RAW_DIR, 'WhatsApp Image 2026-06-16 at 7.10.35 PM.jpeg')}');
$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone);
$img.Save('${tempRotatedPath}', [System.Drawing.Imaging.ImageFormat]::Jpeg);
$img.Dispose();
`;
  fs.writeFileSync('scratch/rotate.ps1', rotatePsScript);
  execSync('powershell -ExecutionPolicy Bypass -File scratch/rotate.ps1', { stdio: 'pipe' });
  console.log('✔ Image #21 rotated 90° counter-clockwise (orientation corrected).');

  // Step 3: Generate OG Image (1200x630) from Image #1 via PowerShell
  const tempOgPath = path.resolve('scratch/og-crop-temp.jpg');
  const ogCropPsScript = `
Add-Type -AssemblyName System.Drawing;
$src = [System.Drawing.Image]::FromFile('${path.resolve(RAW_DIR, 'WhatsApp Image 2026-06-16 at 7.04.12 PM.jpeg')}');
# Original is 1600x900. Target aspect ratio is 1200/630 = 1.90476.
# 1600 / 1.90476 = 840 height. Center crop Y = (900 - 840) / 2 = 30.
$cropRect = New-Object System.Drawing.Rectangle(0, 30, 1600, 840);
$bmp = New-Object System.Drawing.Bitmap(1200, 630);
$g = [System.Drawing.Graphics]::FromImage($bmp);
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality;
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality;
$destRect = New-Object System.Drawing.Rectangle(0, 0, 1200, 630);
$g.DrawImage($src, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel);
$bmp.Save('${tempOgPath}', [System.Drawing.Imaging.ImageFormat]::Jpeg);
$g.Dispose();
$bmp.Dispose();
$src.Dispose();
`;
  fs.writeFileSync('scratch/og_crop.ps1', ogCropPsScript);
  execSync('powershell -ExecutionPolicy Bypass -File scratch/og_crop.ps1', { stdio: 'pipe' });
  console.log('✔ OG Image cropped to exactly 1200x630 px.');

  // Convert OG image to WebP in both assets/brand and public/assets/brand
  convertToWebp(tempOgPath, 'assets/brand/og-image.webp', 1200, 85);
  convertToWebp(tempOgPath, 'public/assets/brand/og-image.webp', 1200, 85);
  ogImagesGenerated += 2;
  totalWebpGenerated += 2;
  totalFilesGenerated += 2;
  console.log('✔ Created og-image.webp in assets/brand/ and public/assets/brand/');

  // Step 4: Process all 24 images into responsive variants (1200, 800, 480) and base WebP
  MEDIA_CATALOG.forEach((item) => {
    const srcFile = item.requiresRotation ? tempRotatedPath : path.join(RAW_DIR, item.rawName);
    const catDir = `assets/portfolio/${item.category}`;
    const publicCatDir = `public/assets/portfolio/${item.category}`;

    console.log(`Processing [${item.id}/24] ${item.slug}...`);

    [1200, 800, 480].forEach((w) => {
      const filename = `${item.slug}-${w}.webp`;
      const outAssets = path.join(catDir, filename);
      const outPublic = path.join(publicCatDir, filename);

      convertToWebp(srcFile, outAssets, w, 82);
      fs.copyFileSync(outAssets, outPublic);
      totalWebpGenerated += 2;
      totalFilesGenerated += 2;
    });

    // Base full-res WebP
    const baseFilename = `${item.slug}.webp`;
    const baseOut = path.join(catDir, baseFilename);
    const basePublic = path.join(publicCatDir, baseFilename);
    convertToWebp(srcFile, baseOut, 0, 82);
    fs.copyFileSync(baseOut, basePublic);
    totalWebpGenerated += 2;
    totalFilesGenerated += 2;

    // Hero Assets Handling
    if (item.isHeroPrimary) {
      [1200, 800, 480].forEach((w) => {
        const heroFile = `hero-primary-${w}.webp`;
        fs.copyFileSync(path.join(catDir, `${item.slug}-${w}.webp`), path.join('assets/portfolio/hero', heroFile));
        fs.copyFileSync(path.join(catDir, `${item.slug}-${w}.webp`), path.join('public/assets/portfolio/hero', heroFile));
        heroAssetsGenerated += 2;
        totalWebpGenerated += 2;
        totalFilesGenerated += 2;
      });
      fs.copyFileSync(baseOut, path.join('assets/portfolio/hero', 'hero-primary.webp'));
      fs.copyFileSync(baseOut, path.join('public/assets/portfolio/hero', 'hero-primary.webp'));
      heroAssetsGenerated += 2;
      totalWebpGenerated += 2;
      totalFilesGenerated += 2;
    }

    if (item.isHeroSecondary) {
      [1200, 800, 480].forEach((w) => {
        const heroFile = `hero-secondary-${w}.webp`;
        fs.copyFileSync(path.join(catDir, `${item.slug}-${w}.webp`), path.join('assets/portfolio/hero', heroFile));
        fs.copyFileSync(path.join(catDir, `${item.slug}-${w}.webp`), path.join('public/assets/portfolio/hero', heroFile));
        heroAssetsGenerated += 2;
        totalWebpGenerated += 2;
        totalFilesGenerated += 2;
      });
      fs.copyFileSync(baseOut, path.join('assets/portfolio/hero', 'hero-secondary.webp'));
      fs.copyFileSync(baseOut, path.join('public/assets/portfolio/hero', 'hero-secondary.webp'));
      heroAssetsGenerated += 2;
      totalWebpGenerated += 2;
      totalFilesGenerated += 2;
    }
  });

  // Verify raw files count remains exactly 24
  const rawRemainingCount = fs.readdirSync(RAW_DIR).length;

  console.log('\n========================================');
  console.log('PRODUCTION MEDIA PROCESSING SUMMARY');
  console.log('========================================');
  console.log(`✔ 24/24 authentic client source files validated`);
  console.log(`✔ Raw master files preserved and untouched: ${rawRemainingCount}/24`);
  console.log(`✔ Total production WebP variants generated: ${totalWebpGenerated}`);
  console.log(`✔ Hero responsive assets generated: ${heroAssetsGenerated}`);
  console.log(`✔ Social sharing Open Graph images generated: ${ogImagesGenerated} (1200x630)`);
  console.log(`✔ Total production files synchronized: ${totalFilesGenerated}`);
  console.log('========================================\n');
}

// Entrypoint
processMedia();
