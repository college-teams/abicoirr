import React from "react";
import { InputBox } from "./styled";

interface PropType {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: PropType) => {
  const buttonText = isLogin ? "Login" : "Signup";

  return (
    <form className="w-full">
      {!isLogin && (
        <InputBox className="relative mb-[2rem]">
          <input id="name" type="text" required />
          <label htmlFor="name"> Name </label>
        </InputBox>
      )}

      <InputBox className="relative mb-[2rem]">
        <input id="username" type="email" required />
        <label htmlFor="username"> Email </label>
      </InputBox>

      <InputBox className="relative mb-[4rem]">
        <input id="password" type="password" required />
        <label htmlFor="password"> Password </label>
      </InputBox>

      <button className="relative bg-[#FB641B] w-full text-[#fff] py-4 text-[1.6rem] font-medium">
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
