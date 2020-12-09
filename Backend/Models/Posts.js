const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    keywords: {
      type: Array,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    photo: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    programVersion: {
      type: String,
      required: true,
    },
    keywords: {
      type: Array,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    downloadLink: {
      type: String,
      required: true,
    },
    operatingSystem: {
      type: String,
      required: true,
    },
    modInfo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
