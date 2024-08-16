import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import BoardContextProvider from "./contexts/BoardContextProvider.jsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Router>
      <BoardContextProvider>
        <App />
      </BoardContextProvider>
    </Router>
  /* </React.StrictMode> */
);
