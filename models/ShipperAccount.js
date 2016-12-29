var mongoose = require('mongoose');

var ShipperAccount = new mongoose.Schema({

    slug:{type: String},
    description:{type: String},
    timezone:{type: String},

    credentials:{
        account_number:{type: String},
        password:{type: String},
        site_id:{type: String}
    },

    address:{
        country:{type: String},
        contact_name:{type: String},
        phone:{type: String},
        fax:{type: String},
        email:{type: String},
        company_name:{type: String},
        street1:{type: String},
        street2:{type: String},
        city:{type: String},
        type:{type: String},
        postal_code:{type: String},
        state:{type: String},
        street3:{type: String},
        tax_id:{type: String}
    }
});

module.exports = mongoose.model('shipperAccountModel', ShipperAccount);