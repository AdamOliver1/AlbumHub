const { userApi, usersDbPath } = require('../config');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jsonService = require('../services/jsonService')
router.use(cors());

//sign up new user
router.post(`${userApi}/signup`, async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        let user = req.body.user;
        if (user.privateModePassword) user.privateModePassword = await bcrypt.hash(user.privateModePassword, salt);
        fs.writeFileSync(usersDbPath, JSON.stringify(user));
        res.status(200).send();
    } catch (err) { jsonService.logError(err); }
})

//check private mode password
router.post(`${userApi}/validate`, async (req, res, next) => {
    try {
        let user = JSON.parse(fs.readFileSync(usersDbPath));
        if (!user.privateModePassword) res.send(false);
        else {
            const isValid = await bcrypt.compare(req.body.password, user.privateModePassword);
            res.send(isValid);
        }
    } catch (err) { jsonService.logError(err); }
})

//check if user exist
router.get(`${userApi}/user-exist`, (req, res) => {
    try {
        let data = fs.readFileSync(usersDbPath);
        let user;
        try {
            user = JSON.parse(data);
            res.send(user);
        }
        catch (e) { res.send(false); }
    } catch (err) { jsonService.logError(err); }
})

module.exports = router;