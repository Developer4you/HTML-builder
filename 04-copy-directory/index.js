const fs = require('fs');
const path = require('path');
const dirPath = path.resolve(__dirname);

// Создать папку
fs.mkdir('files-copy', {recursive: true}, (e)=>{console.log(e)})



async function copyDir(inputFolder, outputFolder){
    await 

}
