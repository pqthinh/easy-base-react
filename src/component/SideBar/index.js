import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const Sidebar = ({ ...others }) => {
  const history = useHistory();
  const gotoPage = (router) => {
    history.push(router);
  };
  return (
    <div className={"sidebar"} {...others}>
      <div
        onClick={() => {
          gotoPage("/sign-in");
        }}
      >
        Login
      </div>
      <div
        onClick={() => {
          gotoPage("/register");
        }}
      >
        Register
      </div>
      <div
        onClick={() => {
          gotoPage("/");
        }}
      >
        DASHBOARD
      </div>
      <div
        onClick={() => {
          gotoPage("/forgot-password");
        }}
      >
        FORGOT_PASSWORD
      </div>
    </div>
  );
};

export default Sidebar;
