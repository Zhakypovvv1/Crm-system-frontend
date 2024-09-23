import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNoteThunk } from "../../../../shared/slicer/notes/getNoteSlice";
import { createNoteThunk } from "../../../../shared/slicer/notes/createNoteSlice";
import { Alert } from "antd";
import ContentLayout from "../../../../shared/ui/contentLayout/ContentLayout";
import useModal from "../../../../shared/hooks/useModal";
import s from "./Note.module.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import Pagination from "../../../../shared/ui/Pagination/Pagination";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import AddNote from "../../../../features/AddNote/ui/AddNote/AddNote";
import { FiPlus } from "react-icons/fi";
import AppButton from "../../../../shared/ui/Button/Button";
import Notes from "../../../../entities/Note/ui/Notes/Notes";

const Note = () => {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);
  const { status, error } = useAppSelector((state) => state.notes);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { page, updateSearchParams } = useFilterSearchParams();
  console.log(notes?.items);
  

  useEffect(() => {
    dispatch(getNoteThunk({ taskId: id, page, pageSize: 6 }));
  }, [dispatch, id, page]);

  const handleSubmit = (formData: Record<string, unknown>) => {
    dispatch(createNoteThunk({ taskId: id, newNote: formData })).then(() => {
      closeModal();
      dispatch(getNoteThunk({ taskId: id, page, pageSize: 6 }));
    });
  };

  const handlePageChange = (e: Record<string, number>) => {
    updateSearchParams(
      { page: e.selected + 1 },
      (value: number) => value !== 1
    );
  };

  return (
    <ContentLayout>
      <div className={s.notesWrapper}>
        {status === "failed" && (
          <Alert message="Error" description={error} type="error" showIcon />
        )}
        {status === "loading" && <Spinner />}
        <header className={s.header}>
          <h3>Notes</h3>
          <AppButton variant="tertiary" size="small" onClick={openModal}>
            <FiPlus />
            Add Note
          </AppButton>
          <AddNote
            handleSubmit={handleSubmit}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
          />
        </header>
        <div className={s.noteFlex}>
          <Notes items={notes.items} taskId={id}/>
        </div>
        <Pagination
          currentPage={page}
          onChangePage={handlePageChange}
          pageCount={notes.pages}
        />
      </div>
    </ContentLayout>
  );
};

export default Note;
