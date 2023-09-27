import styled from "styled-components";
import { Icon } from "@iconify/react";

export const ChatBotContainer = styled.div`
  bottom: 15px;
  right: 10px;
`;

export const WhatsAppIcon = styled(Icon)`
  height: 5.5rem;
  width: 5.5rem;
  &:hover {
    transform: scale(1.2);
    transition: all 0.5s;
  }

  @media screen and (max-width: 1024) {
    height: 6rem;
    width: 6rem;
  }

  @media screen and (max-width: 992px) {
    height: 8rem;
    width: 8rem;
  }
`;
