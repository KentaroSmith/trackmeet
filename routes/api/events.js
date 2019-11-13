const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

//"/api/events"
router.route("/")
    .get(eventsController.findAll)
    .post(eventsController.create);

// "/api/events/:id"
router.route("/:id")
    .delete (eventsController.remove);

// "/api/events/:user"
router.route("/:user")
    .get(eventsController.findByUserId);

module.exports = router;
