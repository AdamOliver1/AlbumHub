const { userApi } = require('../config');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
router.use(cors());

router.post(`${userApi}/signup`, async (req, res) => {
    const salt = await bcrypt.genSalt();
    console.log(req.body);
    let user = req.body.user;
    user.privateModePassword = await bcrypt.hash(user.privateModePassword, salt);
    let data = JSON.stringify(user);
    fs.writeFileSync('DB/user.json', data);
})

router.post(`${userApi}/validate`, async (req, res) => {
    console.log("req.body", req.body);
    let password = req.body.password;
    let user = JSON.parse(fs.readFileSync('DB/user.json'));
    console.log("user.privateModePassword",user.privateModePassword);
  const isValid =   await bcrypt.compare(password, user.privateModePassword);
  console.log("isValid",isValid);
    res.send(isValid);
})

router.get(`${userApi}/user-exist`, (req, res) => {
    console.log("innnn");
    let data = fs.readFileSync('DB/user.json');
    try {
        let user = JSON.parse(data);
    }
    catch (e) {
        res.send(false);
        return;
    }
    res.send(true);
})

module.exports = router;