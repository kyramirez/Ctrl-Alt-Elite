import ReactDOMClient from "react-dom/client";
import MyApp from "./App";
import "./app.css";

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render:
root.render(<MyApp />);
