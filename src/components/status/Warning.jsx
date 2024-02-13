import PropTypes from "prop-types";

const Warning = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-items-center bg-[#cfd45b] rounded-lg w-[60%] lg:w-[30%] mt-6 py-5 fade-down">
      <img src="./warning.svg" className="w-36" />
      <h3 className="text-2xl py-3">{message}</h3>
    </div>
  );
};

Warning.propTypes = {
  message: PropTypes.string,
};

export default Warning;
