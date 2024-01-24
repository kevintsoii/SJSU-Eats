import PropTypes from "prop-types";

const Item = ({ location, item }) => {
  return (
    <div className="">
      {["Nook", "Salad Bar"].includes(location) ? (
        <p className="text-red-500">{item}</p>
      ) : (
        <p>{item}</p>
      )}
    </div>
  );
};

Item.propTypes = {
  location: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};

export default Item;
