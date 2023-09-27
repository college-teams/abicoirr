import { FunctionComponent } from "react";
import { ChatBotContainer, WhatsAppIcon } from "./styled";

const Chat: FunctionComponent = () => {
  const onClickHandler = (): void => {
    const message =
      "Hi, if you have any questions or queries, please feel free to contact us.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send/?phone=917502919281&text=${encodedMessage}&type=phone_number&app_absent=0`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <ChatBotContainer className="fixed">
      <WhatsAppIcon
        onClick={onClickHandler}
        className="relative cursor-pointer"
        icon="logos:whatsapp-icon"
      />
    </ChatBotContainer>
  );
};

export default Chat;
