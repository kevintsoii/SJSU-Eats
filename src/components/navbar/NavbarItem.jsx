import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const NavbarItem = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="text-xl flex py-1 px-3 rounded-full md:hover:bg-gold w-full"
    >
      {text}
    </Link>
  );
};

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavbarItem;
