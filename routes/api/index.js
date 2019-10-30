const router = require("express").Router();
const bookRoutes = require("./users");
const searchRoutes = require("./search");

// Book routes
router.use("/books", bookRoutes);

// Search routes
router.use("/search", searchRoutes);

module.exports = router;
