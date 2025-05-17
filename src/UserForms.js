import React, { useState } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UserForms = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    let image = null;
    if (fileList.length > 0) {
      image = fileList[0].thumbUrl || fileList[0].url || null;
    }

    onSubmit({ ...values, image });

    // ✅ Show notification message after successful form submit
    message.success("Form added successfully!");

    form.resetFields();
    setFileList([]);
  };

  const uploadProps = {
    beforeUpload: () => false,
    onChange: ({ fileList }) => setFileList(fileList),
    fileList,
    listType: "picture",
    maxCount: 1,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 40,
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{
          width: 400,
          padding: 24,
          border: "1px solid #ccc",
          borderRadius: 8,
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Form.Item
          name="id"
          label="ID"
          rules={[{ required: true, message: "Please enter ID" }]}
        >
          <Input placeholder="Enter ID" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload Image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForms;
