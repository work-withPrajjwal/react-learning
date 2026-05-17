import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StarRating';


function Test(){
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating
        color="red"
        maxRating={5}
        messages={["Bad", "Poor", "Okay", "Good", "Excellent"]} onSetMovieRating={setMovieRating} defaultRating={3}
      />
      <p>THis movie was {movieRating} Stars.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating='5' messages='hello'
    />
  </React.StrictMode>,
);



