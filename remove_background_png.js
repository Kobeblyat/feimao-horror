const fs = require('fs');
const zlib = require('zlib');

// Read fatcat.png
const fileBuf = fs.readFileSync('assets/fatcat.png');

// Find IHDR
let pos = 8;
let width = 0, height = 0, bitDepth = 0, colorType = 0;
let idatChunks = [];

while (pos < fileBuf.length) {
  const len = fileBuf.readUInt32BE(pos);
  const type = fileBuf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = fileBuf.readUInt32BE(pos + 8);
    height = fileBuf.readUInt32BE(pos + 12);
    bitDepth = fileBuf.readUInt8(pos + 16);
    colorType = fileBuf.readUInt8(pos + 17);
    console.log(`PNG Dimensions: ${width}x${height}, BitDepth: ${bitDepth}, ColorType: ${colorType}`);
  } else if (type === 'IDAT') {
    idatChunks.push(fileBuf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const idatConcat = Buffer.concat(idatChunks);
const rawData = zlib.inflateSync(idatConcat);

const bytesPerPixel = (colorType === 6) ? 4 : 3;
const stride = 1 + width * bytesPerPixel;
console.log(`Decompressed bytes: ${rawData.length}, expected: ${height * stride}`);

// Create RGBA decompressed buffer
const outStride = 1 + width * 4;
const outRaw = Buffer.alloc(height * outStride);

for (let y = 0; y < height; y++) {
  const inRowStart = y * stride;
  const outRowStart = y * outStride;
  outRaw[outRowStart] = 0; // filter type 0 (None)

  for (let x = 0; x < width; x++) {
    const inPixel = inRowStart + 1 + x * bytesPerPixel;
    const outPixel = outRowStart + 1 + x * 4;

    const r = rawData[inPixel];
    const g = rawData[inPixel + 1];
    const b = rawData[inPixel + 2];

    // Determine if pixel belongs to the cat
    // Black cat body: dark grey/black
    // Pink blush: pink cheeks
    // Whiskers/eyes/belly X: dark/pink
    const isDark = (r < 75 && g < 75 && b < 75);
    const isPink = (r > 180 && g > 130 && b > 150) || (r > 200 && g > 150 && b > 170) || (r > 160 && g < 150 && b > 130);
    
    outRaw[outPixel] = r;
    outRaw[outPixel + 1] = g;
    outRaw[outPixel + 2] = b;

    if (isDark || isPink) {
      // Keep cat opaque
      outRaw[outPixel + 3] = 255;
    } else {
      // Background sky / building -> Make 100% transparent!
      outRaw[outPixel + 3] = 0;
    }
  }
}

// Compress RGBA data
const newIdat = zlib.deflateSync(outRaw);

// Build PNG
function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4);
  data.copy(chunk, 8);

  // CRC32
  const crc = crc32(chunk.slice(4, 8 + len));
  chunk.writeInt32BE(crc, 8 + len);
  return chunk;
}

// Simple CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff);
}

// IHDR data for RGBA (colorType = 6)
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(width, 0);
ihdrData.writeUInt32BE(height, 4);
ihdrData.writeUInt8(8, 8); // bit depth
ihdrData.writeUInt8(6, 9); // color type RGBA
ihdrData.writeUInt8(0, 10);
ihdrData.writeUInt8(0, 11);
ihdrData.writeUInt8(0, 12);

const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdrChunk = makeChunk('IHDR', ihdrData);
const idatChunk = makeChunk('IDAT', newIdat);
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const outPng = Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
fs.writeFileSync('assets/fatcat_transparent.png', outPng);
fs.writeFileSync('assets/feimao_transparent.png', outPng);
console.log('Successfully created assets/fatcat_transparent.png without background box!');
