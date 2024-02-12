import Header from "../components/Header";

import { add, remove, removeAll, selectItems } from "../features/itemsSlice";
import { useDispatch, useSelector } from "react-redux";

const Tracker = () => {
  const items = useSelector(selectItems);

  console.log(items);

  return (
    <>
      <Header />

      <span className="block mt-20"></span>

      <div>
        <h1 className="text-5xl">Track your Nutrients!</h1>
      </div>
    </>
  );
};

export default Tracker;
