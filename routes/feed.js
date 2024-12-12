const express = require("express");
const feedController = require("../controllers/feed");

const router = express.Router();

router.get("/getAllMovies", feedController.getMovies);
router.get("/getMovie/:id", feedController.getMoviesById);
router.post("/addMovie", feedController.createPost);
router.delete("/deleteMovie/:id", feedController.deleteMoviesById);
router.put("/editMovie/:id", feedController.editMovieById);

module.exports = router;
