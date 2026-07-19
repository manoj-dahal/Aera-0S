/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

const Jimp = require('jimp');

async function inspectAndCrop() {
  const image = await Jimp.read('resources/icons/aera-icon-square.png');
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  console.log(`Original Dimensions: ${width}x${height}`);

  const size = Math.min(width, height);
  const x = (width - size) / 2;
  const y = (height - size) / 2;

  console.log(`Cropping to: ${size}x${size} at (${x}, ${y})`);
  
  image.crop(x, y, size, size);
  await image.writeAsync('resources/icons/aera-icon-square.png');
  console.log('Successfully cropped to square!');
}

inspectAndCrop().catch(console.error);
