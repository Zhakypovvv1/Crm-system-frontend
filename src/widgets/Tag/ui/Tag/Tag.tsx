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
import useModal from "../../../../shared/hooks/useModal";
import AppButton from "../../../../shared/ui/Button/Button";
import Modal from "../../../../shared/ui/Modal/Modal";

const { Title } = Typography;

const Tag = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags);
  const { status, error } = tags;

  const { openModal, isModalOpen, closeModal } = useModal();

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
    <>
      {status === "failed" && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {status === "loading" && <Spinner />}
      <div className={s.container}>
        <Space className={s.tagList}>
          <Title>Tag Managment</Title>
          <AppButton variant="tertiary" size="small" onClick={openModal}>
            Create Tag
          </AppButton>
          <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
            <ShareForm
              handleSubmit={handleAddTag}
              config={formConfig}
              type="tags"
            />
          </Modal>
          <div className={s.tagWrapper}>
            {tags.items.map((el) => (
              <AntTag key={el._id} className={s.tagItems} color="blue">
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`/tags/${el._id}`}
                >
                  {el.name}
                </NavLink>
              </AntTag>
            ))}
          </div>
        </Space>
      </div>
    </>
  );
};

export default Tag;
