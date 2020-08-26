import React, { useEffect } from "react";
import "./layout.scss";
import NavBar from "../components/navigation/NavBar.jsx";

const Layout = (props) => {
  const title = props?.title;

  useEffect(() => {
    document.title = title ? title : "Ticket-Mater";
  }, [title]);
  return (
    <div>
      <NavBar />
      <div className="layout">{props.children}</div>
    </div>
  );
};
export default Layout;
