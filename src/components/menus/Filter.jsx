import { PropTypes } from "prop-types";

const Filter = ({ text }) => {
  return <h2 className="text-lg rounded-full bg-[#39bf5e] px-3">{text}</h2>;
};

Filter.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Filter;
