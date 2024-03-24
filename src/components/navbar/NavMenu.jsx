import PropTypes from "prop-types";
import NavbarItem from "./NavbarItem";

const Menu = ({ pages }) => {
  return (
    <>
      <ul className="fixed bg-background border-b border-black w-full mt-20 fade-down-fast ">
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
};

export default Menu;
