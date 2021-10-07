const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const verifyToken = require("../middlewares/auth.middleware");

//lay posts
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    if (!posts)
      return res.status(404).json({ success: false, message: "Not found" });
    return res
      .status(200)
      .json({ success: true, message: "Search done", posts });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//them posts
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return req
      .status(400)
      .json({ success: false, message: "Title is required" });

  //quang du lieu ve cho DB
  try {
    const newPost = new Post({
      title,
      description,
      url: url.includes("https") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: "615d9deff1dfea10705787a9",
    });

    await newPost.save();
    return res
      .status(200)
      .json({ success: true, message: "Save post sucesfully" });
  } catch (err) {
    console.log(err);
    return req
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//sua posts
router.put("/:id", verifyToken, (req, res) => {
  const { title, description, status, url } = req.body;

  if (!title)
    return req
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description: description || "",
      status: status || "",
      url: url || "",
    };

    //tim post trong DB
    const postCondition = { _id: erq.params.id, user: userId };
    updatedPost = await Post.findOneAndUpdate(postCondition, updatedPost, {
      new: true,
    });

    //neu user khong co quyen update
    if (!updatedPost)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    //neu update thanh cong
    return res
      .status(200)
      .json({ succe: true, message: "Excellent work", post: updatedPost });
  } catch (err) {
    console.log("err " + err);
    return req
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
