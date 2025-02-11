import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { add } from "../../features/itemsSlice";
import { ItemContext } from "../../contexts/ItemContext";

import { Popup } from "./InfoPopup";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoIcon from "@mui/icons-material/Info";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const { itemData } = useContext(ItemContext);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [popupEnabled, setPopupEnabled] = useState(false);

  const handleAdd = () => {
    dispatch(add(item));
  };

  const handleOpen = () => {
    setPopupEnabled(true);

    const scrollY = document.documentElement.scrollTop;
    window.onscroll = function () {
      window.scrollTo(0, scrollY);
    };
  };

  const handleClose = (event) => {
    if (
      event.target.classList.contains("overlay") ||
      event.target.classList.contains("overlay-close") ||
      (event.target.nodeName === "path" &&
        event.target.parentNode.classList.contains("overlay-close"))
    ) {
      setPopupEnabled(false);
      window.onscroll = function () {};
    }
  };

  const onImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="flex rounded-md h-[15vh] overflow-hidden border-gray-500 border bg-zinc-300">
      <div className="flex flex-col justify-between pl-3 py-2 pr-3 w-[65%]">
        <div>
          <h2 className="text-lg md:text-2xl overflow-hidden whitespace-nowrap text-ellipsis">
            {item}
          </h2>
          <p className="text-gray-600 md:text-md">
            {itemData[item]["calories"].slice(0, -4)} cal
          </p>
        </div>
        <div className="mb-1">
          <button className="shrink-button">
            <InfoIcon
              onClick={handleOpen}
              style={{ fontSize: "26px", color: "#024e99" }}
            />
          </button>
          <button onClick={handleAdd} className="shrink-button ml-1">
            <AddCircleOutlineIcon
              style={{ fontSize: "26px", color: "#0d5400" }}
            />
          </button>
        </div>
      </div>
      <div className="w-[35%] border-l border-gray-500 lg:brightness-90 hover:brightness-100">
        <img
          key={item}
          src={
            itemData[item]["image"] ? itemData[item]["image"] : "/no-image.svg"
          }
          onLoad={onImageLoad}
          onError={onImageLoad}
          className={`object-cover object-center z-10 h-full w-full fade-in ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        ></img>
      </div>
      <Popup enabled={popupEnabled} onClose={handleClose} itemName={item} />
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.string.isRequired,
};

export default ItemCard;
