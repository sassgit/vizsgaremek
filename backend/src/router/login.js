const express = require('express');
const config = require('config');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

const secret = config.get('jwt').secret;
const expiresIn = config.get('jwt').expiresIn;

const router = express.Router();

router.post('/', async (req, res) => {
    try {
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
            role: user.role,
          }, secret, { expiresIn }
        );
        res.json({ 
            accessToken, 
            user: {...user._doc, password: ''},
          });
        } else {
          return res.sendStatus(401);
        }
      }
      catch (err) {
        return res.sendStatus(501);
      }
});

module.exports = router;

