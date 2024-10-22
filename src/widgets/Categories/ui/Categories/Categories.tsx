import React, { useEffect } from "react";
import { Button, List, Space, message, Popconfirm, Alert } from "antd";
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

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const { status, error } = categories;
  const { page } = useFilterSearchParams();
  console.log(categories);

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
    <div>
      {status === "failed" && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {status === "loading" && <Spinner />}
      <h1>Category Management</h1>
      <Space>
        <ShareForm
          handleSubmit={handleAddCategory}
          config={formConfig}
          type="categories"
        />
      </Space>

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
            <NavLink to={`/categories/${category._id}`}>
              {category.name}
            </NavLink>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Categories;
