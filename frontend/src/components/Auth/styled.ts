import styled, { keyframes } from "styled-components";
import { Icon } from "@iconify/react";

const OpacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const AuthWrapper = styled.div`
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

export const AuthCard = styled.div`
  position: relative;
  background: var(--white-color);
  width: 55%;
  min-height: 70%;
  /* border-radius: 6px; */
  display: flex;
  opacity: 0;

  animation: ${OpacityAnimation} 0.5s ease-in-out forwards;

  & > * {
    height: inherit;
    align-self: stretch;
  }

  @media (max-width: 768px) {
    width: 70%;
    min-height: 60%;
  }

  @media (max-width: 500px) {
    width: 75%;
    min-height: 50%;
  }
`;

export const InputBox = styled.div`
  position: relative;

  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 14px;
    color: gray;
    pointer-events: none;
    font-weight: 400;
    transition: 0.5s;
  }

  input {
    width: 100%;
    background: transparent;
    outline: none;
    border: 0;
    color: #000;
    border-bottom: 1px solid gray;
    padding: 6px 0;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  input:focus {
    border-bottom: 1px solid black;
  }

  input:focus ~ label,
  input:valid ~ label {
    top: -20px;
    font-size: 12px;
  }

  @media (max-width: 500px) {
    label {
      font-size: 11px;
    }

    input {
      font-size: 12px ;
    }

    input:focus ~ label,
    input:valid ~ label {
      font-size: 10px !important;
    }
  }
`;

export const CloseIcon = styled(Icon)`
  position: absolute;
  right: -4rem;
  top: 0;
  font-size: 3.5rem;
  cursor: pointer;
  color: #fff;
`;
