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

function validate(body, schema){   
  customerSchema = schema || {
    isGold: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.number().required()
  }
  const joiSchema = Joi.object(customerSchema);
  const result =  joiSchema.validate(body);
  return result;
}

module.exports.Customer = Customer;
module.exports.validate = validate;