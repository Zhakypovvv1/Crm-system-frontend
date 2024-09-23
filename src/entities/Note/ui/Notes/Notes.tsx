import NoteItem from "../../../../shared/ui/Item/NoteItem/NoteItem";
import { useAppDispatch } from "../../../../shared/hooks/redux-hooks";
import { editNoteThunk } from "../../../../shared/slicer/notes/editNoteSlice";
import { getNoteThunk } from "../../../../shared/slicer/notes/getNoteSlice";
import { deleteNoteThunk } from "../../../../shared/slicer/notes/deleteNoteSlice";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";

interface Note {
  _id: string;
  taskId: string;
  text: string;
  createdAt: string;
}

interface NotesItemProps {
  items: Note[];
  taskId: string | undefined;
}

const Notes: React.FC<NotesItemProps> = ({ items, taskId }) => {
  const { page } = useFilterSearchParams();
  const dispatch = useAppDispatch();
  console.log(items);

  const handleDelete = (_id: string) => {
    dispatch(deleteNoteThunk(_id)).then(() => {
      dispatch(getNoteThunk({ taskId, page, pageSize: 6 }));
    });
  };

  const handleEditNote = (id: string, formData: Record<string, unknown>) => {
    console.log(formData);
    dispatch(editNoteThunk({ id, formData })).then(() => {
      dispatch(
        getNoteThunk({
          taskId,
          page,
          pageSize: 6,
        })
      );
    });
  };

  const renderItems = items?.map((el, index) => (
    <NoteItem
      key={el._id}
      {...el}
      index={index}
      handleDelete={handleDelete}
      handleEditNote={handleEditNote}
    />
  ));
  return <>{renderItems}</>;
};

export default Notes;
