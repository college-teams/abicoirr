import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <div className="bg-[#f3f3f3] h-full w-full">
      <div className="footer relative flex items-center justify-center gap-[12rem] py-[8rem]">
        <div className="relative flex justify-center gap-[7rem] font-medium">
          <div className="relative text-[1.4rem] text-black/60">
            <h2 className="text-[2rem] font-medium mb-5 text-black">General</h2>
            <p className="mb-2 cursor-pointer">Home</p>
            <p className="mb-2 cursor-pointer">About Us</p>
            <p className="cursor-pointer">Contact us</p>
          </div>
          <div className="relative text-[1.4rem] text-black/60 font-medium">
            <h2 className="text-[2rem] font-medium mb-5 text-black">
              Policies
            </h2>
            <p className="mb-2 cursor-pointer">
              <Link to={"/privacy-policy"}>Privacy Policy</Link>
            </p>
            <p className="mb-2 cursor-pointer">
              <Link to={"/terms-conditions"}>Terms-condition</Link>
            </p>
            <p className="cursor-pointer">
              <Link to={"/shipping-policy"}>Shipping Policy</Link>
            </p>
          </div>
        </div>

        <div className="relative mt-[-1rem] w-[300px]">
          <img src={Logo} alt="logo" />
        </div>
        <div className="relative text-[1.4rem] text-black/60">
          <h2 className="relative text-black text-[2rem] font-semibold mb-5">
            STAY IN THE LOOP
          </h2>
          <p className="flex items-center gap-3 mb-3 ext-[1.5rem]">
            <Icon className="text-[2rem]" icon="solar:phone-bold" />
            <span>+91-9940465655</span>
          </p>
          <p className="flex items-center gap-3  mb-4 ext-[1.5rem]">
            <Icon className="text-[2rem]" icon="fluent:mail-16-filled" />
            <span>support@abicoirr.in</span>
          </p>
          <div className="flex items-center text-[2.5rem] gap-[1rem] text-black">
            <Icon
              className="cursor-pointer"
              icon="teenyicons:instagram-solid"
            />
            <Icon
              className="text-[3rem] cursor-pointer"
              icon="ic:outline-facebook"
            />
            <Icon className="text-[3.1rem] cursor-pointer" icon="bi:youtube" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
/*


*/
