const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require("./models/blog");
const { render } = require("ejs");

//EXPRESS APP
const app = express();

//ACCES THE PUBLIC DIRECTORY FOR IMAGES
var publicDir = require("path").join(__dirname, "/public");
app.use(express.static(publicDir));

//CONNECTION STRING TO CONNECT TO MONGODB
const dbURI =
  "mongodb+srv://yves0409:shady0409@nodeblogyves.log24.mongodb.net/nodeblogyves?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) //SECOND ARGUMENT IS ONLY TO GET RID OF WARNING
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//REGISTER VIEW ENGINE
app.set("view engine", "ejs");

//CREATE YOUR OWN CUSTOM MIDDLEWARE & USE STATIC FILES (IMAGES,CSS ,ETC...)

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //ACCEPTS THE DATA FROM CREATED FORM!! MIDDLEWARE

app.use(morgan("dev"));



//EXPRESS
app.get("/", (req, res) => {
  res.redirect("./blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//BLOG ROUTES
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create new blog" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("./blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/recipes/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("recipes", { blog: result, title: "Recipes" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
