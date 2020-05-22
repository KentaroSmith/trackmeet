const db = require("../models");


module.exports = {
    findAll: function (req, res) {
        db.Room
            .find({ 
                capacity: { $gte: req.query.capacity },
                features: { $all: req.query.features }
             })
            .sort({ roomName: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Room
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Room
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Room
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Room
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getCountPerLocation: function (req, res) {
        db.Room
            .aggregate([{
                $group: { _id: '$location', count: { $sum: 1 } }
            }])
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
