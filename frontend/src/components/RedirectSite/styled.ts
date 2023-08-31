import { Icon } from "@iconify/react";
import styled, { keyframes } from "styled-components";

const OpacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const RedirectCardWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RedirectCard = styled.div`
  position: relative;
  background: #7e7e7e;
  width: 55%;
  min-height: 20%;
  padding: 7rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;

  animation: ${OpacityAnimation} 0.5s ease-in-out forwards;

  @media (max-width: 1280px) {
    width: 60%;
  }

  @media (max-width: 1024px) {
    width: 80%;
  }
`;

export const RedirectLink = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto;
  background: #fff;
  padding: 0.5rem;
  height: 65px;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  img {
    position: relative;
    height: 100%;

    @media (max-width: 768px) {
      height: 90%;
    }

    @media (max-width: 500px) {
      height: 80%;
    }
  }
`;

export const CloseIcon = styled(Icon)`
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 3.5rem;
  cursor: pointer;
`;
