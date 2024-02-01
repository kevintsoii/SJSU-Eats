import { useContext } from "react";
import PropTypes from "prop-types";

import { ItemContext } from "../../contexts/ItemContext";

const ItemCard = ({ item }) => {
  const { itemData } = useContext(ItemContext);

  return (
    <div className="flex rounded-md h-[15vh] overflow-hidden border-gray-500 border bg-gray-300/70">
      <div className="flex flex-col pl-3 py-2 pr-3 w-[65%]">
        <h2 className="text-lg md:text-2xl overflow-hidden whitespace-nowrap text-ellipsis">
          {item}
        </h2>
        <p className="text-gray-600 md:text-md">
          {itemData[item]["nutrients"]["Calories"].slice(0, -4)} cal
        </p>
      </div>
      <img
        src="https://olo-images-live.imgix.net/f6/f6b3ef9cec68485babdcd1ba802c6bc3.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=9b56f4cc28a602bd8180b8d8dac53e62"
        className="w-[35%] object-cover object-center border-l border-gray-500 lg:brightness-90 hover:brightness-100"
      ></img>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.string.isRequired,
};

export default ItemCard;
