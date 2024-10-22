import React, { useState, useEffect } from "react";
import { addTagsToTaskThunk } from "../../../../shared/slicer/tags/addTagToTaskSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import { Button, Select, message } from "antd";
import { getTagsThunk } from "../../../../shared/slicer/tags/getTagsSlice";
const { Option } = Select;

interface AddTagsToTaskProps {
  taskId: string;
}

const AddTagsToTask: React.FC<AddTagsToTaskProps> = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = useAppSelector((state) => state.tags);
  const { error, status } = useAppSelector((state) => state.tags);
  console.log(selectedTags);
  console.log(taskId);

  useEffect(() => {
    dispatch(getTagsThunk());
  }, [dispatch]);

  const handleAddTags = () => {
    dispatch(addTagsToTaskThunk({ taskId, tagIds: selectedTags })).then(() => {
      dispatch(getTagsThunk()).then(() => {
        message.success("Tags added successfully!");
      });
    });
  };

  return (
    <div>
      <h2>Add Tags to Task</h2>
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
