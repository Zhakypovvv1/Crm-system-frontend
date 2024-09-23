import { Form, Input, Button, message, FormInstance } from "antd";
import { updateProfileThunk } from "../../../../shared/slicer/user/updateProfileSlice";
import { useAppDispatch } from "../../../../shared/hooks/redux-hooks";

interface User {
  name?: string;
  email?: string;
}

interface ChangeProfileProps {
  user: User | null;
  form: FormInstance;
  fetchUserUI: () => void;
}

const ChangeProfile: React.FC<ChangeProfileProps> = ({
  user,
  form,
  fetchUserUI,
}) => {
  const dispatch = useAppDispatch();
  const handleFinish = (values: User) => {
    dispatch(updateProfileThunk(values))
      .then(() => {
        message.success("Профиль обновлен");
        fetchUserUI();
      })
      .catch(() => {
        message.error("Ошибка обновления профиля");
      });
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        name: user?.name,
        email: user?.email,
      }}
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваш email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Обновить профиль
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangeProfile;
