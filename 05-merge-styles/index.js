const fs = require('fs');
const path = require('path');
const stylesPath = path.resolve(__dirname, 'styles');
const bundlePath = path.resolve(__dirname, 'project-dist/bundle.css');

fs.writeFile(bundlePath, '', (err) => {
  if (err) throw err;
  else recordData();
});

async function recordData(){
  try {
    const files = await fs.promises.readdir(stylesPath);
    const writeShort = fs.createWriteStream(bundlePath);
    for (const file of files){
 
      let fileIputPath = `${stylesPath}/${file}`;

      const stat = await fs.promises.stat(fileIputPath);
      
      if (!stat.isDirectory()&&file.split('.')[1]==='css') {
        let readStream = fs.createReadStream(fileIputPath, 'utf8');
        readStream.on('data', (chunk)=>{
          writeShort.write(chunk);
        });
      }
    }
  }
  catch (err) {
    console.error(err);
  }
}