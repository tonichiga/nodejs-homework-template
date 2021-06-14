const express = require("express");
const { required } = require("joi");
const router = express.Router();
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

const ctrl = require("../../../controllers/users");

router.get("/verify/:token", ctrl.verify);
router.post("/verify", ctrl.repeatSendEmailVerify);
router.post("/signup", ctrl.reg);
router.post("/login", ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.patch("/avatars", [guard, upload.single("avatar")], ctrl.avatars);

module.exports = router;
