var mongoServer = 'localhost';
var mongoPort = 27017;

SpielerManager = function(app) {
    var SpielerProvider = require('../public/javascripts/spielerMongo').SpielerProvider;
    var spielerProvider = new SpielerProvider(mongoServer, mongoPort);

    // Spielerliste lesen
    app.get('/spielerliste', function(req, res) {
        spielerProvider.fetchAllspielerliste(function(error, spielerliste) {
            res.render('spielerListe',
                {
                    spielerliste: spielerliste
                });
        });
    });

    // Formular Neueingabe
    app.get('/spielerneu', function(req, res) {
        res.render('spielerNew', {name:"", vorname:"", age:""} );
    });

    // Neueingabe speichern
    app.post('/spielerneu', function(req, res) {
        console.log('insert');
        var _spieler = req.body;
        spielerProvider.insertSpieler(_spieler, function(error, spieler) {
            if (error) {
                res.send(error, 404);
            } else {
                console.log(spieler);
                res.redirect('/spielerliste');
            }
        });
    });

    // Formular Bearbeiten
    app.get('/spielerliste/:id', function(req, res) {
        spielerProvider.fetchSpielerById(req.params.id, function(error, spieler) {
            if (spieler == null) {
                res.send(error, 404);
            } else {
                res.render('spielerEdit',
                    {
                        spieler: spieler
                    });
            }
        });
    });

    // Bearbeiten speichern
    app.post('/spielerliste/:id', function(req, res) {
        console.log('update');
        var _spieler = req.body;
        _spieler._id = req.params.id;
        console.log(_spieler);

        spielerProvider.updateSpieler(_spieler, function(error, spieler) {
            if (error) {
                res.send(error, 404);
            } else {
                console.log(spieler);
                res.redirect('/spielerliste');
            }
        });
    });

    // Spieler löschen
    app.delete('/spielerliste/:id', function(req, res) {
        console.log('delete');
        spielerProvider.deleteSpieler(req.params.id, function(error, spieler) {
            if (error) {
                res.send(error, 404);
            } else {
                res.redirect('/spielerliste');
            }
        });
    });
};

exports.SpielerManager = SpielerManager;
