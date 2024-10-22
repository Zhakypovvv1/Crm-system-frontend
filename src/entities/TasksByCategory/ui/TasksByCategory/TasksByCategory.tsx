import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import Pagination from "../../../../shared/ui/Pagination/Pagination";
import { Alert, message } from "antd";
import { getTasksByCategoryThunk } from "../../../../shared/slicer/categories/getTasksByCategories";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";
import Item from "../../../../shared/ui/Item/TaskItem/Item";
import { deleteTaskThunk } from "../../../../shared/slicer/tasks/deleteTaskSlice";
import { editTaskThunk } from "../../../../shared/slicer/tasks/editTaskSlice";
import { toggleTaskThunk } from "../../../../shared/slicer/tasks/toggleTaskSlice";

const TasksByCategory: React.FC = () => {
  const { categoryId } = useParams<string>();
  const dispatch = useAppDispatch();
  const tasksByCategory = useAppSelector((state) => state.getCategoryTasks);
  const { status, error } = tasksByCategory;
  const { page, updateSearchParams } = useFilterSearchParams();

  useEffect(() => {
    dispatch(getTasksByCategoryThunk({ categoryId, page, pageSize: 6 }));
  }, [dispatch, categoryId, page]);

  const handleDelete = (_id: string) => {
    dispatch(deleteTaskThunk(_id)).then(() => {
      dispatch(getTasksByCategoryThunk({ categoryId, page, pageSize: 6 })).then(
        () => {
          message.success("Task deleted successfully!");
        }
      );
    });
  };

  const handleEditTask = (id: string, formData: Record<string, unknown>) => {
    dispatch(editTaskThunk({ id, formData })).then(() => {
      dispatch(getTasksByCategoryThunk({ categoryId, page, pageSize: 6 }));
    });
  };

  const toggleStatus = (id: string) => {
    dispatch(toggleTaskThunk(id)).then(() => {
      dispatch(getTasksByCategoryThunk({ categoryId, page, pageSize: 6 }));
    });
  };

  const handlePageChange = (e: Record<string, number>) => {
    updateSearchParams(
      { page: e.selected + 1 },
      (value: number) => value !== 1
    );
  };

  const renderItems = tasksByCategory.tasks.map((el) => (
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
      <h2>Tasks in Category</h2>
      {renderItems}
      <Pagination
        currentPage={page}
        onChangePage={handlePageChange}
        pageCount={tasksByCategory.pages}
      />
    </>
  );
};

export default TasksByCategory;
