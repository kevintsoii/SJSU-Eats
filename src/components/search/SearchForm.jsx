import { useState } from "react";
import PropTypes from "prop-types";

import SearchIcon from "@mui/icons-material/Search";

const SearchForm = ({ onSubmit }) => {
  const [invalidQuery, setInvalidQuery] = useState(false);
  const [inputText, setInputText] = useState("");

  return (
    <>
      <div className="flex flex-col justify-center mt-8">
        <form
          className="flex flex-row bg-background border border-black mx-auto rounded-lg overflow-hidden focus-within:ring-sky-600/50 focus-within:ring-1"
          onSubmit={(e) => {
            e.preventDefault();
            setInputText("");
            if (inputText.length < 3 || inputText.length > 50) {
              setInvalidQuery(true);
            } else {
              setInvalidQuery(false);
              onSubmit(inputText);
            }
          }}
        >
          <input
            className="bg-inherit py-2 px-3 w-96 focus:outline-none placeholder:text-gray-600 placeholder:italic"
            type="text"
            placeholder="Item name"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></input>
          <button
            className="flex items-center pr-3 pl-4 gap-x-1 bg-blue text-white"
            type="submit"
          >
            Search
            <SearchIcon style={{ transform: "scale(0.9)" }} />
          </button>
        </form>
        {invalidQuery && (
          <h1 className="text-lg text-red-800 text-center mt-3">
            Enter at least 3 characters.
          </h1>
        )}
      </div>
    </>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
