import PropTypes from "prop-types";

import Item from "./Item.jsx";

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
  if (Object.values(menuData).every((arr) => arr.length === 0))
    return (
      <div className="flex flex-col items-center justify-items-center border border-black rounded-lg w-[60%] lg:w-[30%] py-5 fade-down">
        <img src="./closed.png" className="w-40" />
        <h3 className="text-2xl py-3 text-center">
          The Dining Commons is closed.
        </h3>
      </div>
    );

  console.log(menuData);
  menuData = formatData(menuData);

  return (
    <div className="flex flex-col w-[90%]">
      {Object.entries(menuData).map(([location, items], index) => {
        if (items.length > 0)
          return (
            <div key={index} className="flex flex-col pb-8">
              <h1 className="text-4xl underline decoration-blue decoration-solid underline-offset-8 pb-4">
                {location}
              </h1>
              <ul>
                {items.map((item, index) => (
                  <Item key={index} location={location} item={item} />
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
