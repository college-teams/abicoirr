import { Link } from "react-router-dom";
import Logo from "/assets/logo.svg";
import { Icon } from "@iconify/react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-[#f3f3f3] h-full w-full">
      <div className="footer relative flex flex-wrap lg:flex-nowrap items-center justify-center gap-[8rem] lg:gap-[12rem] py-[6rem] lg:py-[8rem] w-[90%] mx-auto">
        <div className="relative mt-[-1rem] w-[200px] md:w-[230px] lg:w-[260px] xl:[300px] ">
          <Link to={"/"}>
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="relative flex flex-wrap justify-center gap-[7rem] font-medium">
          <div className="relative text-[1.4rem] text-black/60">
            <h2 className="text-[2rem] font-medium mb-5 text-black">General</h2>
            <p className="mb-2 cursor-pointer" onClick={scrollToTop}>
              <Link to={"/"}>Home</Link>
            </p>
            <p className="mb-2 cursor-pointer">
              <Link to={"/about"}> About Us</Link>
            </p>
            <p className="cursor-pointer">
              <Link to={"/contact"}>Contact us</Link>
            </p>
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

        <div className="relative text-[1.4rem] text-black/60">
          <h2 className="relative text-black text-[2rem] font-semibold mb-5">
            STAY IN THE LOOP
          </h2>
          <p className="flex items-center gap-3 mb-3 ext-[1.5rem]">
            <Icon className="text-[2rem]" icon="solar:phone-bold" />
            <span>+91-8610388319</span>
          </p>
          <p className="flex items-center gap-3  mb-4 ext-[1.5rem]">
            <Icon className="text-[2rem]" icon="fluent:mail-16-filled" />
            <span>abicoirr09@gmail.com</span>
          </p>
          <div className="flex items-center text-[2.5rem] gap-[1rem] text-black">
            <a href="https://www.instagram.com/abicoirr" target="_blank">
              <Icon
                className="cursor-pointer"
                icon="teenyicons:instagram-solid"
              />
            </a>
            <a href="https://www.facebook.com/abicoirr" target="_blank">
              <Icon
                className="text-[3rem] cursor-pointer"
                icon="ic:outline-facebook"
              />
            </a>

            <Icon className="text-[3.1rem] cursor-pointer" icon="bi:youtube" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
