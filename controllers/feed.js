const fs = require("fs");
var data = require("../Movies.json");
const { log } = require("console");
// don't repeat yourself in an object

const writeToJsonFile = (jsonString) => {
  fs.writeFileSync("Movies.json", jsonString, "utf-8", (err) => {
    if (err) throw err;
    console.log("Movie added to file");
  });
};
// /getAllMovies
exports.getMovies = (_, res) => {
  res.json({
    data,
  });
};

// /getMovie/:id
exports.getMoviesById = (req, res) => {
  const id = parseInt(req.params.id);
  res.json({
    movie: data.filter((entry) => entry.id === id),
  });
};

// /addMovie
exports.createPost = (req, res) => {
  const { title, overview, director, genres, releaseDate } = req.body;

  const readData = fs.readFileSync("Movies.json");

  const lastId = data[data.length - 1].id;

  const movie = {
    id: lastId + 1,
    title,
    overview,
    director,
    genres,
    releaseDate,
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
exports.deleteMoviesById = (_, res) => {
  data.splice(id - 1, 1);
  jsonString = JSON.stringify(data);
  writeToJsonFile(jsonString);
  res.json({
    id,
  });
};

// /editMovie/:id
exports.editMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  const movieToEdit = data.filter((entry) => entry.id === id);
  if (movieToEdit.length !== 0) {
    console.log(movieToEdit);

    const { title, overview, director, genres, releaseDate } = req.body;
    const editedMovie = {
      id: id,
      title: title !== undefined ? title : movieToEdit[0].title,
      overview: overview !== undefined ? overview : movieToEdit[0].overview,
      director: director !== undefined ? director : movieToEdit[0].director,
      genres: genres !== undefined ? genres : movieToEdit[0].genres,
      releaseDate:
        releaseDate !== undefined ? releaseDate : movieToEdit[0].releaseDate,
    };
    data.splice(id - 1, 1, editedMovie);
    writeToJsonFile(JSON.stringify(data));
    res.json({
      editedMovie,
    });
  } else
    res.json({
      Messege: "Movie is not defined",
    });
};
