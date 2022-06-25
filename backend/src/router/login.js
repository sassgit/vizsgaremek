const express = require('express');
const config = require('config');
const User = require('../../model/user');
const jwt = require('jsonwebtoken');

const secret = config.get('jwt').secret;

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.sendStatus(404);
    }
    const valid = user.verifyPasswordSync(password);
    if (valid) {
        const accessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: 1,
        }, 'egynagyontitkosszöveg', {
            expiresIn: '1h',
        });

        res.json({ 
            success: true, 
            accessToken, 
            user: {...user._doc, password: ''},
        });
    } else {
        return res.sendStatus(401);
    }
});

module.exports = router;

