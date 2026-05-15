import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={1} />
    <StarRating maxRating={2}/>
    <StarRating maxRating={3} color='red' size={24}/>
    <StarRating maxRating={4} color='blue' size={24}/>
    <StarRating maxRating={5} color='pink' size={24} messages={["Bad", "Poor", "Okay", "Good", "Excellent"]}/>
  </React.StrictMode>
);

