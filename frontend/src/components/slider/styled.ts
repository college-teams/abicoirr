import styled, { keyframes } from "styled-components";
import { SwiperSlide, Swiper } from "swiper/react";

const imageScale = keyframes`
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
`;

export const SwiperSlider = styled(SwiperSlide)`
  position: relative;
  display: flex;
  width: 100%;
  height: 85vh;
  align-items: center;
  justify-content: center;
  background-color: #000000;

  img {
    position: relative;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    object-fit: cover;
  }
`;

export const SwipperWrapper = styled(Swiper)`
  .swiper-pagination-bullet {
    background-color: #fff;
  }

  .swiper-slide-active {
    animation: ${imageScale} 1s linear;
  }
`;
