const { imgApi, imagesDbPath } = require('../config');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const jsonService = require('../services/jsonService');
const imagesService = require('../services/imageService');
router.use(cors());


// update Image
router.post(`${imgApi}/update`, async (req, res) => {
  try {
    await imagesService.updateImage(req.body);
    res.status(200).send();
  } catch (err) {jsonService.logError(err);}
});


//delete image
router.post(`${imgApi}/delete`, async (req, res) => {
  try {
    let folderName = req.body.library;
    let fileName = req.body.fileName;
    //delete image details from file
    await imagesService.deleteImage(fileName);
    //delete image from file
    await fs.unlink('images/' + folderName + '/' + fileName, jsonService.logError);
    res.status(200).send();
  } catch (err) {jsonService.logError(err);}
});


//upload new image
router.post(`${imgApi}/upload`, async (req, res) => {
  try {
    let imgSrc = req.body.imgSrc;
    let folderName = req.body.library;
    let fileName = req.body.fileName;
    let data = imgSrc.replace(/^data:image\/\w+;base64,/, "");
    let buffer = Buffer.from(data, 'base64');

    // if library doesnt exict, open new one
    if (!fs.existsSync('images/' + folderName)) {
      fs.mkdir(path.join(__dirname, 'images', folderName), jsonService.logError);
    }
    // save image details
    await imagesService.saveImageDetails(req.body);
    //save image 
    await fs.writeFile(path.join('images', folderName, fileName) + '.png', buffer, jsonService.logError);
    res.status(200).send(true);
  } catch (err) {jsonService.logError(err);}
});


// get all images by library
router.get(`${imgApi}`, (req, res) => {
  try {
    let imageDetailsData;
    let result = [];
    let library = req.query.library;

    //get image details from file
    fs.readFile(imagesDbPath, function (err, data) {
      imageDetailsData = JSON.parse(data).array;
      imageDetailsData = imageDetailsData.filter(img => img.library === library);
      if (err) jsonService.logError(err);

      // if the library is empty , return an empty array
      if (imageDetailsData.length === 0) res.send([]);
      else {
        fs.readdir(path.resolve(`images/${library}`),
          (err, files) => {
            if (err) jsonService.logError(err);
            imagesService.getImagesDict(files, library).then((dict) => {
              imageDetailsData.forEach(img => {
                result.push({
                  imgSrc: dict[img.fileName],
                  fileName: img.fileName,
                  caption: img.caption,
                  categories: img.categories,
                  isFavorite: img.isFavorite,
                  inPrivateMode: img.inPrivateMode,
                  library: library,
                  location: img.location
                });
              });
              res.send(result);
              return;
            });
          }
        );
      }
    });
  } catch (err) {jsonService.logError(err);}
});

module.exports = router;