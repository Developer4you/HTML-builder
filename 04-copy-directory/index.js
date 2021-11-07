const fs = require('fs');
const path = require('path');
const dirPath = path.resolve(__dirname);

fs.rmdir(dirPath+'/files-copy', {recursive: true}, (e)=>e?console.log(e):copyDir('files', 'files-copy'));

async function copyDir(inputFolder, outputFolder){
  try {
    await fs.mkdir(dirPath+'/files-copy', {recursive: true}, (e)=>e?console.log(e):e);
   
    const files = await fs.promises.readdir(dirPath+`/${inputFolder}`);
    for (const file of files)
      fs.copyFile(dirPath+`/${inputFolder}/${file}`, dirPath+`/${outputFolder}/${file}`, (e)=>e?console.log(e):e);
  }
  catch (err) {
    console.error(err);
  }
}

    