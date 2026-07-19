/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

const sharp = require('sharp');
const path = require('path');

async function processIcon() {
  const inputFile = path.join(__dirname, '..', 'resources', 'icons', 'aera-logo.png');
  const outputFile = path.join(__dirname, '..', 'resources', 'icons', 'aera-icon-square.png');

  try {
    await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: { r: 5, g: 10, b: 20, alpha: 1 } 
      }
    })
    .composite([
      {
        input: await sharp(inputFile).resize(800, 800, { fit: 'contain' }).toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toFile(outputFile);

    console.log("Successfully created perfectly squared background icon.");
  } catch (err) {
    console.error("Error modifying icon:", err);
  }
}

processIcon();