import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import { getTagsThunk } from "../../../../shared/slicer/tags/getTagsSlice";
import { Alert, message, Space, Tag as AntTag, Typography } from "antd";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { createTagThunk } from "../../../../shared/slicer/tags/createTagSlice";
import ShareForm from "../../../../shared/ui/shareForm/shareForm";
import { formConfig } from "../../../../shared/config/formConfig";
import s from "./Tag.module.scss";
import { NavLink } from "react-router-dom";

const { Title } = Typography;

const Tag = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags);
  const { status, error } = tags;

  console.log(tags.items);

  useEffect(() => {
    dispatch(getTagsThunk());
  }, [dispatch]);

  const handleAddTag = (formData: Record<string, unknown>) => {
    dispatch(createTagThunk(formData)).then(() => {
      dispatch(getTagsThunk());
      message.success("Tag created successfully!");
    });
  };
  return (
    <div>
      {status === "failed" && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {status === "loading" && <Spinner />}

      <Space direction="vertical" size="middle" className={s.tagContent}>
        <Title level={4}>Create New Tag</Title>
        <ShareForm
          handleSubmit={handleAddTag}
          config={formConfig}
          type="tags"
        />
        <Title level={5}>Existing Tags</Title>
        <div className={s.tagList}>
          {tags.items.map((el) => (
            <AntTag key={el._id} className={s.tagItem}>
              <NavLink to={`/tags/${el._id}`}>{el.name}</NavLink>
            </AntTag>
          ))}
        </div>
      </Space>
    </div>
  );
};

export default Tag;
