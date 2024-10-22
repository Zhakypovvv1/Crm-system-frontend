import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";
import useModal from "../../../../shared/hooks/useModal";
import { fetchTasksThunk } from "../../../../shared/slicer/tasks/getTasksSlice";
import { addTaskThunk } from "../../../../shared/slicer/tasks/addTaskSlice";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import Pagination from "../../../../shared/ui/Pagination/Pagination";
import s from "./Home.module.scss";
import { RootState } from "../../../../app/Provider/store/store";
import AddTask from "../../../../features/AddTask/ui/AddTask/AddTask";
import SortTasks from "../../../../features/SortTasks/ui/SortTasks/SortTasks";
import Tasks from "../../../../entities/Tasks/ui/Tasks/Tasks";
import useDebounce from "../../../../shared/hooks/useDebounce";
import ContentLayout from "../../../../shared/ui/contentLayout/ContentLayout";
import { Alert, message } from "antd";
import { FiPlus } from "react-icons/fi";
import AppButton from "../../../../shared/ui/Button/Button";

const Home = () => {
  const tasks = useAppSelector((state: RootState) => state.tasks);
  const { status, error } = tasks;
  const { searchValue, sortByValue, sortOrderValue, page, updateSearchParams } =
    useFilterSearchParams();
  const { isModalOpen, openModal, closeModal } = useModal();

  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(searchValue);

  useEffect(() => {
    dispatch(
      fetchTasksThunk({
        page,
        pageSize: 6,
        search: debouncedSearch,
        sortBy: sortByValue,
        sortOrder: sortOrderValue,
      })
    );
  }, [dispatch, page, debouncedSearch, sortByValue, sortOrderValue]);

  const handleSubmit = async (formData: Record<string, unknown>) => {
    dispatch(addTaskThunk(formData)).then(() => {
      dispatch(
        fetchTasksThunk({
          page,
          pageSize: 6,
          search: debouncedSearch,
          sortBy: sortByValue,
          sortOrder: sortOrderValue,
        })
      ).then(() => {
        updateSearchParams({ page }, (value: number) => value !== 1);
        message.success("Task created successfully!");
      });
    });
  };

  return (
    <ContentLayout>
      <section className={s.home}>
        {status === "failed" && (
          <Alert message="Error" description={error} type="error" showIcon />
        )}
        {status === "loading" && <Spinner />}
        <div className={s.flex}>
          <AppButton variant="tertiary" size="small" onClick={openModal}>
            <FiPlus />
            add task
          </AppButton>
          <AddTask
            handleSubmit={handleSubmit}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
          />
          <SortTasks />
        </div>
        <div>
          <Tasks items={tasks.items} totalItems={tasks.total} />
        </div>
      </section>
    </ContentLayout>
  );
};

export default Home;
