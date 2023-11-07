import { useForm } from "react-hook-form";
import Modal from "../../Modal";
import { AddUserContainer, CloseIcon, Wrapper } from "./styled";
import toast from "react-hot-toast";
import { useAPI } from "../../../hooks/useApi";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import { UserDetails } from "../../../types/User";
import { useEffect, useState } from "react";
import { isApiError } from "../../../types/Api";
import { getUserDetailsById } from "../../../api";

interface CreateUserProps {
  open: boolean;
  close: () => void;
  selectedId: number | undefined;
}

interface UserType {
  name: string;
  email: string;
  phone: string;
  password: string;
}
const SaveUser = ({
  open,
  close,
  selectedId,
}: CreateUserProps): JSX.Element => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });
  const api = useAPI();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();

  const EMAIL_REGREX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [data, setData] = useState<UserDetails | null>(null);

  const fetchUserDetailsById = async (id: number) => {
    startLoading("/getUserDetailsById");
    try {
      const res = await getUserDetailsById(api, id);
      if (!isApiError(res)) {
        setData(res);
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

  const onSubmit = (data: UserType): void => {
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
                  htmlFor="name"
                >
                  Name*
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter the name"
                  className={`relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem] ${
                    errors?.name && " border-red-500"
                  } rounded-md`}
                  {...register("name", { required: "Name is required" })}
                />
                <span className="relative text-red-600 font-medium mt-2">
                  {errors?.name &&
                    (errors?.name?.message || "Please enter valid input data")}
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
                  htmlFor="phone"
                  className="relative text-[1.5rem] font-semibold mb-2"
                >
                  Phone Number*
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Enter the phone number"
                  className={`relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem] ${
                    errors?.phone && " border-red-500"
                  } rounded-md`}
                  {...register("phone", {
                    required: "Phone Number is required",
                  })}
                />
                <span className="relative text-red-600 font-medium mt-2">
                  {errors?.phone &&
                    (errors?.phone?.message || "Please enter valid input data")}
                </span>
              </div>
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
