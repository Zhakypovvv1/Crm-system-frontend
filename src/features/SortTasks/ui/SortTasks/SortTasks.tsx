import { Select } from "antd";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";
import s from "./SortTasks.module.scss";

const { Option } = Select;

const SortTasks = () => {
  const { sortByValue, updateSearchParams } = useFilterSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const updatedValue = value === "createdAt" ? "" : value;
    updateSearchParams({ [key]: updatedValue }, (value: string) => !!value);
  };
  return (
    <Select
      value={sortByValue || "createdAt"}
      onChange={(value) => handleFilterChange("sortBy", value)}
      className={s.sorter}
    >
      <Option value="createdAt">Created At</Option>
      <Option value="title">Title</Option>
      <Option value="status">Status</Option>
    </Select>
  );
};

export default SortTasks;
