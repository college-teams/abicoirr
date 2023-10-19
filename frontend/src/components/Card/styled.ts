import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 350px;
  width: 250px;
  cursor: pointer;
  border: 2px solid #cbc911;

  @media screen and (max-width: 1300px) {
    width: 240px;
  }

  @media screen and (max-width: 1200px) {
    width: 200px;
    height: 325px;
  }

  @media screen and (max-width: 1000px) {
    height: 250px;
  }

  @media screen and (max-width: 500px) {
    width: 160px;
    height: 200px;
  }

  @media screen and (max-width: 390px) {
    width: 135px;
    height: 180px;
  }

  @media screen and (max-width: 330px) {
    width: 60%;
  }
`;

export const CardImageContainer = styled.div`
  position: relative;
  /* height: 200px; */
  height: 60%;
  width: 100%;
  border-bottom: 2px solid #cbc911;


  img {
    position: relative;
    height: 100%;
    width: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    object-fit: cover;
  }

  @media screen and (max-width: 390px) {
    height: 55%;
  }
`;

export const CardDetailsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border-right: 2px dotted #cbc911;
  border-left: 2px dotted #cbc911; */
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
  word-wrap: break-word;
`;

export const CardButton = styled.button`
  position: relative;
  background-color: #cbc911;
  color: #0c0b0b;
  font-size: 1.4rem;
  font-weight: 400;
  padding: 1rem;

  &:disabled {
    background-color: rgba(203,201,17,0.5);
    pointer-events: none;
    cursor: not-allowed;
  }
`;
