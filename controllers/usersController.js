const express = require('express');
const router = express.Router();
const User = require ('../models/User');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        next (err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const userFind = await User.findById(req.params.id);
        res.json(userFind);
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        next(err)
    }
})


module.exports = router