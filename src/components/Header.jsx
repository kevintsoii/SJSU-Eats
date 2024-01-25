import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Menu from "./navbar/NavMenu";
import { useEffect, useState } from "react";

const pages = [
  {
    name: "Menu",
    path: "/menu",
  },
  {
    name: "Calorie Tracker",
    path: "/tracker",
  },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="fixed left-0 right-0 flex items-center justify-between shadow-lg h-20 border-b border-black backdrop-blur-md px-5 md:px-20">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-14 h-14" />
          <h1 className="text-4xl font-semibold">
            <span className="text-blue">SJSU</span>Eats
          </h1>
        </Link>
        <Navbar
          screenWidth={screenWidth}
          pages={{ ...pages }}
          onToggle={toggleMenu}
        />
      </header>
      {screenWidth < 640 && showMenu && <Menu pages={{ ...pages }} />}
    </>
  );
};

export default Header;
