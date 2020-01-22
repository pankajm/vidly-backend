const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi'); 

const customersSchema = new mongoose.Schema({
  isGold: {
    type: Boolean, 
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: Number,
    required: true
  }
})

const Customer = mongoose.model('customer', customersSchema);

function validate(body, schema){             // Validate input using
  const joiSchema = Joi.object(schema);
  const result =  joiSchema.validate(body);
  return result;
}

// Post Api 
router.post('/', (req, res) => {
  const joiSchema = {
    isGold: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.number().required()
  }
  const result = validate(req.body, joiSchema);
  if(result.error)
    return res.status(400).send(result.error.message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: parseInt(req.body.phone)
  })

  customer.save()
    .then(result => res.send(result))
    .catch(error => res.send(error.message));
})

//Get Customers Api 
router.get('/', (req, res) => {
  Customer.find()
    .then((result) => {
      if(!result || !result.length)
        return res.status(404).send('No customers present in the database');
      res.send(result)
    })
    .catch(error => res.send(error.message))
})


// Get customers by id Api
router.get('/:id', (req, res) => {
  Customer.findById(req.params.id)
    .then(result =>res.send(result))
    .catch(error => res.send(error));
})

// Update customers Api
router.put('/:id', (req, res) => {
  const schema = {
    name : Joi.string(),
    isGold: Joi.boolean(),
    phone: Joi.number()
  };

  const result = validate(req.body, schema);
  if(result.error)
    return res.status(400).send(result.error.details[0].message)

  Customer.findByIdAndUpdate(req.params.id, req.body, { new:true })
    .then(result => res.send(result))
    .catch(error => res.send(error));
})

// Delete customer Api
router.delete('/:id', (req, res) => {
  Customer.findByIdAndRemove(req.params.id)
    .then(result => res.send(result))
    .catch(error => res.send(error.message))
})

module.exports = router;



