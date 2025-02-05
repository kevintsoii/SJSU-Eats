import { useContext } from "react";
import PropTypes from "prop-types";

import { ItemContext } from "../../contexts/ItemContext";

const SimpleItemCard = ({ item }) => {
  const { itemData } = useContext(ItemContext);

  return (
    <div className="md:py-3">
      <h2 className="text-lg md:text-2xl max-w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
        {item}
      </h2>
      <p className="text-gray-600 md:text-md">
        {itemData[item]["calories"].slice(0, -4)} cal
      </p>
    </div>
  );
};

SimpleItemCard.propTypes = {
  item: PropTypes.string.isRequired,
};

export default SimpleItemCard;
