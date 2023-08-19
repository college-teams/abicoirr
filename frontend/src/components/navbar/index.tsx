import {
  Icons,
  NavLinks,
  NavLinksWrapper,
  NavLogoWrapper,
  NavbarContainer,
} from "./styled";
import logoSvg from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 100) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavbarContainer active={active}>
      <NavLinksWrapper>
        <NavLogoWrapper>
          <img src={logoSvg} alt="logo" />
        </NavLogoWrapper>
        <NavLinks>
          <li>Home</li>
          <li>Products</li>
          <li>Contact us</li>
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
