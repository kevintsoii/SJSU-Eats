import PropTypes from "prop-types";
import NavbarItem from "./NavbarItem";

const Navbar = ({ screenWidth, pages, onToggle }) => {
  return (
    <nav className="flex">
      {screenWidth >= 640 ? (
        <ul className="flex items-center justify-between font-medium">
          {Object.keys(pages).map((key) => (
            <li key={key}>
              <NavbarItem to={pages[key].path} text={pages[key].name} />
            </li>
          ))}
        </ul>
      ) : (
        <button onClick={onToggle} className="">
          <img src="/menu.svg" className="w-8"></img>
        </button>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  screenWidth: PropTypes.number,
  pages: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  }),
  onToggle: PropTypes.func,
};

export default Navbar;
