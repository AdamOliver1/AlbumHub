const express = require('express');
const categoriesRouter = express.Router();
const fs = require('fs');
const cors = require('cors');
const { categoriesApi, categoriesDbPath } = require('../config');
const jsonService = require('../services/jsonService');
categoriesRouter.use(cors());

//add new category
categoriesRouter.post(`${categoriesApi}/add`, (req, res) => {
    try {         
        jsonService.addToFile(categoriesDbPath, req.body.category);
        res.send({})
    } catch (err) { 
        console.log("err",err)
        jsonService.logError(err); 
    }
})

//delete category
categoriesRouter.post(`${categoriesApi}/delete`, (req, res) => {
    try {              
        jsonService.removeFromFile(categoriesDbPath, req.body.category);
        res.send({})
    } catch (err) {jsonService.logError(err);}
})

//get all categories
categoriesRouter.get(`${categoriesApi}/`, (req, res) => {
    try {              
        fs.readFile(categoriesDbPath, (err, data) => {
            if(err) throw err
            res.send(JSON.parse(data).array);
        })
    } catch (err) {jsonService.logError(err);} 
})


module.exports = categoriesRouter;