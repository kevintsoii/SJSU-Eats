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

  if (Object.keys(items).length === 0) {
    return <Warning message="No items added yet." />;
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-y-4 w-[60%]">
        <div className="grid grid-cols-subgrid col-span-4 justify-items-start">
          <h2></h2>
          <h2 className="text-2xl font-medium">Item</h2>
          <h2 className="text-2xl font-medium">
            Calories <span className="text-xl text-gray-600">(cal)</span>
          </h2>
          <h2 className="text-2xl font-medium">
            Protein <span className="text-xl text-gray-600">(g)</span>
          </h2>
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
              <h2 className="text-xl overflow-hidden whitespace-nowrap text-ellipsis">
                {item}
              </h2>
              <div className="flex pr-10">
                <h3 className="text-lg text-gray-600 pr-3">{amount}x</h3>
                <div className="mt-[0.5px]">
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
            </div>
            <h2 className="text-lg">
              {itemData[item]["nutrients"]["Calories"].slice(0, -4) * amount}
            </h2>
            <h2 className="text-lg">
              {itemData[item]["nutrients"]["Protein"].slice(0, -1) * amount}
            </h2>
          </div>
        ))}
      </div>

      <hr className="border-black w-[90%] my-6" />
    </>
  );
};

Table.propTypes = {
  items: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default Table;
