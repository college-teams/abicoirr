import styled from "styled-components";

export const LocateButton = styled.a`
  position: absolute;
  left: 45%;
  bottom: 10%;
  background: var(--light-red-color);
  font-size: 1.6rem;
  padding: 1rem 2rem;
  font-weight: 500;
  color: var(--white-color);
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
    border-radius: 2px;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
`;
