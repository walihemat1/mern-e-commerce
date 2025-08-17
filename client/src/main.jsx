import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/toaster";

import "./index.css";
import App from "./App.jsx";
import store from "./store/store";
import { ProductContextProvider } from "./contexts/ProductsContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
      <Toaster />
    </Provider>
  </BrowserRouter>
);
