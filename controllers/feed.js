const fs = require("fs");
var data = require("../Movies.json");

// /getAllMovies
exports.getMovies = (req, res) => {
  res.status(200).json({
    data,
  });
};

// /getMovie/:id
exports.getMoviesById = (req, res) => {
  var movie = data.filter(function (entry) {
    return entry.id === parseInt(req.url.split("/")[2]);
  });
  res.status(200).json({
    movie,
  });
};

// /addMovie
exports.createPost = (req, res) => {
  const { title, overview, director, genres, releaseDate } = req.body;

  let readData = fs.readFileSync("Movies.json");
  console.log(readData);

  var lastId = data[data.length - 1].id;
  console.log(lastId);

  const movie = {
    id: lastId + 1,
    title: title,
    overview: overview,
    director: director,
    genres: genres,
    releaseDate: releaseDate,
  };

  const jsonData = JSON.parse(readData);
  jsonData.push(movie);
  jsonString = JSON.stringify(jsonData);
  fs.writeFileSync("Movies.json", jsonString, "utf-8", (err) => {
    if (err) throw err;
    console.log("Data added to file");
  });

  res.status(201).json({
    message: "Movie created successfully!",
    id: movie.id,
    title: movie.title,
  });
};

// /deleteMovie/:id
exports.deleteMoviesById = (req, res) => {
  let id = parseInt(req.url.split("/")[2]);
  data.splice(id - 1, 1);
  console.log(data);
  jsonString = JSON.stringify(data);
  fs.writeFileSync("Movies.json", jsonString, "utf-8", (err) => {
    if (err) throw err;
    console.log("Movie added to file");
  });
  res.status(200).json({
    id,
  });
};

// /editMovie/:id
exports.editMovieById = (req, res) => {
  const { title, overview, director, genres, releaseDate } = req.body;
  let id = parseInt(req.url.split("/")[2]);
  const movie = {
    id: id,
    title: title,
    overview: overview,
    director: director,
    genres: genres,
    releaseDate: releaseDate,
  };

  data.splice(id - 1, 1, movie);
  console.log(data);
  jsonString = JSON.stringify(data);
  fs.writeFileSync("Movies.json", jsonString, "utf-8", (err) => {
    if (err) throw err;
    console.log("Movie added to file");
  });

  res.status(200).json({
    id,
  });
};
