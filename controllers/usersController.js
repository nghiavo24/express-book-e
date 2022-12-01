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
        const usersFind = await User.findById(req.params.id);
        res.json(usersFind);
    } catch (err) {
        next(err)
    }
})

module.exports = router