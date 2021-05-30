// const contacts = require("./contacts.json");
// const db = require("./db");
// const { ObjectId } = require("mongodb");
// const { v4: uuid } = require("uuid");

const { ResumeToken } = require("mongodb");
const { getMaxListeners } = require("../app");
const Contact = require("./schemas/contact");

// const getCollection = async (db, name) => {
//   const client = await db;
//   const collection = await client.db().collection(name);
//   return collection;
// };

const listContacts = async (userId, query) => {
  const {
    limit = 5,
    offset = 0,
    sortBy,
    sortByDesc,
    filter, // name|favorite|email
    favorite = null,
  } = query;
  const optionSearch = { owner: userId };
  if (favorite !== null) {
    optionSearch.favorite = favorite;
  }
  const results = await Contact.paginate(optionSearch, {
    limit, // Лимит выдачи
    offset, // Смещение на кол-во
    select: filter ? filter.split("|").join(" ") : "", // Выбор отображаемых полей
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // Сортировака по возрастанию
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}), // Сортировака по убывани
    },
  });

  // Пример запроса
  // http://localhost:3000/api/contacts?limit=5&favorite=false&filter=name|favorite|email&sortByDesc=name

  const { docs: contacts, totalDocs: total } = results;
  return { contacts, total, limit, offset };
  // const collection = await getCollection(db, "contacts");
  // const results = collection.find({}).toArray();
  // return results;
  // return db.get("contacts").value();
};

const getContactById = async (userId, id) => {
  const results = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "name email subscription -_id",
  });
  return results;
  // const collection = await getCollection(db, "contacts");
  // const [results] = await collection.find({ _id: new ObjectId(id) }).toArray();
  // return results;
  // return db.get("contacts").find({ id }).value();
};

const removeContact = async (userId, id) => {
  const result = await Contact.findByIdAndRemove({ _id: id, owner: userId });
  // const collection = await getCollection(db, "contacts");
  // const { value: result } = await collection.findOneAndDelete({
  //   _id: new ObjectId(id),
  // });
  // const [record] = db.get("contacts").remove({ id }).write();
  return result;
};

const addContact = async (body) => {
  const result = Contact.create(body);
  // const collection = await getCollection(db, "contacts");
  // // const id = uuid();
  // const record = {
  //   ...body,
  //   ...(body.isFriend ? {} : { isFriend: false }),
  // };
  // const {
  //   ops: [results],
  // } = await collection.insertOne(record);
  // db.get("contacts").push(record).write();
  return result;
};

const patchContact = async (userId, id, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: id,
      owner: userId,
    },
    { ...body },
    { new: true }
  );

  // const collection = await getCollection(db, "contacts");

  // const { value: result } = await collection.findOneAndUpdate(
  //   {
  //     _id: new ObjectId(id),
  //   },
  //   {
  //     $set: body,
  //   },
  //   { returnOriginal: false }
  // );

  // const record = db.get("contacts").find({ id }).assign(body).value();
  // db.write();

  return result;
};

const updateContact = async (userId, id, body, next) => {
  console.log(body);
  if (Object.keys(body).length === 0) {
    next({
      status: 400,
      message: `Field favorite`,
    });
  }

  const result = await Contact.findOneAndUpdate(
    {
      _id: id,
      owner: userId,
    },
    { ...body },
    { new: true }
  );

  // const collection = await getCollection(db, "contacts");
  // const { value: result } = await collection.findOneAndUpdate(
  //   {
  //     _id: new ObjectId(id),
  //   },
  //   {
  //     $set: body,
  //   },
  //   { returnOriginal: false }
  // );

  // const record = db.get("contacts").find({ id }).assign(body).value();
  // db.write();
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
};
