import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App.jsx";
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// registerServiceWorker();
