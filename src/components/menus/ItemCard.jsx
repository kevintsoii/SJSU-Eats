import PropTypes from "prop-types";

const ItemCard = ({ location, item }) => {
  return (
    <div className="w-20">
      {["Nook"].includes(location) ? (
        <p className="text-red-500">{item}</p>
      ) : (
        <p>{item}</p>
      )}
    </div>
  );
};

ItemCard.propTypes = {
  location: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};

export default ItemCard;
