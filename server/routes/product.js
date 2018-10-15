const router = require("express").Router();
const Controller = require("../controllers/productController");
const isLogin = require("../middleware/isLogin");
const accessMarket = require("../middleware/accessMarket");
const media = require("../helpers/media");

router.get("/findAll", Controller.findAll);
router.get("/findByCategory/:id", Controller.findByCategory);
router.get("/findByName", Controller.findByName);
router.post("/create", isLogin, accessMarket, Controller.create);
router.put("/update/:id", isLogin, accessMarket, Controller.update);
router.delete("/remove/:id", isLogin, accessMarket, Controller.remove);

router.post(
  "/upload/image",
  media.multer.single("image"),
  media.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: "Your file is successfully uploaded",
      link: req.file.cloudStoragePublicUrl
    });
  }
);

module.exports = router;
