const express = require("express");
const mongoose = require("mongoose");
const Posts = require("./Models/Posts");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Joi = require("joi");
const cloudinary = require("cloudinary");
const app = express();
const port = 999;
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://asgaraliyev:${process.env.DATABASE_PASSWORD}@cluster0.5rq88.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
cloudinary.config({
  cloud_name: "drbir95bf",
  cloud_name: "drbir95bf",
  api_key: "279736589737784",
  api_secret: "0Mg2Gv05BFHy6Gn5F9gt5GdtkYU",
});

let token = jwt.sign(
  { apiKey: process.env.API_KEY },
  process.env.API_ACCESS_KEY
);
const db = mongoose.connection;
db.on("error", () => {
  console.log("coud not connect to database");
});
db.once("open", () => {
  console.log("connected to database");
});
// Middlewares
app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
//   try {
//     const tokenHeader = req.headers["authorization"];
//     jwt.verify(tokenHeader, process.env.API_ACCESS_KEY);
//     next();
//   } catch (error) {
//     somethingWentWrong(res, "Access Denied");
//   }
// });
// Middlewares
// Middlewares

function somethingWentWrong(res, details) {
  res.json({
    error: "Nəsə problem oldu.Zəhmət olmasa yeniden yoxlayın.",
    errorDetails: details,
    data: null,
  });
  // res.status(404).json({
  //   error: "Nəsə problem oldu.Zəhmət olmasa yeniden yoxlayın.",
  //   errorDetails: details,
  //   data: null,
  // });
}
// POSTS
// POSTS
// POSTS

const postVali = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  catagory: Joi.string().min(3).max(30).required(),
  operatingSystem: Joi.string().min(3).max(20),
  photo: Joi.object().required(),
  description: Joi.string().min(10).max(100).required(),
  content: Joi.string().required(),
  downloadLink: Joi.string().required(),
  programVersion: Joi.string(),
  keywords: Joi.array().min(1).max(20).required(),
  mod: Joi.string().min(3).max(20).required(),
});
const catoVali = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  tree: Joi.array().min(1).max(20).required(),
  parent: Joi.string().min(3).max(10).required(),
});
async function isThisCatagoryExists(catoName) {
  const catagories = await Catagories.find({
    name: catoName,
  });
  if (catagories.length === 0) {
    return false;
  } else {
    return true;
  }
}
app.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.json({
      error: null,
      data: posts,
    });
  } catch (error) {
    somethingWentWrong(res);
  }
});
app.get("/post", async (req, res) => {
  const { _id } = req.query;
  if (_id) {
    try {
      const posts = await Posts.find({ _id });
      res.json({
        error: null,
        data: posts[0],
      });
    } catch (error) {
      somethingWentWrong(res);
    }
  } else somethingWentWrong(res, "id yoxdur");
});
async function findAllPostsByCatagories(theCatagories) {
  const allPosts = await Promise.all(
    await theCatagories.map(async (originalCat, index) => {
      const littlePosts = await Posts.find({ catagory: originalCat }).then(
        (result) => {
          return result;
        }
      );
      return littlePosts;
    })
  );
  const manIamRealPosts = [];
  allPosts.map((allPostsList) => {
    allPostsList.map((post) => {
      manIamRealPosts.push(post);
    });
  });
  return manIamRealPosts;
}
async function findAllPosts(catagoryName) {
  // const posts = await Posts.find({ catagory: catagoryName });
  const allCat = [];
  const catagories = await Catagories.find({});
  catagories.map((cat) => {
    const aTree = cat.tree;
    console.log(aTree);
    console.log(catagoryName);
    console.log(aTree.includes(catagoryName));
    if (aTree.includes(catagoryName)) {
      console.log(cat);

      const newArrayTree = aTree.slice(
        [aTree.indexOf(catagoryName)],
        [aTree.length]
      );
      newArrayTree.push(cat.name);
      allCat.push(newArrayTree);
    }
    allCat.push([catagoryName]);
  });
  const originalCats = [];
  allCat.map((theCat) => {
    theCat.map((littleCat) => {
      if (!originalCats.includes(littleCat)) {
        originalCats.push(littleCat);
      }
    });
  });

  const theRealPosts = await findAllPostsByCatagories(originalCats);
  return theRealPosts;
}
// app.get("/catagory-posts", async (req, res) => {
//   const { catagory } = req.query;
//   if (catagory) {
//     const allThePosts = await findAllPosts(catagory);
//     res.json({ data: allThePosts });
//   } else somethingWentWrong(res, "Kataqoriya daxil edilmeyib");
// });
app.get("/catagory-posts", async (req, res) => {
  const { catagory, filterName } = req.query;
  console.log(req.query);
  if (catagory && filterName) {
    const allThePosts = await findAllPosts(catagory);
    if (filterName === "download") {
      allThePosts.sort(function (b, a) {
        return a.downloadCount - b.downloadCount;
      });
    } else if (filterName === "time") {
      allThePosts.sort(function (b, a) {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      });
    }
    res.json({ data: allThePosts });
  } else somethingWentWrong(res, "Kataqoriya daxil edilmeyib");
});
app.post("/posts", async (req, res) => {
  const {
    name,
    catagory,
    photo,
    operatingSystem,
    description,
    content,
    downloadLink,
    programVersion,
    keywords,
    mod,
  } = req.body.data;

  const result = postVali.validate({
    name,
    catagory,
    photo,
    description,
    operatingSystem,
    content,
    downloadLink,
    programVersion,
    keywords,
    mod,
  });

  if (!result.error) {
    const newPost = await Posts({
      name: name,
      photo: photo,
      operatingSystem: operatingSystem,
      description: description,
      content: content,
      downloadLink: downloadLink,
      programVersion: programVersion,
      keywords: keywords,
      catagory: catagory,
      modInfo: mod,
    });

    isThisCatagoryExists(catagory).then((result) => {
      if (result) {
        newPost
          .save()
          .then(() => {
            res.json({
              error: null,
              message: "New Post successfully created...",
              data: newPost,
            });
          })
          .catch((error) => {
            somethingWentWrong(res, error.message);
          });
      } else somethingWentWrong(res, "Bele bir kataqoriya yoxdur");
    });
  } else somethingWentWrong(res, result.error.details[0].message);
});
app.delete("/posts", async (req, res) => {
  const { _id } = req.query;

  if (_id) {
    try {
      Posts.deleteOne({ _id }, (error, data) => {
        if (error) somethingWentWrong(res, error.message);
        else {
          res.json({
            data: data,
            error: null,
          });
        }
      });
    } catch (error) {
      somethingWentWrong(res, error.message);
    }
  } else {
    somethingWentWrong(res);
  }
});
// POSTS
// POSTS
// POSTS
// POSTS
// POSTS
// POSTS

