import react from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(<BrowserRouter  basename={process.env.PUBLIC_URL}><App/></BrowserRouter>);
