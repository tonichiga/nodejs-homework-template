const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
const { Subscription } = require("../../helpers/constants");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema({
  name: {
    type: String,
    default: "Guest",
    minLength: 2,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
