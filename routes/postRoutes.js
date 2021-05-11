const router = require("express").Router();
const auth = require("../middleware/auth");

// new post
router.get("/", (req, res) => {
  console.log("hit");
  res.send("success");
});

module.exports = router;
