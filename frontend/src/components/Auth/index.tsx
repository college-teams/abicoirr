import React, { useState } from "react";
import { AuthCard, AuthWrapper, CloseIcon } from "./styled";
import Modal from "../Modal";
import Img from "/assets/auth.png";
import AuthForm from "./Authform";
import { useForm } from "react-hook-form";
import { LoginRequest, SignupRequest } from "../../types/User";
import { useAPI } from "../../hooks/useApi";
import useToast from "../../hooks/useToast";
import { useLoadingIndicator } from "../../hooks/useLoadingIndicator";
import { getCurrentUser, userLogin, userSignup } from "../../api";
import { isApiError } from "../../types/Api";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import { ConfirmationModal } from "../ConfirmModal";
import { useAppDispatch } from "../../store/configureStore";
import { setCurrentUserDetails } from "../../store/slices/user";
import { setHeaderToken } from "../../utils";

interface PropType {
  open: boolean;
  close: () => void;
}

const Auth = ({ open, close }: PropType) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<SignupRequest>({
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
    },
  });
  const api = useAPI();
  const showToast = useToast();
  const [loading, startLoading, endLoading] = useLoadingIndicator();
  const [props, activateConfirmModal] = useConfirmModal();
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const toggleAuthMode = () => {
    reset();
    setIsLogin((prev) => !prev);
  };

  const fetchLoggedInUserDetails = async () => {
    startLoading("/getCurrentUser");
    try {
      const res = await getCurrentUser(api);
      if (!isApiError(res)) {
        dispatch(setCurrentUserDetails(res));
      }
    } finally {
      endLoading("/getCurrentUser");
    }
  };

  const loginSuccessHandler = (token: string): void => {
    setHeaderToken(token);
    fetchLoggedInUserDetails();
  };

  const submitHandler = async (data: SignupRequest | LoginRequest) => {
    startLoading("/authRequest");
    let res;
    if (isLogin) {
      res = await userLogin(api, data as LoginRequest);
      if (!isApiError(res)) {
        showToast(`Successfully loggedIn`, "success");
        loginSuccessHandler(res.token);
        resetAndClose();
      }
    } else {
      (data as SignupRequest).role = "USER";
      res = await userSignup(api, data as SignupRequest);
      if (!res || !isApiError(res)) {
        showToast(
          `Successfully registered. Please check your email, verify your account, and proceed with logging in.`,
          "success"
        );
        reset();
        setIsLogin(true);
      }
    }

    endLoading("/authRequest");
  };

  const handleClose = async () => {
    if (
      isDirty &&
      !(await activateConfirmModal(
        "The form has unsaved changes, do you want to close ?"
      ))
    ) {
      return;
    }

    resetAndClose();
  };

  const resetAndClose = () => {
    setIsLogin(false);
    reset();
    close();
  };

  const modalContent = (
    <AuthWrapper>
      <AuthCard>
        <CloseIcon
          className=""
          icon="ic:baseline-close"
          onClick={handleClose}
        />

        <div className="relative bg-[#2874F0] w-[40%] flex flex-col items-center justify-between py-12 px-10 overflow-hidden !hidden lg:!flex">
          <div className="relative text-[#fff] ">
            <h1 className="relative  xl:text-[3rem] text-[2.8rem] font-medium mb-4">
              {isLogin ? "Login" : "Signup"}
            </h1>
            <p className="relative xl:text-[1.4rem] text-[1.2rem]">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <img src={Img} alt="authImg" />
          </div>
        </div>
        <div className="relative w-full lg:w-[60%] px-12 py-12 flex flex-col justify-between items-center">
          <AuthForm
            register={register}
            reset={reset}
            setValue={setValue}
            getValues={getValues}
            isLogin={isLogin}
            errors={errors}
            isDirty={isDirty}
            handleSubmit={handleSubmit}
            submitHandler={submitHandler}
            loading={loading}
          />
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

  return (
    <React.Fragment>
      <ConfirmationModal {...props} />

      <Modal open={open} content={modalContent} />
    </React.Fragment>
  );
};

export default Auth;
