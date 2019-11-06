const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

//"/api/rooms"
router.route("/")
    .get(eventsController.findAll)
    .post(eventsController.create);

// "/api/rooms/:id"
router.route("/:id")
    .delete(eventsController.remove);

module.exports = router;
