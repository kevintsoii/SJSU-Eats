import moment from "moment";
import { useQuery } from "react-query";
import { useState, useContext, useEffect } from "react";

import { ItemContext } from "../contexts/ItemContext";

import Header from "../components/Header";
import MealButton from "../components/menus/MealButton";
import Menus from "../components/menus/Menus";
import Error from "../components/status/Error";
import Loading from "../components/status/Loading";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

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

  const [warning, setWarning] = useState(false);

  const fetchData = async (date) => {
    const response = await fetch(`http://localhost:5000/api/menus/${date}`);
    const data = await response.json();
    if ("new" in data) {
      await fetchItemData();
    }
    if ("error" in data) {
      throw data.error;
    }
    return data;
  };

  const { isLoading, error, data } = useQuery(
    ["menus", date.format("YYYY-MM-DD")],
    () => fetchData(date.format("YYYY-MM-DD")),
    {
      staleTime: Infinity,
      retry: (failureCount, error) =>
        error.includes("No menus found") ? false : failureCount < 1,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const warningDismissed = localStorage.getItem("warningDismissed");
    if (!warningDismissed) {
      setWarning(true);
    }
  }, []);

  const handleDateChange = (days) => {
    setDate((date) => date.clone().add(days, "days"));
  };

  const handleMealChange = (e) => {
    setMeal(e.target.textContent);
  };

  const handleWarningDismiss = () => {
    localStorage.setItem("warningDismissed", true);
    setWarning(null);
    setTimeout(() => {
      setWarning(false);
    }, 1000);
  };

  return (
    <>
      <Header />

      <span className="block mt-20"></span>

      {warning !== false && (
        <div
          className="flex text-center justify-center pt-8 items-center"
          style={{
            opacity: warning == null ? "0" : "1",
            transition: warning == null ? "opacity 1s ease-out" : "",
          }}
        >
          <div className="flex bg-gold/30 rounded-lg border border-gold border-[1.75px] max-w-[80%] px-5 py-3 items-center justify-center">
            <h1 className="pr-[3px]">
              Images are from the Google Search API and are not fully accurate
            </h1>
            <CloseIcon
              fontSize="medium"
              className="pt-[1.5px] text-gray-500 hover:text-red-700 hover:cursor-pointer"
              onClick={handleWarningDismiss}
            />
          </div>
        </div>
      )}

      <div className="flex text-center justify-center items-center pt-8">
        <ArrowBackIcon
          fontSize="large"
          className="cursor-pointer"
          onClick={() => handleDateChange(-1)}
        />
        <h1 className="text-2xl sm:text-3xl px-5 sm:min-w-[33%] xl:min-w-[20%]">
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

      <main className="flex justify-center pt-4 pb-[6vh]">
        {error ? (
          <Error message={error} />
        ) : isLoading || Object.keys(itemData).length == 0 ? (
          <Loading />
        ) : (
          <Menus menuData={data[meal.toLowerCase()]} />
        )}
      </main>
    </>
  );
};

export default Menu;
