import { Controller, useForm } from "react-hook-form";
import Modal from "../../Modal";
import { AddUserContainer, CloseIcon, Wrapper } from "./styled";
import toast from "react-hot-toast";
import { useAPI } from "../../../hooks/useApi";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import { SignupRequest, UserDetails } from "../../../types/User";
import { useCallback, useEffect } from "react";
import { isApiError } from "../../../types/Api";
import { getUserDetailsById } from "../../../api";

interface CreateUserProps {
  open: boolean;
  close: () => void;
  selectedId: number | null;
}

const SaveUser = ({
  open,
  close,
  selectedId,
}: CreateUserProps): JSX.Element => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupRequest | UserDetails>();
  const api = useAPI();
  const [, startLoading, endLoading] = useLoadingIndicator();

  const EMAIL_REGREX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const fetchUserDetailsById = async (id: number) => {
    startLoading("/getUserDetailsById");
    try {
      const res = await getUserDetailsById(api, id);
      if (!isApiError(res)) {
        setFormValues(res);
      }
    } finally {
      endLoading("/getUserDetailsById");
    }
  };

  useEffect(() => {
    if (selectedId && open) {
      fetchUserDetailsById(selectedId);
    }
  }, [selectedId, open]);

  const setFormValues = useCallback(
    (data: UserDetails) => {
      Object.keys(data).forEach((key) => {
        setValue(key as keyof UserDetails, data[key as keyof UserDetails]);
      });
    },
    [setValue]
  );

  const onSubmit = (data: SignupRequest | UserDetails): void => {
    console.log(data);
    toast.success("User successfully saved!!", {
      className: "relative font-semibold",
    });
    handleClose();
  };

  const handleClose = () => {
    reset();
    close();
  };

  const USER_ROLE_TYPE = ["ADMIN", "USER"];

  const modalContent = (
    <Wrapper>
      <AddUserContainer className="border">
        <CloseIcon
          className=""
          icon="ic:baseline-close"
          onClick={handleClose}
        />
        <div className="relative py-10 ml-10 w-full ">
          <div className="relative ">
            <h2 className="relative text-[2.2rem] font-semibold text-[#3068ec]">
              Add Admin
            </h2>
          </div>

          <div className="relative w-full mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative flex flex-col mb-6">
                <label
                  className="relative text-[1.5rem] font-semibold mb-2"
                  htmlFor="firstName"
                >
                  First Name*
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter the firstName"
                  className={`relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem] ${
                    errors?.firstName && " border-red-500"
                  } rounded-md`}
                  {...register("firstName", {
                    required: "FirstName is required",
                  })}
                />
                <span className="relative text-red-600 font-medium mt-2">
                  {errors?.firstName &&
                    (errors?.firstName?.message ||
                      "Please enter valid input data")}
                </span>
              </div>
              <div className="relative flex flex-col mb-6">
                <label
                  className="relative text-[1.5rem] font-semibold mb-2"
                  htmlFor="lastName"
                >
                  Last Name*
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter the lastName"
                  className={`relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem] ${
                    errors?.lastName && " border-red-500"
                  } rounded-md`}
                  {...register("lastName", {
                    required: "LastName is required",
                  })}
                />
                <span className="relative text-red-600 font-medium mt-2">
                  {errors?.lastName &&
                    (errors?.lastName?.message ||
                      "Please enter valid input data")}
                </span>
              </div>
              <div className="relative flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="relative text-[1.5rem] font-semibold mb-2"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter the email"
                  className={`relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem] ${
                    errors?.email && " border-red-500"
                  } rounded-md`}
                  {...register("email", {
                    required: "Email Address is required",
                    pattern: {
                      value: EMAIL_REGREX,
                      message: "Please enter valid email address!!",
                    },
                  })}
                />
                <span className="relative text-red-600 font-medium mt-2">
                  {errors?.email &&
                    (errors?.email?.message || "Please enter valid input data")}
                </span>
              </div>

              <div className="relative flex flex-col mb-6">
                <label
                  htmlFor="phoneNumber"
                  className="relative text-[1.5rem] font-semibold mb-2"
                >
                  Phone Number*
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter the phone number"
                  className={`relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem] ${
                    errors?.phoneNumber && " border-red-500"
                  } rounded-md`}
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                />
                <span className="relative text-red-600 font-medium mt-2">
                  {errors?.phoneNumber &&
                    (errors?.phoneNumber?.message ||
                      "Please enter valid input data")}
                </span>
              </div>

              <div className="relative flex flex-col mb-6">
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "User role is required" }}
                  render={({ field }) => (
                    <>
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="role"
                      >
                        Role*
                      </label>
                      <select
                        {...field}
                        className={`relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem]  mb-2 ${
                          errors?.phoneNumber && " border-red-500"
                        } rounded-md`}
                      >
                        <option value="">Select user role</option>
                        {USER_ROLE_TYPE.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                />

                <label
                  htmlFor="phoneNumber"
                  className="relative text-[1.5rem] font-semibold mb-2 mt-6"
                >
                  Phone Number*
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter the phone number"
                  className={`relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem] ${
                    errors?.phoneNumber && " border-red-500"
                  } rounded-md`}
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                />
                <span className="relative text-red-600 font-medium mt-2">
                  {errors?.phoneNumber &&
                    (errors?.phoneNumber?.message ||
                      "Please enter valid input data")}
                </span>
              </div>

              {!selectedId && (
                <div className="relative flex flex-col mb-6">
                  <label
                    htmlFor="password"
                    className="relative text-[1.5rem] font-semibold mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="text"
                    placeholder="Enter the password"
                    className="relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem]"
                    {...register("password")}
                  />
                </div>
              )}
              <div className="relative flex gap-5 mt-12">
                <button
                  onClick={handleClose}
                  className="relative border-orange-400 border-2 text-[1.5rem] px-8 py-1 rounded-md text-orange-400 hover:text-white hover:bg-orange-400 transition-all duration-300"
                >
                  Cancel
                </button>
                <button className="relative bg-orange-400 border-2 border-orange-400 text-[1.5rem] px-10 py-1 rounded-md text-white hover:bg-orange-600 hover:border-orange-600 transition-all duration-300">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </AddUserContainer>
    </Wrapper>
  );
  return <Modal open={open} content={modalContent} />;
};

export default SaveUser;
