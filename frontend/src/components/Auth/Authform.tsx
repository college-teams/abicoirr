import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { InputBox } from "./styled";
import { LoginRequest, SignupRequest } from "../../types/User";

interface PropType {
  isLogin: boolean;
  register: UseFormRegister<SignupRequest>;
  reset: UseFormReset<SignupRequest>;
  setValue: UseFormSetValue<SignupRequest>;
  getValues: UseFormGetValues<SignupRequest>;
  errors: FieldErrors<SignupRequest>;
  isDirty: boolean;
  handleSubmit: UseFormHandleSubmit<SignupRequest, undefined>;
  submitHandler: (data: SignupRequest | LoginRequest) => Promise<void>;
  loading: boolean;
}

const AuthForm = ({
  isLogin,
  register,
  errors,
  handleSubmit,
  submitHandler,
  loading,
}: PropType) => {
  const buttonText = isLogin ? "Login" : "Signup";

  const submit = (data: SignupRequest) => {
    if (isLogin) {
      submitHandler(data as LoginRequest);
    } else {
      submitHandler(data as SignupRequest);
    }
  };

  return (
    <form className="w-full mt-[2rem]" onSubmit={handleSubmit(submit)}>
      {!isLogin && (
        <>
          <div>
            <InputBox className="relative mb-[2rem]">
              <input
                id="fname"
                type="text"
                {...register("firstName", {
                  required: "FirstName is required",
                })}
              />
              <label htmlFor="fname"> FirstName* </label>
              <span className="relative text-red-600 font-medium mt-2">
                {errors?.firstName &&
                  (errors?.firstName?.message ||
                    "Please enter valid input data")}
              </span>
            </InputBox>
          </div>

          <div>
            <InputBox className="relative mb-[2rem]">
              <input
                id="lname"
                type="text"
                {...register("lastName", {
                  required: "LastName is required",
                })}
              />
              <label htmlFor="lname"> LastName* </label>
              <span className="relative text-red-600 font-medium mt-2">
                {errors?.firstName &&
                  (errors?.firstName?.message ||
                    "Please enter valid input data")}
              </span>
            </InputBox>
          </div>
        </>
      )}

      <InputBox className="relative mb-[2rem]">
        <input
          id="username"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email address",
            },
          })}
        />
        <label htmlFor="username"> Email* </label>
        <span className="relative text-red-600 font-medium mt-2">
          {errors?.email &&
            (errors?.email?.message || "Please enter valid input data")}
        </span>
      </InputBox>

      <InputBox className="relative mb-[4rem]">
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <label htmlFor="password"> Password* </label>
        <span className="relative text-red-600 font-medium mt-2">
          {errors?.password &&
            (errors?.password?.message || "Please enter valid input data")}
        </span>
      </InputBox>

      <button
        className={`relative bg-[#FB641B] ${
          loading && "bg-gray-300"
        }  w-full text-[#fff] py-4 text-[1.6rem] font-medium`}
      >
        {loading ? "Processing..." : buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
