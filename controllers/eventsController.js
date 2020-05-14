const db = require("../models");

String.prototype.toObjectId = function () {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

module.exports = {
    findAll: function (req, res) {
        db.Event
            .find(req.query)
            .sort({ startTime: 1 })
            .populate("user")
            .populate("room")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Event
            .findById(req.params.id)
            .populate("user")
            .populate("room")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // find events by the user's Id in Mongo
    findByUserId: function (req, res) {
        db.Event
            .find({ user: req.params.id.toObjectId() })
            .populate("user")
            .populate("room")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Event
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Event
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Event
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
