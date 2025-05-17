<<<<<<< HEAD
// src/login.js
import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Basic mock check (you can replace this with real auth logic)
      if (
        values.username === "pragathi" &&
        values.password === "pragathi@123#"
      ) {
        onLogin();
      } else {
        alert("Invalid username or password");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card title="Login" style={{ width: 300 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="admin" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="admin" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
=======
import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      if (values.username === "root" && values.password === "root@123#") {
        sessionStorage.setItem("isAuthenticated", "true");
        onLogin();
      } else {
        alert("Invalid username or password");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card title="Login" style={{ width: 300 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="admin" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="admin" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
>>>>>>> e5bc838 (Your commit message here)
