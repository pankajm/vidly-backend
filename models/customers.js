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

module.exports.Customer = Customer;
module.exports.validate = validate;