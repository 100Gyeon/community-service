const express = require("express");
const router = express.Router();
const Gallery = require("../schemas/gallery");

router.post("/delete", async (req, res) => {
  try {
    await Gallery.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update", async (req, res) => {
  try {
    await Gallery.update(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content
        }
      }
    );
    res.json({ message: "사진이 수정되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/write", async (req, res) => {
  try {
    let obj;

    obj = {
      writer: req.body._id,
      title: req.body.title,
      content: req.body.content
    };

    const gallery = new Gallery(obj);
    await gallery.save();
    res.json({ message: "사진이 업로드되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getGalleryList", async (req, res) => {
  try {
    const _id = req.body._id;
    const gallery = await Gallery.find({ writer: _id }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: gallery });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const _id = req.body._id;
    const gallery = await Gallery.find({ _id });
    res.json({ gallery });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
