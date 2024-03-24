import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const NavbarItem = ({ to, text }) => {
  return (
    <li className="text-xl h-50 my-1">
      <Link to={to} className="py-1 px-3 rounded-full md:hover:bg-gold">
        {text}
      </Link>
    </li>
  );
};

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavbarItem;
