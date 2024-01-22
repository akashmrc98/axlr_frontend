import ReactDOM from "react-dom/client";
import App from "./App.jsx";


import { useProductStore } from "./pages/Products/useProductStore.js";
import { mountStoreDevtool } from 'simple-zustand-devtools';

import "./index.css";

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('store1', useProductStore);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
