import { useEffect, useState } from "react";
import propTypes, { func } from "prop-types";
import StarRating from "./StarRating";

const tempMovieData = [];
const tempWatchedData= [];
const KEY = "14fae592";

export default function App() {
const [movies, setMovies] = useState([]);
const [watched, setWatched] = useState([]);
const[isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const [query, setQuery] = useState("");
const [selectedId, setSelectedId] = useState(null);



const tempQuery = "inception";

function handleSelectMovie(id){
  setSelectedId((selectedId)=> selectedId===id? null: id);

}

function handleCloseMovie(){
  setSelectedId(null);
}

function handleWatchedMovie(movie){
  setWatched((watched)=>[...watched, movie])
}

useEffect(function (){
async function fetchMovies(){
try {
  setIsLoading(true);
  setError("")
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${KEY}&s=${tempQuery}`,
  );
  if (!res.ok) throw new Error("Something went wrong with movie fetching");
  const data = await res.json();
  if (data.Response === "False") throw new Error("Movie Not Found");
  setError("");
  setMovies(data.Search);
} catch (err) {
  setError(err.message);
} finally {
  setIsLoading(false);
}
}
if(tempQuery.length < 3){
  setMovies([]);
  setError('');
  return;
}
fetchMovies();
},[])



return (
  <>
    <NavBar>
      <Search query={query} setQuery={setQuery} />
      <NumResult movies={movies} />
    </NavBar>
    <Main>
      <Box>
        {/* {isLoading?<Loader/>: <MovieList movies={movies} />} */}
        {isLoading && <LoaderMessage />}
        {!isLoading && !error && (
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        )}
        {error && <ErrorMessage message={error} />}
      </Box>
      <Box>
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            onCloseMovie={handleCloseMovie}
            onAddWatched={handleWatchedMovie}
          />
        ) : (
          <>
            <WatchedSummary watched={watched} />
            <WatchedMovieList watched={watched} />
          </>
        )}
      </Box>
    </Main>
  </>
);
}

function MovieDetails({selectedId, onCloseMovie, onAddWatched}){
const [movie, setMovie] = useState([]);
const [isLoading, setIsLoading]= useState(false);
const [userRating, setUserRating] = useState('');
const {
  Title: title,
  Released: released,
  Runtime: runtime,
  Plot: plot,
  Director: director,
  Poster: poster,
  imdbRating,
  Genre: genre,
  Actors:actors,
  Year: year
} = movie;


function handleAdd(){
  const newWatchedMovie={
    imdbRating, imdbID:selectedId, poster, year, runtime, title, userRating}
  onAddWatched(newWatchedMovie);
  onCloseMovie();
}

  useEffect(function(){
async function getMovieDetails(){
  setIsLoading(true);
  const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
 const data = await res.json();
 setMovie(data)
 setIsLoading(false)
}
getMovieDetails()
  },[selectedId])
return (
  <div className="details">
    {isLoading ? (
      <LoaderMessage />
    ) : (
      <>
        <header>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
          <img src={poster} alt={`Poster of ${title}`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>
              <span>⭐️</span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </header>
        <section>
          <div className="rating">
            <StarRating
              maxRating={10}
              size={24}
              onSetMovieRating={setUserRating}
            />
            {userRating > 0 && (
              <button className="btn-add" onClick={handleAdd}>
                + Add to list
              </button>
            )}
          </div>
          <p className="plot">
            <em>{plot}</em>
          </p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
      </>
    )}
  </div>
);

}

function ErrorMessage({message}){
  return <p className="error"><span>{message}⛔️</span></p>
}
function LoaderMessage() {
  return <p className="loader">Loading.....</p>;
}


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function NavBar({children}) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}


function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({query, setQuery}) {
  
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResult({movies}) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Box({children}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

// function WatchBox() {
//   const [isOpen2, setIsOpen2] = useState(true);
//   const [watched, setWatched] = useState(tempWatchedData);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

function MovieList({movies, onSelectMovie}) {
  
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function Main({children}) {
  return (
    <main className="main">
      {children}
    </main>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchMovie movie={movie} key={movie.imdbId} />
      ))}
    </ul>
  );
}

function WatchMovie({ movie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime}min</span>
        </p>
      </div>
    </li>
  );
}
