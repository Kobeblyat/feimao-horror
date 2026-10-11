// Node script to parse uncompressed PNG / inspect fatcat.png
const fs = require('fs');
const buf = fs.readFileSync('assets/fatcat.png');
console.log('fatcat.png size:', buf.length);
