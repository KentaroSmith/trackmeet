const router = require("express").Router();
const roomsController = require("../../controllers/roomController");

//"/api/rooms"
router.route("/")
    .get(roomsController.findAll)
    .post(roomsController.create);

// "/api/rooms/:id"
router.route("/:id")
    .delete(roomsController.remove);

module.exports = router;
//seed example
/* {
	"roomName": "Study Room A",
	"amenities":["whiteboard","conference table"],
	"building":"Regnier Hall",
	"occupancy":6,
	"timeOpen":"09:00",
	"timeClosed": "22:00"
} */