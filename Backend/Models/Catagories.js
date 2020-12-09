const mongoose = require("mongoose");
const { Schema } = mongoose;
const CatagorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tree: {
    type: Array,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
});
const Catagories = mongoose.model("catagories", CatagorySchema);
module.exports = Catagories;
