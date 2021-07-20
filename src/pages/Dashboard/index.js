import React from "react";
import { Button } from "@material-ui/core";
import useStorage from "../../hooks/useStorage";

const Dashboard = () => {
  const { reset } = useStorage();
  const logout = () => {
    reset();
  };

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
      <p> Dashboard</p>
    </div>
  );
};
export default Dashboard;
