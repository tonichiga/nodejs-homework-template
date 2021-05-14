const express = require("express");
const { required } = require("joi");
const router = express.Router();
const Contacts = require("../../model/index");
const {
  validateCreateContacts,
  validateUpdateContacts,
  validateStatusFavoriteContacts,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreateContacts, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validateUpdateContacts, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  validateStatusFavoriteContacts,
  async (req, res, next) => {
    try {
      const contact = await Contacts.patchContact(
        req.params.contactId,
        req.body
      );
      console.log(contact);
      if (contact) {
        return res
          .status(200)
          .json({ status: "success", code: 200, data: { contact } });
      }
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "missing field favorite",
      });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
