const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
router.use(cors());
const jsonService = require('../services/jsonService');

router.post('/add-library', (req, res) => {
    let library = req.body.library;  
    fs.mkdir(`./images/${library}`, (err) => {
        if (err) console.log("err: ",err)
        else console.log("good");
    })   
    jsonService.addToFile('DB/libraries.json',req.body);    
    res.send("library creatred") 
})


router.get('/libraries', (req, res) => {                 
    fs.readFile('DB/libraries.json',  (err, data) => {  
       res.send(JSON.parse(data).array);
    })     
})



module.exports = router;