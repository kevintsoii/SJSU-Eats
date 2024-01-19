import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const NavbarItem = ({ to, text, classes }) => {
  return (
    <li className={`text-xl py-1 px-3 h-50 ${classes}`}>
      <Link to={to}>{text}</Link>
    </li>
  );
};

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default NavbarItem;
