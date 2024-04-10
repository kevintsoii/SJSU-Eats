import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemContext } from "../../contexts/ItemContext";
import { add, remove, selectItems } from "../../features/itemsSlice";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { itemData } = useContext(ItemContext);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  if (screenWidth >= 640)
    return (
      <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-x-2 gap-y-4 w-[90%] lg:w-[80%] xl:w-[70%]">
        <div className="grid grid-cols-subgrid col-span-4 justify-items-start">
          <h2></h2>
          <h2 className="text-xl lg:text-2xl font-medium">Item</h2>
          <h2 className="text-xl lg:text-2xl font-medium">Calories</h2>
          <h2 className="text-xl lg:text-2xl font-medium">Protein</h2>
        </div>

        {Object.entries(items).map(([item, amount]) => (
          <div
            key={item}
            className="grid grid-cols-subgrid col-span-4 justify-items-start text-left"
          >
            <img
              src={
                itemData[item]["image"]
                  ? "/images/" + itemData[item]["image"]
                  : "/images/no-image.svg"
              }
              loading="lazy"
              className="fade-in w-[80%] max-h-16 rounded rounded-md object-cover object-center"
            ></img>
            <div className="flex flex-col">
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
    );

  return (
    <div className="flex flex-col w-[80%]">
      {Object.entries(items).map(([item, amount]) => (
        <>
          <div className="flex justify-between mt-4">
            <h3 className="text-xl overflow-hidden whitespace-nowrap text-ellipsis">
              {item}
            </h3>
            <h3 className="text-lg">{amount}x</h3>
          </div>
          <div className="flex justify-between">
            <h3 className="text-lg text-slate-800">
              {itemData[item]["nutrients"]["Calories"].slice(0, -4) * amount}{" "}
              kcal,{" "}
              {itemData[item]["nutrients"]["Protein"].slice(0, -1) * amount} g
            </h3>
            <div>
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
        </>
      ))}
    </div>
  );
};

export default Cart;
