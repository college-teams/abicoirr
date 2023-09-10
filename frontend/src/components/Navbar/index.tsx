import {
  Icons,
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

const Navbar = () => {
  const { pathname }: Location = useLocation();

  const [active, setActive] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoggedIn] = useState(true);

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 100 || pathname !== "/") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);

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

  const handleDropdown = (e: React.MouseEvent) => {
    if (isLoggedIn) {
      setShowDropDown((pre) => !pre);
    } else {
      setShowAuth(true);
    }
    e.stopPropagation();
  };

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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
          </NavLinks>
          <Icons>
            <Link to="/search">
              <Icon icon="fluent:search-32-regular" />
            </Link>
            <Icon className="auth" icon="ph:user" onClick={handleDropdown} />
            {showDropDown && (
              <div className="dropdown absolute  w-[200px] top-[5rem] bg-white shadow-xl border">
                <ul className="relative text-[1.5rem] w-full">
                  <Link to={"/admin"}>
                    <li className="relative text-center w-full py-5 hover:bg-slate-300 border-b text-black font-medium">
                      Admin
                    </li>
                  </Link>
                  <li className="relative text-center w-full py-5 hover:bg-slate-300 text-black  font-medium">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </Icons>
        </NavLinksWrapper>
      </NavbarContainer>
      <Auth open={showAuth} close={() => setShowAuth(false)} />
    </>
  );
};

export default Navbar;
