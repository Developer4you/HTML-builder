const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {stdin: input, stdout: output} = require('process');
let chunk='';

const filePath = path.resolve(__dirname, 'data.txt');
const rl = readline.createInterface({ input, output});
const writeShort = fs.createWriteStream(filePath, 'utf8');
fs.writeFile(filePath, chunk, ()=>{});
console.log('Welcome! Inter your information:');

rl.on('line', (data)=> {
  if (data!=='exit' && !chunk){ chunk = writeShort; }
  if (data === 'exit') {
    rl.close();
  } else {
    chunk.write(data+' \n');
    writeShort;}
});

process.on('beforeExit', ()=> console.log(' Goodbye'));


