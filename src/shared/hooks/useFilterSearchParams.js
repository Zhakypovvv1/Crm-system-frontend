import { useSearchParams } from "react-router-dom";

const useFilterSearchParams = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  const searchValue = queryParams.get("search") || "";
  const categoryValue = queryParams.get("category") || "";
  const sortByValue = queryParams.get("sortBy") || "createdAt";
  const sortOrderValue = queryParams.get("sortOrder") || "desc";
  const page = parseInt(queryParams.get("page")) || 1;
  const pageSize = parseInt(queryParams.get("pageSize")) || 6;

  const updateSearchParams = (updates, callback) => {
    const newQueryParams = new URLSearchParams(queryParams);

    for (let key in updates) {
      const value = updates[key];
      if (callback(value)) {
        newQueryParams.set(key, value);
      } else {
        newQueryParams.delete(key);
      }
    }

    setQueryParams(newQueryParams, { replace: true });
  };

  return {
    searchValue,
    page,
    pageSize,
    categoryValue,
    updateSearchParams,
    sortByValue,
    sortOrderValue,
  };
};

export default useFilterSearchParams;
