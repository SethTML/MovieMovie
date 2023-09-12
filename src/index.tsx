import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

let path = window.location.pathname;

if (path === "/" || path === "/movies" || path === "/tv"){
  import("./Landing/LandingCSS.js").then(() => {
    console.log("Basic CSS Loaded");
  })
}
else{
  import("./NotFoundCSS.js").then(() => {
    console.log("Not Found CSS Loaded");
  })
}

const root = ReactDOM.createRoot(
  document.querySelector('body') as HTMLElement
);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
