import { Link } from "react-router-dom";
import NavbarItem from "./navbar/NavbarItem";

const Header = () => {
  return (
    <header className="fixed left-0 right-0 flex items-center justify-between md:px-20 h-20 border-b border-black backdrop-blur-md">
      <Link to="/" className="flex items-center">
        <img src="/logo.png" alt="logo" className="w-14 h-14" />
        <h1 className="text-4xl font-semibold">
          <span className="text-blue">SJSU</span>Eats
        </h1>
      </Link>
      <nav>
        <ul className="flex items-center font-medium">
          <NavbarItem to="/menu" text="Menu" />
          <NavbarItem to="/tracker" text="Calorie Tracker" />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
