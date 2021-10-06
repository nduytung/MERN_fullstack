//xac thuc nguoi dung, login logout
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();
//khi bao caca routes

//@router POST /api/auth/register
//@desc register api, ASYNC vi co lam viec voi DB
//@access public

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  //validattion
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "missing username or password" });

  //kiem tra user co ton tai khong
  try {
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User exists already" });

    //neu khong co tusc la user hop le

    //hash password
    const hashedPassword = await argon2.hash(password);

    //tao user theo model
    const newUser = new User({ username, password: hashedPassword });

    //luu vao db
    await newUser.save();

    //ky ten vao sau do gui di de bao mat
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    ); //co id la vi user da duoc taoj thanh cong

    //return neu tao thanh cong
    res.json({
      success: true,
      message: "Create account successfully",
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing fields, please try again" });

  //cho nao dung async thi them try catch vao
  try {
    //check user co ton tai
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Account not found" });

    //neu tim thay
    //kiem tra mat khau bang argon2, nhan vao 2 tham so la pass tu db (da hash) va password user gui
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Account not found" });

    //neu dung, tra ve token de user dang nhap
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res
      .status(200)
      .json({ success: true, message: "Login successfully", accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
