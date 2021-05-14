const contacts = require("./contacts.json");
const db = require("./db");
const { ObjectId } = require("mongodb");
// const { v4: uuid } = require("uuid");

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, "contacts");
  const results = collection.find({}).toArray();
  return results;
  // return db.get("contacts").value();
};

const getContactById = async (id) => {
  const collection = await getCollection(db, "contacts");
  const [results] = await collection.find({ _id: new ObjectId(id) }).toArray();
  return results;
  // return db.get("contacts").find({ id }).value();
};

const removeContact = async (id) => {
  const collection = await getCollection(db, "contacts");
  const { value: result } = await collection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  // const [record] = db.get("contacts").remove({ id }).write();
  return result;
};

const addContact = async (body) => {
  const collection = await getCollection(db, "contacts");
  // const id = uuid();
  const record = {
    ...body,
    ...(body.isFriend ? {} : { isFriend: false }),
  };
  const {
    ops: [results],
  } = await collection.insertOne(record);
  // db.get("contacts").push(record).write();
  return results;
};

const patchContact = async (id, body) => {
  const collection = await getCollection(db, "contacts");

  const { value: result } = await collection.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: body,
    },
    { returnOriginal: false }
  );

  // const record = db.get("contacts").find({ id }).assign(body).value();
  // db.write();
  console.log(result);
  return result;
};

const updateContact = async (id, body) => {
  const collection = await getCollection(db, "contacts");
  const { value: result } = await collection.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: body,
    },
    { returnOriginal: false }
  );

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
