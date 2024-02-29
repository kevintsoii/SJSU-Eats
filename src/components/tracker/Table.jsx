import PropTypes from "prop-types";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemContext } from "../../contexts/ItemContext";
import { add, remove, clear, selectItems } from "../../features/itemsSlice";

import Warning from "../status/Warning";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Table = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const { itemData } = useContext(ItemContext);

  const handleClear = () => {
    dispatch(clear());
  };

  if (Object.keys(items).length === 0) {
    return <Warning message="No items added yet." />;
  }

  return (
    <>
      <button
        onClick={handleClear}
        className="text-lg hover:bg-red-700/20 text-red-950 border border-red-700 rounded rounded-md px-3 py-1"
      >
        Delete All
      </button>

      <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-y-4 l:bg-red-300 md:w-[90%] lg:w-[80%] xl:w-[70%]">
        <div className="grid grid-cols-subgrid col-span-4 justify-items-start">
          <h2></h2>
          <h2 className="text-2xl font-medium">Item</h2>
          <h2 className="text-2xl font-medium">Calories</h2>
          <h2 className="text-2xl font-medium">Protein</h2>
        </div>

        {Object.entries(items).map(([item, amount]) => (
          <div
            key={item}
            className="grid grid-cols-subgrid col-span-4 justify-items-start text-left"
          >
            <img
              src={
                itemData[item]["image"]
                  ? "../../src/assets/images/" + itemData[item]["image"]
                  : "../../src/assets/images/no-image.svg"
              }
              loading="lazy"
              className="fade-in w-[80%] max-h-16 rounded rounded-md object-cover object-center"
            ></img>
            <div className="flex flex-col w-full">
              <h3 className="text-xl overflow-hidden whitespace-nowrap text-ellipsis">
                {item}
              </h3>
              <div className="flex">
                <h3 className="text-lg text-slate-800 pr-3">{amount}x</h3>
                <button
                  onClick={() => dispatch(add(item))}
                  className="text-green-600 hover:text-green-700"
                >
                  <AddIcon className="hover:bg-gray-300 rounded-full" />
                </button>
                <button
                  onClick={() => dispatch(remove(item))}
                  className="text-red-600 hover:text-red-700"
                >
                  <RemoveIcon className="hover:bg-gray-300 rounded-full" />
                </button>
              </div>
            </div>
            <h3 className="text-lg">
              {itemData[item]["nutrients"]["Calories"].slice(0, -4) * amount}
            </h3>
            <h3 className="text-lg">
              {itemData[item]["nutrients"]["Protein"].slice(0, -1) * amount}
            </h3>
          </div>
        ))}
      </div>

      <hr className="border-black w-[60%] my-12" />

      <div className="grid grid-cols-[1fr_3fr_1fr_1fr] w-[60%] justify-items-start mb-20">
        <h2 className="text-2xl justify-self-center">Total:</h2>
        <span></span>
        <h2 className="text-xl">
          {Object.entries(items)
            .reduce(
              (accumulator, [item, amount]) =>
                (accumulator +=
                  itemData[item]["nutrients"]["Calories"].slice(0, -4) *
                  amount),
              0
            )
            .toLocaleString()}{" "}
          kcal
        </h2>
        <h2 className="text-xl">
          {Object.entries(items).reduce(
            (accumulator, [item, amount]) =>
              (accumulator +=
                itemData[item]["nutrients"]["Protein"].slice(0, -1) * amount),
            0
          )}{" "}
          g
        </h2>
      </div>
    </>
  );
};

Table.propTypes = {
  items: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default Table;
