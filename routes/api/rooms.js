const router = require("express").Router();
const roomsController = require("../../controllers/roomController");

//"/api/rooms"
router.route("/")
    .get(roomsController.findAll)
	.post(roomsController.create);
	
// "/api/rooms/:id"
router.route("/:id")
    .delete(roomsController.remove)
	.put(roomsController.update);

router.route("/count")
    .get(roomsController.getCountPerLocation)

module.exports = router;