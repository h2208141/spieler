var spielerListe = 'spielerliste';

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

SpielerProvider = function(host, port) {
    this.db = new Db('mydb', new Server(host, port));
    this.db.open(function(){});

    this.fetchAllspielerliste = function(cb) {
        this.db.collection(spielerListe, function(error, spielerliste) {
            if (error) {
                cb(error, null);
            } else {
                spielerliste.find().toArray(function(error, results) {
                    cb(error, results);
                });
            }
        });
    };

    this.fetchSpielerById = function(id, cb) {
        this.db.collection(spielerListe, function(error, spielerliste) {
            if (error) {
                cb(error, null);
            } else {
                spielerliste.findOne({
                    _id:spielerliste.db.bson_serializer.ObjectID.createFromHexString(id)
                }, function(error, result) {
                    cb(error, result);
                });
            }
        });
    };

    this.insertSpieler = function(spieler, cb) {
        console.log('insertSpieler');
        this.db.collection(spielerListe, function(error, spielerliste) {
            if (error) {
                cb(error, null);
            } else {
                spielerliste.insert([spieler], function() {
                    cb(null, spieler);
                });
            }
        });
    };

    this.updateSpieler = function(spieler, cb) {
        console.log('updateSpieler');
        this.db.collection(spielerListe, function(error, spielerliste) {
            if (error) {
                cb(error, null);
            } else {
                spielerliste.update({_id:spielerliste.db.bson_serializer.ObjectID.createFromHexString(spieler._id)},
                    {name:spieler.name, vorname: spieler.vorname, age:spieler.age},
                    function(error, result) {
                        cb(error, result);
                    });
            }
        });
    };

    this.deleteSpieler = function(id, cb) {
        console.log('deleteSpieler');
        this.db.collection(spielerListe, function(error, spielerliste) {
            if (error) {
                cb(error, null);
            } else {
                spielerliste.remove({_id:spielerliste.db.bson_serializer.ObjectID.createFromHexString(id)},
                    function(error, result) {
                        cb(error, result);
                    });
            }
        });
    };
};

exports.SpielerProvider = SpielerProvider;