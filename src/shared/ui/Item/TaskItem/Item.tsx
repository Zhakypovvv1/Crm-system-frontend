import { Card, Button, Tag, Typography, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";
import Edit from "../../../../features/Edit/ui/Edit/Edit";
import s from "./Item.module.scss";
import { NavLink } from "react-router-dom";

export interface PropsItem {
  _id: string;
  status: boolean | string;
  title: string;
  handleDelete: (id: string) => void;
  handleEditTask: (id: string, formData: Record<string, unknown>) => void;
  toggleStatus: (id: string) => void;
}

const { Text } = Typography;

const Item: React.FC<PropsItem> = ({
  _id,
  status,
  title,
  handleDelete,
  handleEditTask,
  toggleStatus,
}) => {
  const statusStyles = status ? s.completed : s.processing;
  const statusText = status ? "Completed" : "Processing";
  const editConfig = {
    title,
  };
  return (
    <>
      <Card
        title={
          <Text>
            id: <Text strong>{_id}</Text>
          </Text>
        }
        actions={[
            <Edit
              type="edit"
              editConfig={editConfig}
              id={_id}
              handleEdit={handleEditTask}
            />,
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(_id)}
          >
            delete
          </Button>,
          <Button
            type="link"
            icon={<StrikethroughOutlined />}
            onClick={() => toggleStatus(_id)}
            danger
          >
            status
          </Button>,
        ]}
        className={s.box}
      >
        <Space direction="vertical">
          <p>
            <Text>Title: </Text>
            <Text strong>{title}</Text>
          </p>
          <p>
            <Text>Status: </Text>
            <Tag color={status ? "green" : "red"} className={statusStyles}>
              {statusText}
            </Tag>
          </p>
          <div className={s["link-wrapper"]}>
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/tasks/${_id}/notes`}
            >
              add notes
            </NavLink>
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/tasks/${_id}/details`}
            >
              add details
            </NavLink>
          </div>
        </Space>
      </Card>
    </>
  );
};

export default Item;
