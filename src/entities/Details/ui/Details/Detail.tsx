import React from "react";
import { TasksType } from "../../../../shared/types/Tasks/TasksType";
import s from "./Detail.module.scss";
import { editDetailsThunk } from "../../../../shared/slicer/details/editDetailsSlice";
import { useAppDispatch } from "../../../../shared/hooks/redux-hooks";
import { getDetailsThunk } from "../../../../shared/slicer/details/getDetailsSlice";
import DetailItems from "../../../../shared/ui/DetailItems/DetailItems";
import Edit from "../../../../features/Edit/ui/Edit/Edit";

interface Details {
  id: string;
  text: string;
  task: TasksType;
}

interface DetailProps {
  items: Details | null;
  text: string | undefined;
  taskId: any;
  detailsId: any;
}

const Detail: React.FC<DetailProps> = ({ items, text, taskId, detailsId }) => {
  const dispatch = useAppDispatch();

  const handleEditDetail = (id: string, formData: Record<string, unknown>) => {
    dispatch(editDetailsThunk({ id, formData })).then(() => {
      dispatch(getDetailsThunk(taskId));
    });
  };

  const editConfig = {
    text,
  };

  return (
    <>
      <Edit
        editConfig={editConfig}
        handleEdit={handleEditDetail}
        id={detailsId}
        type="detailsEdit"
      />
      <DetailItems items={items} text={text} />
    </>
  );
};

export default Detail;
