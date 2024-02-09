import PropTypes from "prop-types";

const Error = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-items-center bg-[#d97171] rounded-lg w-[60%] lg:w-[30%] mt-6 py-5 fade-down">
      <img src="./error.png" className="w-36" />
      <h3 className="text-2xl py-3">
        {message === "No menus found for this date."
          ? "The Dining Commons is closed."
          : "An error occurred"}
      </h3>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
