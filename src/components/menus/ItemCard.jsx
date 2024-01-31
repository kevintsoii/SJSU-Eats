import { useContext } from "react";
import PropTypes from "prop-types";

import { ItemContext } from "../../contexts/ItemContext";

const ItemCard = ({ item }) => {
  const { itemData } = useContext(ItemContext);

  return (
    <div className="relative rounded-md h-[15vh] overflow-hidden">
      <img
        src="https://olo-images-live.imgix.net/f6/f6b3ef9cec68485babdcd1ba802c6bc3.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=9b56f4cc28a602bd8180b8d8dac53e62"
        className="absolute z-[-1] top-[50%] translate-y-[-50%] brightness-75"
      ></img>
      <div className="flex flex-col pl-3 py-2 pr-3 max-w-[100%] bg-gray-700/60 border-black border-b">
        <h2 className="text-lg md:text-2xl  overflow-hidden whitespace-nowrap text-ellipsis">
          {item}
        </h2>
        <p className="text-gray-600 md:text-md">
          {itemData[item]["nutrients"]["Calories"].slice(0, -4)} cal
        </p>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.string.isRequired,
};

export default ItemCard;
