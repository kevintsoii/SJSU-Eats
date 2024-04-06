import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectSize } from "../../features/itemsSlice";

const NavbarItem = ({ to, text, classes }) => {
  const itemsSize = useSelector(selectSize);

  return (
    <div className="relative">
      <Link
        to={to}
        className={`text-xl flex py-1 px-3 md:hover:bg-gold w-full ${classes}`}
      >
        {text}
      </Link>
      {to === "/tracker" && itemsSize > 0 && (
        <h2
          className={`hidden absolute sm:flex top-0 right-[-12px] ${
            itemsSize > 9 ? "-mr-1" : ""
          } rounded-full bg-blue/40 px-1.5`}
        >
          {itemsSize}
        </h2>
      )}
    </div>
  );
};

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default NavbarItem;
