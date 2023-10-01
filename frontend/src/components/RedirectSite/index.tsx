import {
  CloseIcon,
  RedirectCard,
  RedirectCardWrapper,
  RedirectLink,
} from "./styled";
import Amazon from "../../assets/amazon.png";
import Flipkart from "../../assets/flipkart.png";
import Meesho from "../../assets/meesho.png";
import Modal from "../Modal";
import { ECommercePlatformName, ExternalLinks } from "../../types/Admin";
interface PropType {
  open: boolean;
  close: () => void;
  externalSites: ExternalLinks[];
}

const RedirectSite = ({ open, close, externalSites }: PropType) => {
  const redirectHandler = (link: string) => {
    window.open(link, "_blank");
  };

  const getEcommerceShopImage = (shopName: ECommercePlatformName) => {
    if (shopName === "AMAZON") {
      return <img src={Amazon} alt="amazon" />;
    } else if (shopName === "FLIPKART") {
      return <img src={Flipkart} alt="flipkart" />;
    } else if (shopName === "MEESHO") {
      return  <img src={Meesho} alt="meesho" />;
    }
  };

  const modalContent = (
    <RedirectCardWrapper>
      <RedirectCard>
        <CloseIcon className="" icon="ic:baseline-close" onClick={close} />
        {!externalSites || externalSites.length <= 0 ? (
          <p className="relative text-[1.5rem] font-medium bg-white py-6 px-10 rounded-md">
            External ecommerce shop is not linked to this product, please
            contact if incase any queries?
          </p>
        ) : (
          externalSites?.map((e) => (
            <RedirectLink onClick={() => redirectHandler(e.link)}>
              {getEcommerceShopImage(e.platformName)}
            </RedirectLink>
          ))
        )}
      </RedirectCard>
    </RedirectCardWrapper>
  );

  return <Modal open={open} content={modalContent} />;
};

export default RedirectSite;
