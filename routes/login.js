const express = require('express');
const router = express.Router();
const {User} = require('../models/users');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

// Log in the user

router.post('/', async (req, res) => {

  const result = validate(req.body);
  if(result.error)
    return res.status(400).send(result.error);

  let user = await User.findOne({email: req.body.email})
  if(!user)
    return res.status(400).send('Wrong username or password');

  const isValid = await bcrypt.compare(req.body.password, user.password)
  if(!isValid)
    return res.status(400).send('Wrong username or password');
  
  const token = user.getAuthToken();
  return res.header('x-auth-token', token).send('Login Successfull');

})

function validate(body){
  const userSchema = {
    email : Joi.string().required().email(),
    password : Joi.string().required()
  }

  const joiSchema = Joi.object(userSchema);
  return joiSchema.validate(body);
}

module.exports = router;