import styled from "styled-components";

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
  color: ${({ active }) => (active ? "#000" : "#fff")};
  transition: background-color ease-in-out 0.3s;

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
`;

export const NavLinks = styled.ul<{ active: boolean }>`
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
`;