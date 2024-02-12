import { useContext } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { add } from "../../features/itemsSlice";
import { ItemContext } from "../../contexts/ItemContext";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoIcon from "@mui/icons-material/Info";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const { itemData } = useContext(ItemContext);

  const handleAdd = () => {
    dispatch(add(item));
  };

  return (
    <div className="flex rounded-md h-[15vh] overflow-hidden border-gray-500 border bg-zinc-300">
      <div className="flex flex-col justify-between pl-3 py-2 pr-3 w-[65%]">
        <div>
          <h2 className="text-lg md:text-2xl overflow-hidden whitespace-nowrap text-ellipsis">
            {item}
          </h2>
          <p className="text-gray-600 md:text-md">
            {itemData[item]["nutrients"]["Calories"].slice(0, -4)} cal
          </p>
        </div>
        <div className="mb-1">
          <button className="shrink-button">
            <InfoIcon style={{ fontSize: "26px", color: "#024e99" }} />
          </button>
          <button onClick={handleAdd} className="shrink-button ml-1">
            <AddCircleOutlineIcon
              style={{ fontSize: "26px", color: "#0d5400" }}
            />
          </button>
        </div>
      </div>
      <img
        key={item}
        src={
          itemData[item]["image"]
            ? "../../src/assets/images/" + itemData[item]["image"]
            : "../../src/assets/images/no-image.svg"
        }
        loading="lazy"
        className="w-[35%] object-cover object-center border-l border-gray-500 lg:brightness-90 hover:brightness-100 fade-in"
      ></img>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.string.isRequired,
};

export default ItemCard;
