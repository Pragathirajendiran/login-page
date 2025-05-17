// src/DashboardUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Menu, Avatar, Modal, Button } from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserForms from "./UserForms";

const { Header, Sider, Content } = Layout;

const DashboardUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handleFormSubmit = (values) => {
    // Create new user object to add to existing users list
    const newUser = {
      id: Number(values.id),
      firstName: values.name,
      lastName: "", // empty last name for now
      image: values.image,
    };

    setUsers((prevUsers) => {
      // You can customize if duplicate id logic needed, here it just adds
      return [...prevUsers, newUser];
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    window.location.reload();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="logo"
          style={{ color: "#fff", padding: "16px", textAlign: "center" }}
        >
          {collapsed ? "DM" : "Dashboard Menu"}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={({ key }) => {
            if (key === "3") {
              handleLogout();
            } else {
              setSelectedMenu(key);
            }
          }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<SettingOutlined />}>
            Forms
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            textAlign: "right",
            paddingRight: 20,
          }}
        >
          <Avatar icon={<UserOutlined />} />
        </Header>

        <Content style={{ margin: "16px" }}>
          {selectedMenu === "1" && (
            <>
              <h2 className="text-center mb-4">User Dashboard</h2>
              <div className="row">
                {users.map((user) => (
                  <div className="col-md-4 mb-4" key={user.id}>
                    <div className="card shadow-sm h-100">
                      <img
                        src={user.image || "https://via.placeholder.com/150"}
                        alt={`${user.firstName}'s avatar`}
                        className="card-img-top img-fluid rounded-circle mx-auto d-block mt-3"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">
                          {user.firstName} {user.lastName}
                        </h5>
                        <p>
                          <strong>ID:</strong> {user.id}
                        </p>
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleView(user)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Modal
                title="User Details"
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={[
                  <Button key="close" onClick={() => setShowModal(false)}>
                    Close
                  </Button>,
                ]}
              >
                {selectedUser && (
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={
                        selectedUser.image || "https://via.placeholder.com/150"
                      }
                      alt={selectedUser.firstName}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: 16,
                      }}
                    />
                    <p>
                      <strong>ID:</strong> {selectedUser.id}
                    </p>
                    <p>
                      <strong>Name:</strong> {selectedUser.firstName}{" "}
                      {selectedUser.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedUser.email}
                    </p>
                  </div>
                )}
              </Modal>
            </>
          )}

          {selectedMenu === "2" && (
            <>
              <h2 style={{ textAlign: "center", marginBottom: 20 }}>
                Add User
              </h2>
              <UserForms onSubmit={handleFormSubmit} />
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardUser;
