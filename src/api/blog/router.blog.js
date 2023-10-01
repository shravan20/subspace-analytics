const router = require("express").Router();
const controller = require("./controller.blog");

router.get("/blog-stats", controller.getBlogsStats);

module.exports = router;