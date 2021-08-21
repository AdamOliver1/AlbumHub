const { imgApi } = require('../config');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const jsonService = require('../services/jsonService');
const imagesService = require('../services/imageService');
router.use(cors());

const onPrivateMode = {current:false};

router.post(`${imgApi}/update`, (req, res) => {
  console.log("in update", req.body.caption, req.body.isFavorite);
  jsonService.updateImage(req.body);
});


router.post(`${imgApi}/upload`, (req, res) => {
  let sampleFile = req.body.image;
  let folderName = req.body.library;
  let fileName = req.body.fileName;
  let data = sampleFile.replace(/^data:image\/\w+;base64,/, "");
  let buffer = Buffer.from(data, 'base64');

  if (!fs.existsSync('images/' + folderName)) {
    fs.mkdir(path.join(__dirname, 'images', folderName), () => { });
  }
  jsonService.saveImageDetails(req.body);
  fs.writeFile(path.join('images', folderName, fileName) + '.png', buffer, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      console.log("image saved");
      res.send('image saved');
    }
  });
});


router.get(`${imgApi}`, (req, res) => {
  let imageDetailsData;
  let result = [];
  let library = req.query.library;

  fs.readFile('DB/imageDetails.json', function (err, data) {
    imageDetailsData = JSON.parse(data).array;
    imageDetailsData = imageDetailsData.filter(img => img.library === library);
    fs.readdir(path.resolve(`images/${library}`),
      (err, files) => {
        if (err) res.status(500).send(err);
        imagesService.getImagesDict(files, library).then((dict) => {

          imageDetailsData.forEach(img => {
            result.push({
              imgSrc: dict[img.fileName],
              fileName: img.fileName,
              caption: img.caption,
              categories: img.categories,
              isFavorite: img.isFavorite,
              inPrivateMode: img.inPrivateMode,
              library: library
            });
          });
          res.send(result);
        });
      }
    );
  });
});
// router.get(`${imgApi}/favorites`,async (req, res) => {
  //   let imageDetailsData;
  //   let result = [];
  
  
  //   fs.readFile('DB/imageDetails.json', async (err, data) => {
//     imageDetailsData = JSON.parse(data).array;
//     await fs.readdir(path.resolve(`images`),
//     async (err, files) => {
//         if (err) res.status(500).send(err);
//         for (let file of files) {

//          await fs.readdir(path.resolve(`images/${file}`),
//             (err, files) => {
//               if (err) res.status(500).send(err);
//               imagesService.getImagesDict(files, file).then((dict) => {

//                 imageDetailsData.forEach(img => {
//                   result.push({
//                     imgSrc: dict[img.fileName],
//                     fileName: img.fileName,
//                     caption: img.caption,
//                     categories: img.categories,
//                     isFavorite: img.isFavorite,
//                     inPrivateMode: img.inPrivateMode,
//                     library: file
//                   });
//                 });
//                 console.log("result",result.length);

//               });
//             }
//           );
//         }
       
//       })
    
//   });
// });




module.exports = router;