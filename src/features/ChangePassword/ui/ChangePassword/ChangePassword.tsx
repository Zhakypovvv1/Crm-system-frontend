import { Form, Input, Button, message } from "antd";
import { updatePasswordThunk } from "../../../../shared/slicer/user/updatePasswordSlice";
import styles from "./ChangePassword.module.scss";
import { useAppDispatch } from "../../../../shared/hooks/redux-hooks";
import React from "react";

interface PasswordModal {
  closeModal: () => void;
}

const ChangePassword: React.FC<PasswordModal> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handlePasswordFinish = (values: Record<string, string>) => {
    const { currentPassword, newPassword } = values;
    dispatch(updatePasswordThunk({ currentPassword, newPassword }))
      .then(() => {
        message.success("Пароль успешно обновлен");
        form.resetFields();
        closeModal();
      })
      .catch((err) => {
        message.error("Ошибка обновления пароля");
        console.error(err);
        closeModal();
      });
  };

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handlePasswordFinish}
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
      >
        <Form.Item
          className={styles.formItem}
          name="currentPassword"
          label="Current password"
          rules={[{ required: true, message: "Enter the current password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          name="newPassword"
          label="New password"
          rules={[{ required: true, message: "Enter a new password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          name="confirmPassword"
          label="Confirm password"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The entered passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className={styles.formItem}>
          <Button type="primary" htmlType="submit">
            change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
