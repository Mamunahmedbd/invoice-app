import React from "react";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <>
      <Sidebar />
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
