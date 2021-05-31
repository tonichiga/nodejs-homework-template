const Contacts = require("../model/index");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { contacts, total, limit, offset } = await Contacts.listContacts(
      userId,
      req.query
    );
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { total, limit, offset, contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
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
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
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
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      userId,
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
};

// router.patch(
//   "/:contactId/favorite",
//   validateStatusFavoriteContacts,
//   async (req, res, next) => {
//     try {
//       if (Object.keys(req.body).length === 0) {
//         return res
//           .status(400)
//           .json({ status: "missing field favorite", code: 400 });
//       }
//       const contact = await Contacts.patchContact(
//         req.params.contactId,
//         req.body
//       );

//       if (contact) {
//         return res
//           .status(200)
//           .json({ status: "success", code: 200, data: { contact } });
//       }
//       return res.status(404).json({
//         status: "error",
//         code: 404,
//         message: "Not found",
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
