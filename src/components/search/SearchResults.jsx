import PropTypes from "prop-types";

const SearchResults = ({ data }) => {
  if (!data) {
    return null;
  }
  if (data.length === 0) {
    return (
      <h2 className="text-xl text-center text-gray-900 mt-5">
        No results found.
      </h2>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      {data.map((item, index) => (
        <h1 key={index}>{item.date}</h1>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  data: PropTypes.arrayOf(Object),
};

export default SearchResults;
