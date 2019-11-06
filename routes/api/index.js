const router = require("express").Router();
const userRoutes = require("./users");
const roomRoutes = require("./rooms")

// Book routes
router.use("/users", userRoutes);
// Room routes
router.use("/rooms", roomRoutes)
module.exports = router;
