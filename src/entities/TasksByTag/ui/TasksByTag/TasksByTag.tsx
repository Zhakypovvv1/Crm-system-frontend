import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";
import { useEffect } from "react";
import { getTasksByTagThunk } from "../../../../shared/slicer/tags/getTasksByTagSlice";
import { deleteTaskThunk } from "../../../../shared/slicer/tasks/deleteTaskSlice";
import { editTaskThunk } from "../../../../shared/slicer/tasks/editTaskSlice";
import { toggleTaskThunk } from "../../../../shared/slicer/tasks/toggleTaskSlice";
import { Alert, message } from "antd";
import Item from "../../../../shared/ui/Item/TaskItem/Item";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import Pagination from "../../../../shared/ui/Pagination/Pagination";

const TasksByTag = () => {
  const { tagId } = useParams<string>();
  const dispatch = useAppDispatch();
  const tasksByTag = useAppSelector((state) => state.getTasksBytag);
  const { status, error } = tasksByTag;
  const { page, updateSearchParams } = useFilterSearchParams();
  console.log(tasksByTag);
  

  useEffect(() => {
    dispatch(getTasksByTagThunk({ tagId, page, pageSize: 6 }));
  }, [dispatch, tagId, page]);

  const handleDelete = (_id: string) => {
    dispatch(deleteTaskThunk(_id)).then(() => {
      dispatch(getTasksByTagThunk({ tagId, page, pageSize: 6 })).then(() => {
        message.success("Task deleted successfully!");
      });
    });
  };

  const handleEditTask = (id: string, formData: Record<string, unknown>) => {
    dispatch(editTaskThunk({ id, formData })).then(() => {
      dispatch(getTasksByTagThunk({ tagId, page, pageSize: 6 }));
    });
  };

  const toggleStatus = (id: string) => {
    dispatch(toggleTaskThunk(id)).then(() => {
      dispatch(getTasksByTagThunk({ tagId, page, pageSize: 6 }));
    });
  };

  const handlePageChange = (e: Record<string, number>) => {
    updateSearchParams(
      { page: e.selected + 1 },
      (value: number) => value !== 1
    );
  };

  const renderItems = tasksByTag.tasks?.map((el) => (
    <Item
      key={el._id}
      _id={el._id}
      status={el.status}
      title={el.title}
      handleDelete={handleDelete}
      handleEditTask={handleEditTask}
      toggleStatus={toggleStatus}
    />
  ));
  return (
    <>
      {status === "failed" && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {status === "loading" && <Spinner />}
      <h2>Tasks in Tag</h2>
      {renderItems}
      <Pagination
        currentPage={page}
        onChangePage={handlePageChange}
        pageCount={tasksByTag.pages}
      />
    </>
  );
};

export default TasksByTag;
