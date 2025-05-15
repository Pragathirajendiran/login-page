import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Modal,
  Button,
  Form,
  Input,
  Upload,
  message as antMessage,
} from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.error("Error fetching users:", err));
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

  const onFinish = (values) => {
    const newEntry = {
      name: values.name,
      place: values.place,
      phone: values.phone,
      image: values.image?.file?.thumbUrl || null,
    };

    setFormList([...formList, newEntry]);
    antMessage.success("Form details updated successfully");
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
              alert("Logged out");
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
                        <p className="card-text">
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
              <h2>Forms</h2>
              <Form
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 500 }}
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input placeholder="Enter name" />
                </Form.Item>
                <Form.Item
                  name="place"
                  label="Place"
                  rules={[
                    { required: true, message: "Please enter your place" },
                  ]}
                >
                  <Input placeholder="Enter place" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    { required: true, message: "Please enter phone number" },
                  ]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
                <Form.Item name="image" label="Upload Image">
                  <Upload
                    listType="picture"
                    beforeUpload={() => false} // prevent automatic upload
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit Form
                  </Button>
                </Form.Item>
              </Form>

              {/* Submitted Forms List */}
              <div className="mt-4">
                <h4>Submitted Forms</h4>
                {formList.map((form, index) => (
                  <div
                    key={index}
                    className="card mb-3 p-3 shadow-sm"
                    style={{ maxWidth: 500 }}
                  >
                    {form.image && (
                      <img
                        src={form.image}
                        alt="Uploaded"
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginBottom: 10,
                        }}
                      />
                    )}
                    <p>
                      <strong>Name:</strong> {form.name}
                    </p>
                    <p>
                      <strong>Place:</strong> {form.place}
                    </p>
                    <p>
                      <strong>Phone:</strong> {form.phone}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
