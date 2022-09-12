const express = require("express");

const ctrl = require("../../controllers/auth");

const {ctrlWrapper} = require("../../helpers");

const {vallidationBody, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post("/users/signup", vallidationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

// signin
router.post("/users/login", vallidationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/users/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/users/current", authenticate, ctrlWrapper(ctrl.getUserData));

module.exports = router;