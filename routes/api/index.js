const router = require("express").Router();
const bookRoutes = require("./books");
const searchRoutes = require("./search");

// Book routes
router.use("/books", bookRoutes);

// Search routes
router.use("/search", searchRoutes);

module.exports = router;
