const express = require("express");
const { getall, singup, singin } = require("../controler/user");
const router = express.Router();

router.get("/", getall);
router.post("/singup", singup);
router.post("/singin", singin);

module.exports = router;
