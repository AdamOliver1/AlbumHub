fs = require('fs')

function updateInArray(array, updatedImg) {
  for (var i in projects) {
    if (projects[i].value == value) {
      projects[i].desc = desc;
      break; //Stop this loop, we found it!
    }
  }
}

const jsonService = {

 


  addToFile(path, newElement) {
    fs.readFile(path, function (err, data) {
      let json = JSON.parse(data);

      json.array.push(newElement);
      fs.writeFile(path, JSON.stringify(json), () => { })
    });
  },

  updateImage(img) {
    try {
      let path = 'DB/imageDetails.json';
      fs.readFile(path, function (err, data) {
        var json = JSON.parse(data);  
        for (var i in json.array) {
          if (json.array[i].fileName == img.fileName) {         
            json.array[i] = {...img};        
            break;
          }
        }
        fs.writeFile(path, JSON.stringify(json), () => { })
      });
    } catch (err) {
      console.log("err", err);
    }
  },

  saveImageDetails(body) {
    return new Promise((res, rej) => {
      let data = {
        fileName: body.fileName + '.png',
        categories: body.categories,
        isFavorite: body.isFavorite,
        inPrivateMode: body.inPrivateMode,
        library: body.library,
        caption: body.caption
      };
      this.addToFile('DB/imageDetails.json', data)
    })

  }
}

module.exports = jsonService;