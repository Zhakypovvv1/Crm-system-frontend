import React, { useState, useEffect } from "react";
import { addTagsToTaskThunk } from "../../../../shared/slicer/tags/addTagToTaskSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import { Alert, Button, Select, message } from "antd";
import { getTagsThunk } from "../../../../shared/slicer/tags/getTagsSlice";
import { fetchTasksThunk } from "../../../../shared/slicer/tasks/getTasksSlice";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";
import useDebounce from "../../../../shared/hooks/useDebounce";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
const { Option } = Select;

interface AddTagsToTaskProps {
  taskId: string;
}

const AddTagsToTask: React.FC<AddTagsToTaskProps> = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = useAppSelector((state) => state.tags);
  const { error, status } = useAppSelector((state) => state.tags);
  const { searchValue, sortByValue, sortOrderValue, page } =
    useFilterSearchParams();
  const debouncedSearch = useDebounce(searchValue);

  useEffect(() => {
    dispatch(getTagsThunk());
  }, [dispatch]);

  const handleAddTags = () => {
    dispatch(addTagsToTaskThunk({ taskId, tagIds: selectedTags })).then(() => {
      dispatch(getTagsThunk())
        .then(() => {
          message.success("Tags added successfully!");
        })
        .then(() => {
          dispatch(
            fetchTasksThunk({
              page,
              pageSize: 6,
              search: debouncedSearch,
              sortBy: sortByValue,
              sortOrder: sortOrderValue,
            })
          );
        });
    });
  };

  return (
    <div>
      {status === "failed" && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {status === "loading" && <Spinner />}
      <Select
        mode="multiple"
        placeholder="Select tags"
        value={selectedTags}
        onChange={(values) => setSelectedTags(values)}
        style={{ width: "100%" }}
        loading={status === "loading"}
      >
        {tags.items.map((tag: any) => (
          <Option key={tag._id} value={tag._id}>
            {tag.name}
          </Option>
        ))}
      </Select>
      <Button onClick={handleAddTags} disabled={!selectedTags.length}>
        Add Tags
      </Button>
    </div>
  );
};

export default AddTagsToTask;
