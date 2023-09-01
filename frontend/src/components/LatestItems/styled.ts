import styled from "styled-components";

export const LatestProductsContainer = styled.div`
  position: relative;
  width: 75%;
  margin: 0 auto;
  padding: 1rem 2rem 5rem 2rem;
  height: auto;
`;

export const Header = styled.p`
  position: relative;
  text-align: center;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 3.5rem;
`;

export const CurveLine = styled.div`
  width: 300px;
  height: 10px;
  border: solid 5px #000;
  border-color: transparent transparent #000 transparent;
  border-radius: 0 0 240px 50%/60px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    width: 250px;
  }

  @media screen and (max-width: 768px) {
    width: 220px;
  }

  @media screen and (max-width: 500px) {
    width: 200px;
  }
`;

export const Description = styled.p`
  position: relative;
  text-align: center;
  margin-top: 2rem;
  font-size: 2rem;
`;

export const ViewButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--black-color);
  padding: 0.75rem 2rem;
  text-align: center;
  margin: 2rem auto;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
`;
