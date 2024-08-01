import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import BoardContextProvider from "./contexts/BoardContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BoardContextProvider>
      <App />
    </BoardContextProvider>
  </React.StrictMode>
);
