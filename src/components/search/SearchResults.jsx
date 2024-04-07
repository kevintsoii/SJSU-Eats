import moment from "moment";

import PropTypes from "prop-types";

const SearchResults = ({ data }) => {
  if (!data) {
    return null;
  }
  if (Object.keys(data).length === 0) {
    return (
      <h2 className="text-xl text-center text-gray-900 mt-3">
        No results found.
      </h2>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-y-4 mt-2 px-8">
      {Object.entries(data).map(([date, items], index) => (
        <div key={index} className="flex flex-col justify-center">
          <h1 className="text-lg font-medium">
            {moment(date).format("MMMM DD")}
          </h1>
          {items.map((item, index) => (
            <li key={index} className="text-lg">
              {item}
            </li>
          ))}
        </div>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  data: PropTypes.object,
};

export default SearchResults;
