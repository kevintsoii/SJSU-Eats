import PropTypes from "prop-types";

import ItemCard from "./ItemCard";
import SimpleItemCard from "./SimpleItemCard";

const formatData = (menuData) => {
  let newData = {};

  for (const key of Object.keys(menuData)) {
    if (!["Nook", "Salad Bar"].includes(key)) {
      newData[key] = menuData[key];
    }
  }

  ["Nook", "Salad Bar"].map((key) => {
    if (key in menuData) {
      newData[key] = menuData[key];
    }
  });

  return newData;
};

const Menus = ({ menuData }) => {
  if ("closed" in menuData)
    return (
      <div className="flex flex-col items-center justify-items-center border border-black rounded-lg w-[60%] lg:w-[30%] py-5 fade-down mt-3">
        <img src="./closed.png" className="w-40" />
        <h3 className="text-2xl py-3 text-center">
          The Dining Commons is closed.
        </h3>
      </div>
    );

  menuData = formatData(menuData);

  return (
    <div className="flex flex-col w-[90%]">
      {Object.entries(menuData).map(([location, locationData], index) => {
        const items = locationData.items;
        if (items && items.length > 0)
          return (
            <div key={index} className="flex flex-col pb-6">
              <h1 className="text-4xl underline decoration-blue decoration-solid underline-offset-8 mb-5 leading-snug">
                {location}
              </h1>
              <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {items.map((item, index) => (
                  <li key={index} className="overflow-hidden">
                    {["Nook", "Salad Bar"].includes(location) ? (
                      <SimpleItemCard item={item} />
                    ) : (
                      <ItemCard item={item} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
      })}
    </div>
  );
};

Menus.propTypes = {
  menuData: PropTypes.object,
};

export default Menus;