// CATAGORIES
// CATAGORIES
// CATAGORIES

const Catagories = require("./Models/Catagories");
app.get("/catagories", async (req, res) => {
  try {
    const catagories = await Catagories.find({});
    if (catagories) {
      res.json({
        error: null,
        data: catagories,
      });
    }
  } catch (error) {
    somethingWentWrong(res, error.message);
  }
});
app.get("/find-catagories-by-parent", async (req, res) => {
  const { parent } = req.query;
  if (parent) {
    try {
      const catagories = await Catagories.find({ parent });
      if (catagories) {
        res.json({
          error: null,
          data: catagories,
        });
      }
    } catch (error) {
      somethingWentWrong(res, error.message);
    }
  } else somethingWentWrong(res, "parent yoxdur");
});
app.get("/catagory", async (req, res) => {
  const { name } = await req.query;
  if (name) {
    try {
      const catagories = await Catagories.find({ name });
      if (catagories[0]) {
        res.json({
          error: null,
          data: catagories[0],
        });
      } else {
        somethingWentWrong(res, "Bele bir kataqoriya yoxdur");
      }
    } catch (error) {
      somethingWentWrong(res, error.message);
    }
  } else somethingWentWrong(res, " name  yoxdur");
});

app.post("/catagories", async (req, res) => {
  var { name, tree, parent } = req.body;
  if (
    name &&
    typeof name === "string" &&
    tree &&
    // typeof tree === "object" &&
    parent &&
    typeof parent === "string"
  ) {
    const infos = {
      name: name,
      tree: tree,
      parent: parent,
    };
    const newCat = await Catagories(infos);
    const catoValiResult = catoVali.validate(infos);
    console.log("catoValiResult");
    if (!catoValiResult.error) {
      newCat
        .save()
        .then((result) => {
          res.json({
            data: result,
            error: null,
          });
        })
        .catch((err) => {
          somethingWentWrong(res, err.message);
        });
    } else {
      somethingWentWrong(res, catoValiResult.error.details[0].message);
    }
  } else {
    somethingWentWrong(
      res,
      "name tree parent bulardan biri nulldu , yada duzgun tipde deyiller"
    );
  }
});
app.delete("/catagories", async (req, res) => {
  const { _id } = req.query;

  try {
    Catagories.deleteOne({ _id }, (error, data) => {
      res.json({ data: data });
    });
  } catch (error) {
    somethingWentWrong(res, error.message);
  }
});

// CATAGORIES
// CATAGORIES
// CATAGORIES
// CATAGORIES
// CATAGORIES
// CATAGORIES
app.get("/gallery", async (req, res) => {
  try {
    const result = await cloudinary.v2.search
      .expression("resource_type:image ")
      .execute();
    res.json({
      data: result.resources,
    });
  } catch (error) {
    somethingWentWrong(res);
  }
});

app.delete("/gallery", async (req, res) => {
  try {
    const images = req.query.images;
    const done = [];

    const result = await images.map(async (image) => {
      const result = await cloudinary.v2.uploader.destroy(image, {
        invalidate: true,
        resource_type: "image",
      });
      if (result.result === "ok") {
        done.push(image);
      }
      if (done.length === images.length) {
        res.json({
          data: done,
        });
      }
    });
  } catch (error) {
    somethingWentWrong(res, error.message);
  }
});
app.post("/gallery", async (req, res) => {
  try {
    console.log(req);
    // await cloudinary.v2.uploader.upload(req.query.file);
    res.json({ done: "done" });
  } catch (error) {
    somethingWentWrong(res, error.message);
  }
});
// SUBCATAGORY
// SUBCATAGORY
// SUBCATAGORY

// SUBCATAGORY
// SUBCATAGORY
// SUBCATAGORY
// SUBCATAGORY
// SUBCATAGORY
// SUBCATAGORY

app.listen(port, () => {
  console.log("app is running...");
});
