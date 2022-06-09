import React from "react";
import ReactDOM from "react-dom/client";
import Counter from "./components/Counter";
import Cat from "./components/Cat";
import "./index.css";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
      <Cat />
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // React.StrictMode is a wrapper to help prepare apps for async rendering 
  // This behaviour definitely has some performance impact, but we should not worry since it takes place only in development and not in production.
  // That is why we managed to reproduce double-rendering only in development mode.
  // React.StrictMode is not required for modern apps, but it is helpful for legacy apps

  
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);