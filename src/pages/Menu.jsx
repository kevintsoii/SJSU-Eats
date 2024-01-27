import moment from "moment";
import { useState, useContext } from "react";
import { useQuery } from "react-query";

import { ItemContext } from "../contexts/ItemContext";

import Header from "../components/Header";
import MealButton from "../components/menus/MealButton";
import Menus from "../components/menus/Menus";
import Error from "../components/status/Error";
import Loading from "../components/status/Loading";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const convrtDateToMeal = (date) => {
  const hour = date.hour();

  if (hour > 15) return "Dinner";
  else if (hour > 10) return "Lunch";
  else return "Breakfast";
};

const Menu = () => {
  const { itemData, fetchItemData } = useContext(ItemContext);
  const [date, setDate] = useState(moment());
  const [meal, setMeal] = useState(convrtDateToMeal(date));

  const fetchData = async (date) => {
    const response = await fetch(`http://localhost:5000/api/menus/${date}`);
    const data = await response.json();
    if ("new" in data) {
      await fetchItemData();
    }
    return data;
  };

  const { isLoading, error, data } = useQuery(
    ["menus", date.format("YYYY-MM-DD")],
    () => fetchData(date.format("YYYY-MM-DD")),
    {
      staleTime: Infinity,
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const handleDateChange = (days) => {
    setDate((date) => date.clone().add(days, "days"));
  };

  const handleMealChange = (e) => {
    setMeal(e.target.textContent);
  };

  return (
    <>
      <Header />

      <div className="flex mt-20 text-center justify-center items-center pt-10">
        <ArrowBackIcon
          fontSize="large"
          className="text-lg cursor-pointer"
          onClick={() => handleDateChange(-1)}
        />
        <h1 className="text-2xl sm:text-3xl px-2 sm:px-5">
          {date.format("dddd, MMMM DD")}
        </h1>
        <ArrowForwardIcon
          fontSize="large"
          className="cursor-pointer"
          onClick={() => handleDateChange(1)}
        />
      </div>

      <div className="meal-selector flex justify-center mt-4">
        <div className="flex justify-between rounded sm:border sm:border-black sm:text-lg min-w-72 overflow-hidden">
          {["Breakfast", "Lunch", "Dinner"].map((m) => (
            <MealButton
              key={m}
              onClick={handleMealChange}
              text={m}
              active={meal === m}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8 pb-[6vh]">
        {error ? (
          <Error />
        ) : isLoading || Object.keys(itemData).length == 0 ? (
          <Loading />
        ) : (
          <Menus menuData={data[meal.toLowerCase()]} />
        )}
      </div>
    </>
  );
};

export default Menu;
