import { Tag, Typography } from "antd";
import AppButton from "../../Button/Button";
import s from "./NoteItem.module.scss";
import Edit from "../../../../features/Edit/ui/Edit/Edit";

const { Paragraph } = Typography;

interface EditNote {
  text: string;
}

export interface PropsItem {
  _id: string;
  text: string;
  index: number;
  handleDelete: (id: string) => void;
  handleEditNote: (id: string, formData: Record<string, unknown>) => void;
}

const NoteItem: React.FC<PropsItem> = ({
  _id,
  text,
  index,
  handleDelete,
  handleEditNote,
}) => {
  const editConfig = {
    text,
  };
  
  return (
    <>
      <div className={s.noteItem}>
        <div>
          <Tag color="blue">{index + 1}</Tag>
          <Paragraph ellipsis={{ rows: 2 }}>{text}</Paragraph>
        </div>
        <AppButton
          onClick={() => handleDelete(_id)}
          variant="tertiary"
          size="small"
        >
          delete
        </AppButton>
        <Edit
          editConfig={editConfig}
          handleEdit={handleEditNote}
          id={_id}
          type="editNote"
        />
      </div>
    </>
  );
};

export default NoteItem;
