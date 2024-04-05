import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const NavbarItem = ({ to, text, classes }) => {
  return (
    <Link
      to={to}
      className={`text-xl flex py-1 px-3 md:hover:bg-gold w-full ${classes}`}
    >
      {text}
    </Link>
  );
};

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default NavbarItem;
