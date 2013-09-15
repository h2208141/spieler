var mongoServer = 'localhost';
var mongoPort = 27017;

SpielerManager = function(app) {
    var SpielerProvider = require('../public/javascripts/spielerMongo').SpielerProvider;
    var spielerProvider = new SpielerProvider(mongoServer, mongoPort);

    app.get('/spielerliste', function(req, res) {
        spielerProvider.fetchAllspielerliste(function(error, spielerliste) {
            res.send(spielerliste);
        });
    });

    app.post('/spielerliste', function(req, res) {
        spielerProvider.insertSpieler(req.body, function(error, spieler) {
            if (error) {
                res.send(error, 500);
            } else {
                res.send(spieler);
            }
        });
    });

    app.get('/spielerliste/:id', function(req, res) {
        spielerProvider.fetchSpielerById(req.params.id, function(error, spieler) {
            if (spieler == null) {
                res.send(error, 404);
            } else {
                res.send(spieler);
            }
        });
    });

    app.post('/spielerliste/:id', function(req, res) {
        var _spieler = req.body;
        _spieler._id = req.params.id;

        spielerProvider.updateSpieler(_spieler, function(error, spieler) {
            if (error) {
                res.send(error, 404);
            } else {
                res.send('');
            }
        });
    });

    app.delete('/spielerliste/:id', function(req, res) {
        spielerProvider.deleteSpieler(req.params.id, function(error, spieler) {
            if (error) {
                res.send(error, 404);
            } else {
                res.send('');
            }
        });
    });
};

exports.SpielerManager = SpielerManager;
