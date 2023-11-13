import styled, { keyframes } from "styled-components";

export const NavbarContainer = styled.div<{ active: boolean }>`
  position: fixed;
  width: 100%;
  background-color: ${({ active }) => (active ? "#fff" : "transparent")};
  height: 8rem;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  color: ${({ active }) => (active ? "#000" : "#555")};
  transition: background-color ease-in-out 0.3s;
  box-shadow: ${({ active }) => (active ? "0 1rem 2rem rgba(0,0,0,0.2)" : "0")};

  ul {
    li {
      font-weight: ${({ active }) => (active ? 500 : 400)};
    }
  }
`;

export const NavLinksWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  width: 85%;
  margin: 0 auto;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const NavLinks = styled.ul`
  position: relative;
  display: flex;
  gap: 3rem;
  transition: all 0.5s;

  li {
    cursor: pointer;
    font-size: 2rem;
    font-weight: 400;
    border-bottom: 2px solid transparent;

    &:hover {
      color: var(--light-green);
      border-color: var(--light-green);
    }
  }
`;

export const NavLogoWrapper = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: -3rem;

  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: transparent;
    fill: #fff;
    margin-top: 1rem;
    cursor: pointer;
  }
`;

export const Icons = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-size: 3rem;

  & > * {
    cursor: pointer;
  }

  .dropdown {
    &:before {
      content: " ";
      top: -23px;
      display: block;
      height: 20px;
      right: 0px;
      position: absolute;
      border-color: transparent transparent #fff transparent;
      border-style: solid;
      border-width: 12px;
    }
  }
`;

const scrollDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const scrollUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

export const MobileDeviceNavContainer = styled.div`
  display: none;
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

export const MenuBarLayout = styled.div<{ isOpen: boolean }>`
  z-index: 10000;
  display: none;

  animation: ${({ isOpen }) => (isOpen ? scrollDown : scrollUp)} 0.4s
    ease-in-out forwards;

  @media screen and (max-width: 500px) {
    display: flex;
    transform: translateY(-100%);
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;
