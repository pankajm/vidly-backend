const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalsSchema = new mongoose.Schema({
  customer : {
    type : new mongoose.Schema({
      name : {
        type : String,
        minlength : 2, 
        maxlength : 50
      },
      isGold : {
        type : Boolean,
        required : true,
        default : false
      },
      phone : {
        type : String,
        required : true
      }
    }),
  required : true
  },

  movie : {
    type : new mongoose.Schema({
      title : {
        type : String,
        minlength : 2, 
        maxlength : 50,
        trim : true
      },
      dailyRentalRate : {
        type : Number,
        required : true
      }
    }),

    required : true
  },

  dateOut : {
    type : Date,
    default : Date.now
  }, 

  dateReturned : {
    type : Date
  },

  rentalFee : {
    type : Number,
    min : 0
  }
})

const Rental = mongoose.model('rental', rentalsSchema);

function validate(body){
  const rentalsSchema = {
    movieId : Joi.objectId().required(),
    customerId : Joi.objectId().required()
  }
  const joiSchema = Joi.object(rentalsSchema);
  return joiSchema.validate(body);
}

module.exports.Rental = Rental;
module.exports.validate = validate;