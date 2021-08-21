fs = require('fs')
const path = require('path');
const imagesService = {
    getImagesDict(files, library) {
        let counter = 0;
        let max = files?.length;
        console.log("length", max);
        let dict = {};
        return new Promise((res, rej) => {
            for (let file of files) {
                fs.readFile(`${process.cwd()}/images/${library}/${file}`, (err, data) => {                  
                    counter = counter + 1;                     
                    //get image file extension name
                    let extensionName = path.extname(`${process.cwd()}/images/home1/test.png`);                
                    let base64Image = Buffer.from(data, 'binary').toString('base64');
                    //combine all strings
                    let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;                   
                    dict[file] = imgSrcString;
                    if (counter == max) {                      
                        res(dict);
                    }
                });
            }
        })
    }
}

module.exports = imagesService;