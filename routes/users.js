const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');

// Registering the user

router.post('/', async (req, res) => {

  const result = validate(req.body);
  if(result.error)
    return res.status(400).send(result.error);

  let user = await User.findOne({email: req.body.email})
  if(user)
    return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  // hashing the password

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try{
    await user.save();
    return res.send(_.pick(user, ['_id', 'name', 'email']));
  }
  catch(ex){
    return res.status(500).send(ex);
  }
})

module.exports = router;