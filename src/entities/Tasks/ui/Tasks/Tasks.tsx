import { fetchTasksThunk } from "../../../../shared/slicer/tasks/getTasksSlice";
import { deleteTaskThunk } from "../../../../shared/slicer/tasks/deleteTaskSlice";
import { editTaskThunk } from "../../../../shared/slicer/tasks/editTaskSlice";
import { toggleTaskThunk } from "../../../../shared/slicer/tasks/toggleTaskSlice";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";
import { useAppDispatch } from "../../../../shared/hooks/redux-hooks";
import { TasksType } from "../../../../shared/types/Tasks/TasksType";
import s from "./Tasks.module.scss";
import TableTasks from "../../../../widgets/Table/ui/Table/TableTasks";
import { message } from "antd";

interface PropsItem {
  items: TasksType[];
  totalItems: number;
}

const Tasks: React.FC<PropsItem> = ({ items, totalItems }) => {
  const { page, searchValue, sortByValue, sortOrderValue } =
    useFilterSearchParams();
  const dispatch = useAppDispatch();

  console.log(items);

  const handleDelete = (_id: string) => {
    dispatch(deleteTaskThunk(_id)).then(() => {
      dispatch(
        fetchTasksThunk({
          page,
          pageSize: 6,
          search: searchValue,
          sortBy: sortByValue,
          sortOrder: sortOrderValue,
        })
      ).then(() => {
        message.success("Task deleted successfully!");
      });
    });
  };

  const handleEditTask = (id: string, formData: Record<string, unknown>) => {
    dispatch(editTaskThunk({ id, formData })).then(() => {
      dispatch(
        fetchTasksThunk({
          page,
          pageSize: 6,
          search: searchValue,
          sortBy: sortByValue,
          sortOrder: sortOrderValue,
        })
      );
    });
  };

  const toggleStatus = (id: string) => {
    dispatch(toggleTaskThunk(id)).then(() => {
      dispatch(
        fetchTasksThunk({
          page,
          pageSize: 6,
          search: searchValue,
          sortBy: sortByValue,
          sortOrder: sortOrderValue,
        })
      );
    });
  };

  return (
    <section>
      <TableTasks
        items={items}
        totalItems={totalItems}
        toggleStatus={toggleStatus}
        handleEditTask={handleEditTask}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Tasks;
