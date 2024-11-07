import React, { useEffect } from "react";
import {
  Button,
  List,
  Space,
  message,
  Popconfirm,
  Alert,
  Typography,
} from "antd";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/redux-hooks";
import { getCategoryThunk } from "../../../../shared/slicer/categories/getCategoriesSlice";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";
import { createCategoryThunk } from "../../../../shared/slicer/categories/createCategorySlice";
import { deleteCategoryThunk } from "../../../../shared/slicer/categories/deleteCategorySlice";
import ShareForm from "../../../../shared/ui/shareForm/shareForm";
import { formConfig } from "../../../../shared/config/formConfig";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { NavLink } from "react-router-dom";
import useModal from "../../../../shared/hooks/useModal";
import AppButton from "../../../../shared/ui/Button/Button";
import Modal from "../../../../shared/ui/Modal/Modal";
import s from "./Categories.module.scss";

const { Text } = Typography;

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const { status, error } = categories;
  const { page } = useFilterSearchParams();
  const { openModal, isModalOpen, closeModal } = useModal();
  useEffect(() => {
    dispatch(getCategoryThunk({ page, pageSize: 6 }));
  }, [dispatch, page]);

  const handleAddCategory = (formData: Record<string, unknown>) => {
    dispatch(createCategoryThunk(formData)).then(() => {
      dispatch(getCategoryThunk({ page, pageSize: 6 }));
      message.success("Category created successfully!");
    });
    // message.error("Failed to add category.");
  };

  const handleDeleteCategory = (id: string) => {
    dispatch(deleteCategoryThunk(id)).then(() => {
      dispatch(getCategoryThunk({ page, pageSize: 6 }));
      message.success("Category deleted successfully!");
    });
    // message.error("Failed to delete category.");
  };

  return (
    <div className={s.container}>
      {status === "failed" && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {status === "loading" && <Spinner />}
      <h1>Category Management</h1>
      <Space>
        <AppButton variant="tertiary" size="small" onClick={openModal}>
          Create Category
        </AppButton>
      </Space>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <ShareForm
          handleSubmit={handleAddCategory}
          config={formConfig}
          type="categories"
        />
      </Modal>

      <div className={s["list-wrapper"]}>
        <List
          dataSource={categories.items}
          renderItem={(category) => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Are you sure to delete this category?"
                  onConfirm={() => handleDeleteCategory(category._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>,
              ]}
            >
              <Text strong>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`/categories/${category._id}`}
                >
                  {category.name}
                </NavLink>
              </Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Categories;
