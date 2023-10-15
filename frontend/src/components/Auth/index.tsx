import { useState } from "react";
import { AuthCard, AuthWrapper, CloseIcon } from "./styled";
import Modal from "../Modal";
import Img from "../../assets/auth.png";
import AuthForm from "./Authform";

interface PropType {
  open: boolean;
  close: () => void;
}

const Auth = ({ open, close }: PropType) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  const modalContent = (
    <AuthWrapper>
      <AuthCard>
        <CloseIcon className="" icon="ic:baseline-close" onClick={close} />

        <div className="relative bg-[#2874F0] w-[40%] flex flex-col items-center justify-between py-12 px-10 overflow-hidden">
          <div className="relative text-[#fff] ">
            <h1 className="relative text-[3rem] font-medium mb-4">
              {isLogin ? "Login" : "Signup"}
            </h1>
            <p className="relative text-[1.4rem]">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <img src={Img} alt="authImg" />
          </div>
        </div>
        <div className="relative w-[60%] px-12 py-12 flex flex-col justify-between items-center">
          <AuthForm isLogin={isLogin} />
          <div>
            <p
              className="relative text-[#2874F0] font-medium text-[1.4rem] cursor-pointer"
              onClick={toggleAuthMode}
            >
              {isLogin
                ? "New to Abicoirr? Create an account"
                : "Existing user? Log in"}
            </p>
          </div>
        </div>
      </AuthCard>
    </AuthWrapper>
  );

  return <Modal open={open} content={modalContent} />;
};

export default Auth;
