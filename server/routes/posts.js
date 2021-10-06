const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

router.post("/", async (req, res) => {
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

module.exports = router;
