import React from "react";
import ReactDOM from "react-dom";
import AppProvider from "./config/store/app_context";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const AppWrapper = (props) => {
  return (
    <AppProvider>
      <App {...props} />
    </AppProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
reportWebVitals();
