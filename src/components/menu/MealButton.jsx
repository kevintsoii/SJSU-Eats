import PropTypes from "prop-types";

const MealButton = ({ onClick, text, active }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 ${active ? "bg-gold" : ""}`}
    >
      {text}
    </button>
  );
};

MealButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default MealButton;
