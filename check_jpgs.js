const fs = require('fs');

['jumpscare_feimao.jpg', 'jumpscare_ward104.jpg', 'jumpscare_feeding.jpg'].forEach(name => {
  const buf = fs.readFileSync(`assets/${name}`);
  console.log(`${name}: size ${buf.length}, magic: ${buf.slice(0, 4).toString('hex')}`);
});
