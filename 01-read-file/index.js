const fs = require('fs');
const { resolve } = require('path');

let readStream = fs.createReadStream(resolve(__dirname + '/text.txt'), 'utf8');
readStream.on('data', (chunk)=>{
  console.log(chunk);
});
