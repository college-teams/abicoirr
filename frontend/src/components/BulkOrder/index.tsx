import Modal from "../Modal";
import { BulkOrderContainer, BulkOrderWrapper, CloseIcon } from "./styled";
import { Icon } from "@iconify/react";

interface PropType {
  open: boolean;
  close: () => void;
}

const BulkOrder = ({ open, close }: PropType) => {
  const onClickHandler = (): void => {
    const whatsappLink = `https://api.whatsapp.com/send/?phone=918610388319&type=phone_number&app_absent=0`;
    window.open(whatsappLink, "_blank");
  };

  const modalContent = (
    <BulkOrderWrapper>
      <BulkOrderContainer>
        <CloseIcon className="" icon="ic:baseline-close" onClick={close} />

        <p className="relative text-[1.5rem] font-medium">
          For bulk orders, we recommend getting in touch with our sales team for
          personalized assistance and smooth processing. Our team will be happy
          to assist you with your bulk order requirements.
          <br />
          <span className="relative mt-4 inline-block">
            You can reach out to us via phone at
            <span className="relative text-blue-500 cursor-pointer font-medium mx-4">
              +91-8610388319
            </span>
            or message us on
          </span>
          
          <span
            className="relative bg-[#4AC959] hover:text-white flex items-center justify-center w-[max-content] px-5 py-3 gap-3 rounded-md cursor-pointer font-medium mt-4"
            onClick={onClickHandler}
          >
            <Icon
              icon="ic:outline-whatsapp"
              className="relative text-[1.8rem]"
            />
            <span> WhatsApp</span>
          </span>
        </p>
      </BulkOrderContainer>
    </BulkOrderWrapper>
  );

  return <Modal open={open} content={modalContent} />;
};

export default BulkOrder;
