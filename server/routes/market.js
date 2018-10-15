const router = require("express").Router();
const Controller = require("../controllers/marketController");
const isLogin = require("../middleware/isLogin");
const marketUser = require("../middleware/marketUser");
const accessMarket = require("../middleware/accessMarket");

router.get("/findMarketUser", isLogin, accessMarket, Controller.findMarketUser);
router.get(
  "/findProductOnMarket",
  isLogin,
  accessMarket,
  Controller.findProductOnMarket
);
router.post("/create", isLogin, marketUser, Controller.create);

module.exports = router;
