import PropTypes from "prop-types";
import NavbarItem from "./NavbarItem";

const Menu = ({ pages, onToggle }) => {
  return (
    <>
      <ul
        className="fixed bg-background border-b border-black z-10 w-full mt-20 h-full"
        onClick={onToggle}
      >
        {Object.keys(pages).map((key) => (
          <NavbarItem
            key={key}
            to={pages[key].path}
            text={pages[key].name}
            classes="border-b border-black/25 text-center"
          />
        ))}
      </ul>
    </>
  );
};

Menu.propTypes = {
  pages: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  }),
  onToggle: PropTypes.func,
};

export default Menu;
