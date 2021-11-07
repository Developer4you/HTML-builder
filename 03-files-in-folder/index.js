const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'secret-folder');

async function getFiles (){
  try {
    const files = await fs.promises.readdir(filePath);
    for (const file of files){
      const stat = await fs.promises.stat(`${filePath}/${file}`);
      if (!stat.isDirectory()) {
        let filesInformation = `${file.split('.')[0]} - ${file.split('.')[1]} - ${stat.size/1000}kb`;
        console.log(filesInformation);}
    }
  }
  catch (err) {
    console.error(err);
  }
}

getFiles();