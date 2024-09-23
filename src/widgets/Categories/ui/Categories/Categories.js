import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryThunk } from '../../../../shared/slicer/categories/getCategoriesSlice';
import { Spin, Alert, Pagination } from 'antd';
import ContentLayout from '../../../../shared/ui/contentLayout/ContentLayout';
import useFilterSearchParams from '../../../../shared/hooks/useFilterSearchParams';
import s from './Categories.module.scss';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.items);
  const { status, error, pages } = useSelector(state => state.category);
  const { page, pageSize, updateSearchParams } = useFilterSearchParams();

  useEffect(() => {
    dispatch(getCategoryThunk({ page, pageSize: 8 }));
  }, [dispatch, page, pageSize]);

  const handlePageChange = e => {
    updateSearchParams({ page: e.selected + 1 }, value => value !== 1);
  };

  if (status === 'loading') {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <ContentLayout>
      <div className={s.categoriesWrapper}>
        <h2>Categories</h2>
        {categories.length ? (
          <ul>
            {categories.map(el => (
              <li key={el._id}>{el.name}</li>
            ))}
          </ul>
        ) : (
          <p>No categories available.</p>
        )}
        <Pagination
          currentPage={page}
          onChangePage={handlePageChange}
          pageCount={pages}
        />
      </div>
    </ContentLayout>
  );
};

export default Categories;
