import PropTypes from "prop-types";

import ItemCard from "./ItemCard";
import SimpleItemCard from "./SimpleItemCard";

const Item = ({ location, item }) => {
  return (
    <li className="overflow-hidden">
      {["Nook", "Salad Bar"].includes(location) ? (
        <SimpleItemCard item={item} />
      ) : (
        <ItemCard item={item} />
      )}
    </li>
  );
};

Item.propTypes = {
  location: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};

export default Item;
