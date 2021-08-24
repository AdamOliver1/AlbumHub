const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
router.use(cors());
const jsonService = require('../services/jsonService');
const { libraryApi, libraryDbPath } = require('../config');

router.post(`${libraryApi}/add-library`, (req, res) => {
    try {     
        console.log("dddddd");
        fs.mkdir(`./images/${req.body.library}`, jsonService.logError)   
        jsonService.addToFile(libraryDbPath, req.body);
        res.status(200).send();
    } catch (err) { jsonService.logError(err); }
})

//get all libraries
router.get(`${libraryApi}/libraries`, (req, res) => {
    try {     
        fs.readFile(libraryDbPath, (err, data) => {
            res.send(JSON.parse(data).array);
            if(err) jsonService.logError(err);
        })
    } catch (err) { jsonService.logError(err); }
})



module.exports = router;