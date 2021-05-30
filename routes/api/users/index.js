const express = require("express");
const { required } = require("joi");
const router = express.Router();
const guard = require("../../../helpers/guard");

const ctrl = require("../../../controllers/users");

router.post("/signup", ctrl.reg);
router.post("/login", ctrl.login);
router.post("/logout", guard, ctrl.logout);

module.exports = router;
