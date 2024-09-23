import React from "react";
import { Typography } from "antd";
import s from "./DetailItems.module.scss";
import { TasksType } from "../../types/Tasks/TasksType";

const { Paragraph } = Typography;

interface Details {
  id: string;
  text: string;
  task: TasksType;
}

interface DetailProps {
  items: Details | null;
  text: string | undefined;
}

const DetailItems: React.FC<DetailProps> = ({ items, text }) => {
  return (
    <div className={s.detailsContent}>
      {items ? (
        <Paragraph>{text}</Paragraph>
      ) : (
        <Paragraph>No details available.</Paragraph>
      )}
    </div>
  );
};

export default DetailItems;
