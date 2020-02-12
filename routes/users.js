const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const redis = require('redis');
const client = redis.createClient();

// Registering the user

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  return res.send(user);
})

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

  const token = user.getAuthToken();
  
  client.sadd('x-auth-tokens', token, async function(error, response){
    if(error)
      return res.status(500).send(error);
      
    try{
      await user.save();
      return res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    }
    catch(ex){
      return res.status(500).send(ex);
    }
  });

})

module.exports = router;