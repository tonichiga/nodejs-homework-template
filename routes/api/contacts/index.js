const express = require("express");
const { required } = require("joi");
const router = express.Router();
const {
  validateCreateContacts,
  validateUpdateContacts,
  validateStatusFavoriteContacts,
} = require("./validation");
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

router.get("/", guard, ctrl.getAll);

router.get("/:contactId", guard, ctrl.getById);

router.post("/", guard, validateCreateContacts, ctrl.create);

router.delete("/:contactId", guard, ctrl.remove);

router.put("/:contactId", guard, validateUpdateContacts, ctrl.update);

router.patch(
  "/:contactId/favorite",
  guard,
  validateStatusFavoriteContacts,
  ctrl.update
);

module.exports = router;
