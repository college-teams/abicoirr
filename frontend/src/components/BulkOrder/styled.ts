import { Icon } from "@iconify/react/dist/iconify.js";
import styled, { keyframes } from "styled-components";

export const BulkOrderWrapper = styled.div`
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

const OpacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const BulkOrderContainer = styled.div`
  position: relative;
  background: #fff;
  width: 55%;
  min-height: 20%;
  padding: 6rem 4rem 4rem 4rem;
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

  @media (max-width: 500px) {
    width: 95%;
  }
`;

export const CloseIcon = styled(Icon)`
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 3.5rem;
  cursor: pointer;
`;