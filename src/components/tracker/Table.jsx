import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemContext } from "../../contexts/ItemContext";
import { clear, selectItems } from "../../features/itemsSlice";

import Cart from "./Cart";
import Warning from "../status/Warning";

const Table = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const handleClear = () => {
    dispatch(clear());
  };

  const { itemData } = useContext(ItemContext);

  if (Object.keys(items).length === 0) {
    return <Warning message="No items added yet." />;
  }

  return (
    <>
      <button
        onClick={handleClear}
        className="text-lg hover:bg-red-700/20 text-red-950 border border-red-700 rounded rounded-md px-3 py-1 mb-4"
      >
        Delete All
      </button>

      <Cart />

      <hr className="border-black w-[80%] md:w-[60%] mt-12 mb-6" />

      <div className="flex flex-col mb-20">
        <h2 className="text-xl">
          Total Calories:{" "}
          {Object.entries(items)
            .reduce(
              (accumulator, [item, amount]) =>
                (accumulator +=
                  itemData[item]["calories"].slice(0, -4) * amount),
              0
            )
            .toLocaleString()}{" "}
          kcal
        </h2>
        <h2 className="text-xl">
          Total Protein:{" "}
          {Object.entries(items).reduce(
            (accumulator, [item, amount]) =>
              (accumulator += itemData[item]["protein"].slice(0, -1) * amount),
            0
          )}{" "}
          g
        </h2>
      </div>
    </>
  );
};

export default Table;
