import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  height: 250px;
  width: 250px;
  cursor: pointer;

  @media screen and (max-width: 1300px) {
    width: 240px;
  }

  @media screen and (max-width: 1200px) {
    width: 200px;
    height: 250px;
  }

  @media screen and (max-width: 450px) {
    width: 100%;
    height: 180px;
  }
`;

export const CardImageContainer = styled.div`
  position: relative;
  height: 150px;
  height: 60%;
  width: 100%;

  img {
    position: relative;
    height: 100%;
    width: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    object-fit: cover;
  }

  @media screen and (max-width: 450px) {
    /* height: 120px; */
  }
`;

export const CardDetailsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 2px dotted #cbc911;
  border-left: 2px dotted #cbc911;
`;

export const CardName = styled.p`
  position: relative;
  font-weight: 600;
  color: var(--light-green);
  font-size: 2rem;
  text-transform: capitalize;
  margin-top: 1.4rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

export const CardPrice = styled.p`
  position: relative;
  position: relative;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #a15125;
  padding: 0 1rem;
`;

export const CardButton = styled.button`
  position: relative;
  background-color: #cbc911;
  color: #0c0b0b;
  font-size: 1.4rem;
  font-weight: 400;
  padding: 1rem;
`;
