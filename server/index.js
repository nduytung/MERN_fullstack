const express = require("express");
const app = express();
require("dotenv").config();

//connect voi DB
const mongoose = require("mongoose");
app.use(express.json());
const connectDB = async () => {
  try {
    await mongoose.connect(
      //nho doi ten db
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-stack.zlwa6.mongodb.net/mern-stack?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("mongoDB cloud connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectDB();

//routers
const authRouter = require("./routes/auth");
//routes thi dung USE, ko phai GET
app.use("/api/auth", authRouter);

const postRouter = require("./routes/posts");
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});
const PORT = 3000;
app.listen(3000, () => console.log(`started on port ${PORT}`));
