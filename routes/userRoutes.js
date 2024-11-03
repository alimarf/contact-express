const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

router.post("/users", AuthMiddleware, userController.createUser);
router.get("/users", AuthMiddleware, userController.getUsers);
router.get("/users/:id", AuthMiddleware, userController.getUserById);
router.put("/users/:id", AuthMiddleware, userController.updateUser);
router.delete("/users/:id", AuthMiddleware, userController.deleteUser);

module.exports = router;
