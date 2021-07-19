import React from "react";
import Routes from "./config/route";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./component/SideBar";

export default function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <>
          <Sidebar />
          <Routes {...props} />
        </>
      </BrowserRouter>
    </React.Fragment>
  );
}
