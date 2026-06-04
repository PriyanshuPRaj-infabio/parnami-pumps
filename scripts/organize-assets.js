const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../public');
const DEST_DIR = path.join(__dirname, '../public/assets/images');

const mapping = {
  "AIR WATER NITROGEN LPG dISTRIBUTION PIPING": "air-water-nitrogen-lpg-distribution-piping.png",
  "CHILLED WATER DISTRIBUTION PIPING": "chilled-water-distribution-piping.png",
  "Compressed Air system": "compressed-air-system.png",
  "Cooling Tower": "cooling-tower.png",
  "Designer Tiles": "designer-tiles.webp",
  "DTH boring": "dth-boring.png",
  "EXECUTIVE DINING": "executive-dining.jpg",
  "FENESTA DOOR & WINDOWS": "fenesta-doors-windows.jpg",
  "Fire hydrant & FHR": "fire-hydrant-fhr.webp",
  "Fire hydrant Piping": "fire-hydrant-piping.webp",
  "Fire hydrant Pumping": "fire-hydrant-pumping-legacy.jpg",
  "fire hydrant pumping.png": "fire-hydrant-pumping.png",
  "Fire Panel": "fire-panel.jpg",
  "Fire sprinklers": "fire-sprinklers.webp",
  "FIRE Water Curtain": "fire-water-curtain.jpg",
  "gAS dETECTOR": "gas-detector.png",
  "gAS DETECTOR": "gas-detector-alt.png",
  "gas flooding System": "gas-flooding-system.jpg",
  "gas PRESSURE REGULATING sTATION": "gas-pressure-regulating-station.jpg",
  "hand wash, urinals and cubicals": "hand-wash-urinals-cubicles.png",
  "Hindware": "hindware.png",
  "Hot Water Generator": "hot-water-generator.png",
  "HSD pumping station": "hsd-pumping-station.png",
  "HSD service tank": "hsd-service-tank.png",
  "HSD storage yard": "hsd-storage-yard.png",
  "Industrial finishing": "industrial-finishing.jpg",
  "jaquar": "jaquar.png",
  "JAQUAR GeysErs": "jaquar-geysers.jpg",
  "JAQUAR hand showers and faucets": "jaquar-faucets.jpg",
  "Jaquar Lights": "jaquar-lights.jpg",
  "Kohler": "kohler.jpg",
  "pantry sinks and cabinets": "pantry-sinks-cabinets.jpg",
  "RECEPTION ENTRIES": "reception-entries.webp",
  "Ro Water processing system": "ro-water-processing-system.png",
  "Satish Parnami": "satish-parnami.jpg",
  "SS Railing": "ss-railing.png",
  "Ss Safety wash enclosures": "ss-safety-wash-enclosures.png",
  "Steam distribution header": "steam-distribution-header.png",
  "Steam distribution piping": "steam-distribution-piping.webp",
  "TOTO": "toto.jpg",
  "UNDERGROUND HSD storage tank": "underground-hsd-storage-tank.png",
  "wall and floor tiles": "wall-floor-tiles.png",
  "wash basins and urinals": "wash-basins-urinals-retail.webp",
  "Water Supply system": "water-supply-system.jpg",
  "Y.R.Pasrija": "yr-pasrija.jpg",
  "about us": "about-us.webp"
};

// Create destination dir if not exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

console.log('Starting image copy and rename operation...');

Object.entries(mapping).forEach(([srcName, destName]) => {
  const srcPath = path.join(SOURCE_DIR, srcName);
  const destPath = path.join(DEST_DIR, destName);

  if (fs.existsSync(srcPath)) {
    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Successfully copied: "${srcName}" -> "${destName}"`);
    } catch (err) {
      console.error(`Error copying "${srcName}":`, err);
    }
  } else {
    console.warn(`Source file not found: "${srcName}"`);
  }
});

console.log('Copy operation completed.');
