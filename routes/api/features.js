const router = require("express").Router();
const featuresController = require("../../controllers/featuresController");

// Matches with "/api/features"
router.route("/")
  .get(featuresController.findAll)
  .post(featuresController.create);

// Matches with "/api/features/:id"
router.route("/:id")
  .delete(featuresController.remove);

module.exports = router;
