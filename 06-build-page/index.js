const fs = require('fs');
const { resolve } = require('path');

const dirPath = resolve(__dirname + '/project-dist');
const stylesPath = resolve(__dirname + '/styles');
const bundlePath = resolve(__dirname + '/project-dist/style.css');

fs.rmdir(dirPath, {recursive: true}, ()=>{createProject();});

async function createProject(){
  let template = await fs.promises.readFile(resolve(__dirname + '/template.html'), 'utf8');
  const resultHTML = await changeTemplate(template);
  fs.mkdir(dirPath, {recursive: true}, (e)=>{
    if (e) console.log(e);
    else {
      fs.writeFile(dirPath + '/index.html', resultHTML, (err)=>{if (err) throw err;
      else recordData();});
      fs.writeFile(bundlePath, '', (err) => {
        if (err) throw err;
        else recordData();
      });
      copyAssets();
    }
  });
}

async function changeTemplate(template){
  try {
    const componentsPath = resolve(__dirname + '/components');
    const files = await fs.promises.readdir(componentsPath);
    for await (const file of files){
      if (file.split('.')[1]==='html'){
        let data = await fs.promises.readFile(resolve(componentsPath + '/' + file), 'utf8');
        template = template.replace(`{{${file.split('.')[0]}}}`, data);
      }
    }
    return template;
  }
  catch (err) {
    console.error(err);
  }
}

async function copyAssets() {
  try {
    const filesPath = resolve(__dirname +'/assets');
    const copyFilesPath = resolve(__dirname +'/project-dist/assets');
    const folders = await fs.promises.readdir(filesPath);
    for (const folder of folders) {
      const folderPath = filesPath +'/'+ folder;
      const copyFolderPath = copyFilesPath +'/'+ folder;
      await fs.promises.mkdir(copyFolderPath, { recursive: true });
      const files = await fs.promises.readdir(folderPath);
      for (const file of files) {
        const filesPath = folderPath +'/'+ file;
        const copyFilesPath = copyFolderPath +'/'+ file;
        await fs.promises.copyFile(filesPath, copyFilesPath);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function recordData(){
  try {
    const files = await fs.promises.readdir(stylesPath);
    const writeShort = fs.createWriteStream(bundlePath);
    for (const file of files){
      let fileInputPath = `${stylesPath}/${file}`;
      const stat = await fs.promises.stat(fileInputPath);
      if (!stat.isDirectory()&&file.split('.')[1]==='css') {
        let readStream = fs.createReadStream(fileInputPath, 'utf8');
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
