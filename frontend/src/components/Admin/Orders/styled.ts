import { Icon } from "@iconify/react/dist/iconify.js";
import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: 0%;
  top: 10%;
  z-index: 1000;
  width: 100%;
  display: flex;
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

export const AdminContainer = styled.div`
  position: relative;
  background: var(--white-color);
  width: 50%;
  height: auto;
  max-height: 550px;
  overflow-y: overlay;
  overflow-x: hidden;
  border-radius: 4px;
  opacity: 0;
  animation: ${OpacityAnimation} 0.5s ease-in-out forwards;

  & > * {
    height: inherit;
    align-self: stretch;
  }
`;

export const CloseIcon = styled(Icon)`
  position: absolute;
  right: -4rem;
  top: 0;
  font-size: 3.5rem;
  cursor: pointer;
  color: #f2f2f2;
  z-index: 1000;
`;
