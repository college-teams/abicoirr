import styled from "styled-components";
import { Icon } from "@iconify/react";

export const ChatBotContainer = styled.div`
  @media screen and (max-width: 992px) {
    left: 92%;
  }
  @media screen and (max-width: 50px) {
    left: 90%;
  }
`;

export const WhatsAppIcon = styled(Icon)`
  &:hover {
    transform: scale(1.2);
    transition: all 0.5s;
  }
`;
