import React from "react";
import { CloseIcon, RedirectCard, RedirectCardWrapper, RedirectLink } from "./styled";
import Amazon from "../../assets/amazon.png";
import Flipkart from "../../assets/flipkart.png";
import Meesho from "../../assets/meesho.png";
import Modal from "../Modal";
interface PropType {
  open:boolean;
  close:()=>void
}

const RedirectSite = ({open,close}:PropType) => {
  const modalContent = (
    <RedirectCardWrapper>
      <RedirectCard>
      <CloseIcon className="" icon="ic:baseline-close" onClick={close} />
        <RedirectLink>
          <img src={Amazon} alt="amazon" />
        </RedirectLink>

        <RedirectLink>
          <img src={Flipkart} alt="flipkart" />
        </RedirectLink>

        <RedirectLink>
          <img src={Meesho} alt="meesho" />
        </RedirectLink>
      </RedirectCard>
    </RedirectCardWrapper>
  );

  return <Modal open={open} content={modalContent} />;
};

export default RedirectSite;
