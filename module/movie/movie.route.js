const router = require("express").Router();
const movieController = require("./controller/movie.controller");

router.get("/",movieController.home);


module.exports = router;