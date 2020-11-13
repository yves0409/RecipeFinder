const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//CREATE YOUR SCHEMA
const blogSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    preptime: {
      type: String,
      required: true,
    },
    cooktime: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
    recipes: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

//CREATE YOUR MODEL
const Blog = mongoose.model("Blog", blogSchema); //!!!!FIRST ARGUMENT(BLOG)IS IMPORTANT ,WILL LOOK FOR THE BLOGS COLLECTION ,SECOND IS SCHEMANAME
module.exports = Blog;
