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

const Navbar = () => {
  const { pathname }: Location = useLocation();
  const [active, setActive] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 100 || pathname !== "/") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
  }, [pathname, handleScroll]);

  return (
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
          <Icon icon="fluent:search-32-regular" />
          <Icon icon="ion:bag-outline" />
          <Icon icon="fluent:location-28-regular" />
        </Icons>
      </NavLinksWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
