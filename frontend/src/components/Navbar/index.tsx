import {
  Backdrop,
  Icons,
  MenuBarLayout,
  MobileDeviceNavContainer,
  NavLinks,
  NavLinksWrapper,
  NavLogoWrapper,
  NavbarContainer,
} from "./styled";
import logoSvg from "../../assets/logo.svg";
import { useEffect, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import Auth from "../Auth";
import { useAppDispatch } from "../../store/configureStore";
import { setAdminStatus } from "../../store/slices/user";

const Navbar = () => {
  const { pathname }: Location = useLocation();

  const [active, setActive] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [menubarOpen, setMenubarOpen] = useState(false);

  const [isLoggedIn] = useState(true);
  const dispatch = useAppDispatch();

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 100 || pathname !== "/") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);

  const handleDropdown = (e: React.MouseEvent) => {
    if (isLoggedIn) {
      setShowDropDown((pre) => !pre);
    } else {
      setShowAuth(true);
    }
    e.stopPropagation();
  };

  const closeMenu = () => {
    setMenubarOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth > 500) {
      setMenubarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", () => {
      if (showDropDown) {
        setShowDropDown(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
  }, [pathname, handleScroll]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showDropDown) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropDown]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NavbarContainer active={active}>
        <NavLinksWrapper>
          <Link to="/">
            <NavLogoWrapper>
              <img src={logoSvg} alt="logo" />
            </NavLogoWrapper>
          </Link>
          <NavLinks>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/products">
              <li>Products</li>
            </Link>
            <Link to="/contact">
              <li>Contact us</li>
            </Link>
          </NavLinks>
          <Icons>
            <Icon className="auth" icon="ph:user" onClick={handleDropdown} />
            {showDropDown && (
              <div className="dropdown absolute right-0  w-[180px] top-[4rem] bg-white shadow-xl border rounded-lg">
                <ul className="relative text-[1.5rem] w-full">
                  <Link to={"/admin"}>
                    <li
                      onClick={() => dispatch(setAdminStatus())}
                      className="relative text-center w-full py-5 hover:bg-slate-300 border-b-2 text-black"
                      style={{ fontWeight: 600 }}
                    >
                      Admin
                    </li>
                  </Link>
                  <li
                    className="relative text-center w-full py-5 hover:bg-slate-300 text-black"
                    style={{ fontWeight: 600 }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </Icons>
        </NavLinksWrapper>

        {/* Mobile device navbar */}

        <MobileDeviceNavContainer className="relative flex items-center justify-between w-full px-[5rem]">
          <Icon
            onClick={() => {
              setMenubarOpen(true);
            }}
            icon="material-symbols:menu"
            className="relative h-[30px] w-[30px] cursor-pointer"
          />

          <Link to="/">
            <NavLogoWrapper>
              <img src={logoSvg} alt="logo" />
            </NavLogoWrapper>
          </Link>

          <Icons>
            <Icon
              className="relative h-[25px] w-[25px]"
              icon="ph:user"
              onClick={handleDropdown}
            />
            {showDropDown && (
              <div className="dropdown absolute right-0  w-[180px] top-[5rem] bg-white shadow-xl border rounded-lg">
                <ul className="relative text-[1.5rem] w-full">
                  <Link to={"/admin"}>
                    <li
                      onClick={() => dispatch(setAdminStatus())}
                      className="relative text-center w-full py-5 hover:bg-slate-300 border-b-2 text-black"
                      style={{ fontWeight: 600 }}
                    >
                      Admin
                    </li>
                  </Link>
                  <li
                    className="relative text-center w-full py-5 hover:bg-slate-300 text-black"
                    style={{ fontWeight: 600 }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </Icons>
        </MobileDeviceNavContainer>
      </NavbarContainer>
      <Auth open={showAuth} close={() => setShowAuth(false)} />

      {/* Menubar design layout */}

      <Backdrop className={` ${menubarOpen ? "block" : "hidden"} `} />

      <MenuBarLayout
        isOpen={menubarOpen}
        className="fixed h-[45vh] left-0 top-0 w-screen bg-white z-[100] overflow-hidden flex flex-col py-5"
      >
        <div className="relative ml-5  mb-10">
          <Icon
            onClick={closeMenu}
            icon="ic:round-close"
            className="relative h-[7rem] w-[7rem] cursor-pointer"
          />
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <ul className="relative flex flex-col gap-[2rem] items-center w-full">
            <Link
              to="/"
              onClick={closeMenu}
              className="relative text-[3rem] hover:bg-slate-400 w-[80%] hover:font-medium  text-center py-8 rounded cursor-pointer"
            >
              <li>Home</li>
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="relative text-[3rem]  hover:bg-slate-400 hover:font-medium w-[80%] text-center py-8 rounded cursor-pointer"
            >
              <li>Products</li>
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="relative text-[3rem] hover:font-medium   hover:bg-slate-400 w-[80%] text-center py-8 rounded cursor-pointer"
            >
              <li>Contact us</li>
            </Link>
          </ul>
        </div>

        <div className="relative mt-auto mb-16 text-center">
          <button
            onClick={closeMenu}
            className="relative bg-[#008000] text-white w-[50%] py-8 text-[2.2rem] rounded-md cursor-pointer hover:bg-[#008000c9]"
          >
            Login / Signup
          </button>
        </div>
      </MenuBarLayout>
    </>
  );
};

export default Navbar;
