import { useState } from "react";
import { useQuery } from "react-query";

import Header from "../components/Header";
import Error from "../components/status/Error";
import Loading from "../components/status/Loading";
import SearchForm from "../components/search/SearchForm";
import SearchResults from "../components/search/SearchResults";

const Search = () => {
  const [query, setQuery] = useState("");

  const fetchData = async (query) => {
    console.log(query);
    if (query.length < 3) {
      throw "Search query must be at least 3 characters long.";
    }
    if (query.length > 50) {
      throw "Search query must be at most 50 characters long.";
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/search/${query}`
    );
    const data = await response.json();
    return data;
  };

  const { isLoading, error, data } = useQuery(
    ["search", query],
    () => fetchData(query),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: !!query,
    }
  );

  return (
    <>
      <Header />
      <span className="block mt-20"></span>

      <h1 className="text-3xl font-semibold text-center pt-10 px-6">
        <span className="text-blue">Search</span> for upcoming items
      </h1>

      <SearchForm onSubmit={setQuery} />
      <main className="flex justify-center pt-4 pb-[6vh]">
        {error ? (
          <Error message="asddasds" />
        ) : isLoading ? (
          <Loading />
        ) : (
          <SearchResults data={data} />
        )}
      </main>
    </>
  );
};

export default Search;
