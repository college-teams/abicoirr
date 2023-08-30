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
`;

export const ProductContainer = styled.div`
  position: relative;
`;

export const SearchBoxWrapper = styled.div`
  background: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
  /* background: radial-gradient(circle at 10% 20%, rgb(0, 93, 133) 0%, rgb(0, 181, 149) 90%); */
  /* background: linear-gradient(107deg, rgb(13, 198, 180) 8.1%, rgb(33, 198, 138) 79.5%); */
  border: 1px solid #777;
  opacity: 0.9;
`;
