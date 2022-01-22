var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require ('mercadopago');
const PreferenceBuilder = require('./PreferenceBuilder');

var port = process.env.PORT || 3000

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.get('/success', function (req, res) {
    res.render('success', req.query);
})

app.get('/failure', function (req, res) {
    res.render('failure', req.query);
});

app.get('/pending', function (req, res) {
    res.render('pending', req.query);
});

app.post('/create_preference', function (req, res) {
    mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN,
        integrator_id: process.env.MP_INTEGRATOR_ID
    });

    const preference = new PreferenceBuilder(req.body)
                        .expiringInDays(3)
                        .maxInstallments(6)
                        .build();

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({ id: response.body.id });
        }).catch(function (error) {
            console.log(error);
        });
});

app.listen(port);
