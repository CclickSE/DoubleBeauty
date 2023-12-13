import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./nav-component";


const FrontendLayout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default FrontendLayout;
