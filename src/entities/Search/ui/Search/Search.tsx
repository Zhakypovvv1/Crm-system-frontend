import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";
import { Input } from "antd";

const Search = () => {
  const { searchValue, updateSearchParams } = useFilterSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    updateSearchParams({ [key]: value }, (value: string) => !!value);
  };
  return (
    <>
      <Input
        placeholder="Search tasks"
        value={searchValue}
        onChange={(e) => handleFilterChange("search", e.target.value)}
        style={{ width: "40%" }}
      />
    </>
  );
};

export default Search;
