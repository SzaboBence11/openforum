const express = require("express");
const multer = require("multer");

const router = express.Router();
// hol mentse a képet
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/assets/postImage");
  },
  filename: (req, file, cb) => {
    console.log(req.params.post_id)
    const uniqueName = req.params.post_id + ".png";
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


// POST /api/upload
router.post("/addPostPicture/:post_id", upload.single("image"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }
  res.json({
    message: "Image uploaded",
    file: req.file,
  });
});

module.exports = router;