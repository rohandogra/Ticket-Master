import React from "react";
import { Menu, Layout, Modal } from "antd";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Header } = Layout;

const NavBar = (props) => {
  const location = window.location.pathname.split("/")[1];

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={location}>
        <Menu.Item key="home">
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="customers">
          <Link to="/customers">Customers</Link>
        </Menu.Item>
        <Menu.Item key="departments">
          <Link to="/departments">Departments</Link>
        </Menu.Item>
        <Menu.Item key="employees">
          <Link to="/employees">Employees</Link>
        </Menu.Item>
        <Menu.Item key="tickets">
          <Link to="/tickets">Tickets</Link>
        </Menu.Item>
        <Menu.Item className="logout" key="logout">
          <span
            onClick={() =>
              Modal.confirm({
                title: "you are about to be logged out?",
                icon: <ExclamationCircleOutlined />,
                // content: "Bla bla ...",
                okText: "Ok",
                cancelText: "Cancle",
                onOk: () => {
                  localStorage.removeItem("token");
                  window.location = "/login";
                },
              })
            }
          >
            Logout
          </span>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default connect(null, { logout })(NavBar);
