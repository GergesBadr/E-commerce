import { useSearchParams } from "react-router-dom";
import { useCategories } from "../../services/useCategories";
import Spinner from "../../components/Spinner";
import ErrorIndicator from "../../components/ErrorIndicator";

function FilterShop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError, error } = useCategories();

  function handleFilter(e) {
    e.preventDefault();
    searchParams.set("category", e.target.value);
    setSearchParams(searchParams);

    // Reset params
    if (searchParams.get("q")) {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
    if (searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorIndicator errorMessage={error} />;

  return (
    <form className="w-full sm:w-auto">
      <select
        onChange={handleFilter}
        name="category"
        id="category"
        aria-label="Filter products by category"
        className="w-full rounded-lg bg-white p-3 shadow-md dark:bg-dark-bg"
      >
        <option value="">Filter products by category:</option>
        <option value="all">All</option>
        {data?.map((category) => {
          return (
            // According to the API docs, the (category.slug) is the category name formatted.
            // making it lowercase and replace spaces with dashes "-"
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          );
        })}
      </select>
    </form>
  );
}

export default FilterShop;
