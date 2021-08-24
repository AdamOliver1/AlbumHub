fs = require('fs')
const path = require('path');
const { imagesDbPath } = require('../config');
const jsonService = require('./jsonService');
const imagesService = {

    async saveImageDetails(body) {
        try {
            let data = {
                fileName: body.fileName + '.png',
                categories: body.categories,
                isFavorite: body.isFavorite,
                inPrivateMode: body.inPrivateMode,
                library: body.library,
                caption: body.caption,
                location: body.location
            };
            await jsonService.addToFile(imagesDbPath, data);
        } catch (err) { jsonService.logError(err); }


    },

    async deleteImage(fileName) {
        try {
            await fs.readFile(imagesDbPath, function (err, data) {
                if (err) jsonService.logError(err);
                let json = JSON.parse(data);
                json.array = json.array.filter(img => img.fileName !== fileName);
                fs.writeFile(imagesDbPath, JSON.stringify(json), () => { })
            });
        } catch (err) { jsonService.logError(err); }
    },

    async updateImage(img) {
        try {
            //we don't need img src to update the image details file   
            delete img.imgSrc;
            fs.readFile(imagesDbPath, function (err, data) {
                if (err) jsonService.logError(err);
                let json = JSON.parse(data);
                for (let i in json.array) {
                    if (json.array[i].fileName == img.fileName) {
                        json.array[i] = { ...img };
                        break;
                    }
                }
                fs.writeFile(imagesDbPath, JSON.stringify(json), () => { })
            });
        } catch (err) { jsonService.logError(err); }
    },
    // get dictionary 
    getImagesDict(files, library) {
        try {

            let counter = 0;
            let dict = {};
            return new Promise((res, rej) => {
                for (let file of files) {
                    fs.readFile(`images/${library}/${file}`, (err, data) => {
                        if (err) jsonService.logError(err);
                        counter = counter + 1;
                        //get image file extension name
                        let extensionName = path.extname(`images/${library}/${file}`);
                        let base64Image = Buffer.from(data, 'binary').toString('base64');
                        //combine all strings
                        let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
                        dict[file] = imgSrcString;
                        if (counter == files?.length) {
                            res(dict);
                        }
                    });
                }
            })
        } catch (err) { jsonService.logError(err); }
    },

}

module.exports = imagesService;