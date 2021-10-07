//su dung jwt de kiem tra access token
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //header cua 1 file co dang Authorization: Bearer ajeuifgovbwekrbflkewbrge
  //ta can lay doan dang sau cai Bearer
  const authHeader = req?.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  // neu khong co token:
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  //neu co token
  try {
    //verify xem token co phai hang xin khong
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //gan userId vao cho req de den stage viet post hay gi do
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
