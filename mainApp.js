var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/postmanintegration');
var app = express();
var ShipperAccount = require('./models/ShipperAccount');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/shipperaccounts', function (req, res) {
    ShipperAccount.find(function (err, shipperAccounts) {
        if (!shipperAccounts) {
            return res.send(err);
        }
        res.send(shipperAccounts);
    });
});

app.post('/shipperaccount', function (req, res) {
    var newShipperaccounts = new ShipperAccount({
        slug: req.body.slug,
        description: req.body.description,
        timezone: req.body.timezone,

        credentials: {
            account_number: "*******",
            password: "*******",
            site_id: "*******"
        },

        address: {
            country: req.body.address.country,
            contact_name: req.body.address.contact_name,
            phone: req.body.address.phone,
            fax: req.body.address.fax,
            email: req.body.address.email,
            company_name: req.body.address.company_name,
            street1: req.body.address.street1,
            street2: req.body.address.street2,
            city: req.body.address.city,
            type: req.body.address.type,
            postal_code: req.body.address.postal_code,
            state: req.body.address.state,
            street3: req.body.address.street3,
            tax_id: req.body.address.tax_id
        }
    });
    newShipperaccounts.save(function (err, shipperAccount) {
        if (err) {
            res.send(err);
        }
        res.send(shipperAccount);
    });

});


app.get('/shipperaccount/:id', function (req, res) {
    ShipperAccount.findOne({_id: req.params.id}, function (err, shipperAccount) {
        if (!shipperAccount)
            return res.send(err);
        res.send(shipperAccount);
    })
});

app.put('/shipperaccount/:id', function (req, res, next) {
    ShipperAccount.findOneAndUpdate({_id: req.params.id}, req.body, function (err, shipperAccount) {
        if (err) return res.send(500, {error: err});
        return res.send(shipperAccount);
    });
});

app.delete('/shipperaccount/:id', function (req, res, next) {
    ShipperAccount.remove({_id: req.params.id}, function (err, removed) {
        if (err) {
            return res.send(err)
        }
        res.send("shipper-Account removed.");
    });
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;