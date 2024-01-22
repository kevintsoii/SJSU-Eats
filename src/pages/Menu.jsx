import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";

import Header from "../components/Header";
import MealButton from "../components/menus/MealButton";
import Menus from "../components/menus/Menus";
import Error from "../components/status/Error";
import Loading from "../components/status/Loading";

const convrtDateToMeal = (date) => {
  const hour = date.hour();

  if (hour > 15) return "Dinner";
  else if (hour > 10) return "Lunch";
  else return "Breakfast";
};

const fetchData = async (date) => {
  const response = await fetch(`http://localhost:5000/api/menus/${date}`);
  const data = await response.json();
  return data;
};

const Menu = () => {
  const [date, setDate] = useState(moment());
  const [meal, setMeal] = useState(convrtDateToMeal(date));

  const { isLoading, error, data } = useQuery(
    ["menus", date.format("YYYY-MM-DD")],
    () => fetchData(date.format("YYYY-MM-DD")),
    {
      staleTime: Infinity,
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  const handleMealChange = (e) => {
    setMeal(e.target.textContent);
  };

  return (
    <>
      <Header />

      <div className="mt-20 text-center">
        <h1 className="text-lg sm:text-3xl pt-10">
          {date.format("dddd, MMMM DD")}
        </h1>
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

      <div className="flex justify-center pt-8">
        {error ? <Error /> : isLoading ? <Loading /> : <Menus />}
      </div>
    </>
  );
};

export default Menu;
