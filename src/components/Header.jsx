import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Menu from "./navbar/MobileMenu";
import { useEffect, useState } from "react";

const pages = [
  {
    name: "Menu",
    path: "/menu",
  },
  {
    name: "Search",
    path: "/search",
  },
  {
    name: "Location",
    path: "/location",
  },
  {
    name: "Calorie Tracker",
    path: "/tracker",
  },
];

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleScroll = () => {
    if (window.scrollY < scrollY || window.scrollY < 100) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  if (screenWidth >= 640 || showNavbar || showMenu) {
    return (
      <>
        <header className="z-10 fixed left-0 right-0 flex items-center justify-between shadow-lg h-20 border-b border-black backdrop-blur-xl px-5 md:px-20 fade-down-fast">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="logo" className="w-12 h-12" />
            <h1 className="text-2xl md:text-3xl font-semibold ml-1">
              <span className="text-blue">SJSU</span>Eats
            </h1>
          </Link>
          <Navbar
            screenWidth={screenWidth}
            pages={{ ...pages }}
            onToggle={toggleMenu}
          />
        </header>
        {screenWidth < 640 && showMenu && (
          <Menu pages={{ ...pages }} onToggle={toggleMenu} />
        )}
      </>
    );
  }
};

export default Header;
