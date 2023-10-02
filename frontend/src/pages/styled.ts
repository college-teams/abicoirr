import styled from "styled-components";
import Bottom from "../assets/bottomBox.webp";
import Left from "../assets/leftBox.webp";
import Top from "../assets/topBox.webp";
import Right from "../assets/rightBox.webp";

export const InfoStepsContainer = styled.div`
  background: #f6f3d1;
  width: 75%;
  margin: 6rem auto;

  .top,
  .bottom,
  .left,
  .right {
    position: absolute;
    background-position: 572px center;
  }

  .top {
    left: 0;
    top: 0;
    background-position: 572px center;
    height: 40px;
    width: 100%;
    background: url(${Top});
    transform: rotate(180deg);
  }

  .right {
    right: 0px;
    top: 0px;
    background-position: center 1060px;
    width: 40px;
    background-size: 40px;
    height: 100%;
    background: url(${Right});
    transform: rotate(180deg);
  }

  .bottom {
    left: 0;
    bottom: 0px;
    width: 100%;
    background-position: 572px center;
    height: 40px;
    background-size: auto 40px;
    background: url(${Bottom});
  }

  .left {
    left: 0;
    top: 0px;
    width: 40px;
    height: 100%;
    background: url(${Left});
    background-size: 40px;
    background-position: center 1060px;
    background-repeat: repeat-y;
  }

  @media screen and (max-width: 1024px) {
    width: 90%;
  }

  @media screen and (max-width: 768px) {
    .top,
    .right,
    .bottom,
    .left {
      display: none;
    }

    margin: 6rem auto;
  }
`;

export const ProductContainer = styled.div`
  position: relative;
`;

export const CategoryListContainer = styled.div`
  position: relative;
  max-height: 500px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* For Webkit (Chrome, Safari, Edge) */
  }
`;

export const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  column-gap: 4rem;
  row-gap: 7rem;

  @media screen and (max-width: 1130px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  @media screen and (max-width: 450px) {
    margin: 0 auto;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

export const CategoryContainer = styled.div``;

export const SubImagesContainer = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px rgb(94, 94, 94);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--light-green);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #086108;
  }
`;
