const router = require("express").Router();
const Controller = require("../controllers/transactionController");
const isLogin = require("../middleware/isLogin");

router.get("/mytransactions", isLogin, Controller.userTransaction);
router.post("/create", isLogin, Controller.create);

module.exports = router;
