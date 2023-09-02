import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  /* height: 400px; */
  height: auto;
  width: 250px;
  cursor: pointer;
`;

export const CardImageContainer = styled.div`
  position: relative;
  /* height: 65%; */
  height: 250px;
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

  @media screen and (max-width: 1280px) {
    height: 220px;
  }

  @media screen and (max-width: 768px) {
    height: 200px;
  }
`;

export const CardDetailsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  border: 2px dashed #cbc911;
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
