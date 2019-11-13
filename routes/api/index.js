const router = require("express").Router();
const userRoutes = require("./users");
const locationRoutes = require("./locations");
const featureRoutes = require("./features");
const roomRoutes = require("./rooms");
const eventRoutes = require("./events");

// User routes
router.use("/users", userRoutes);

// Location routes
router.use("/locations", locationRoutes);

// Feature routes
router.use("/features", featureRoutes)

// Room routes
router.use("/rooms", roomRoutes)

// Event routes
router.use("/events", eventRoutes)

module.exports = router;
