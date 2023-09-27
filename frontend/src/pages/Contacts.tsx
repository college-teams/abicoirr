import { useForm } from "react-hook-form";
import { CreateContactDetails } from "../types/Admin";
import { useAPI } from "../hooks/useApi";
import useToast from "../hooks/useToast";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";
import React from "react";
import { saveContactDetails } from "../api";
import { isApiError } from "../types/Api";

const Contacts = () => {
  const api = useAPI();
  const showToast = useToast();
  const [loading, startLoading, endLoading] = useLoadingIndicator();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateContactDetails>();

  const onSubmit = async (data: CreateContactDetails): Promise<void> => {
    startLoading("/saveContactDetails");

    const res = await saveContactDetails(api, data);

    endLoading("/saveContactDetails");

    if (!isApiError(res)) {
      showToast(`Contact details saved successfully`, "success");
      reset();
    }
  };

  return (
    <React.Fragment>
      <div className="mt-[14rem] mb-[5rem] flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative mb-8 px-10 sm:px-0">
          <p className="relative text-black text-[1.8rem] text-center font-normal mb-2">
            Let us know how we can help and we’ll get right back to you.
          </p>
          <p className="relative text-black text-[1.8rem] text-center font-normal mb-4">
            You may contact us using the information below:
          </p>
          <div className="relative text-black text-[1.8rem] text-center font-medium mb-6">
            <p className="relative uppercase">abi coirr</p>
            <p className="relative capitalize">
              4/212,Katturpudur Kattur post, Pongalur via, dt, Tamil Nadu 641667
            </p>
            <p>Telephone No: 7574383956 </p>
            <p>E-Mail ID: support@abicoirr.in</p>
          </div>
        </div>

        {/* Form component */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-6">
              <label
                className="relative block text-[2rem] font-medium mb-1 capitalize w-full"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="focus:outline-none border border-gray-500 focus:border-[#008000] py-4  px-4 text-[1.5rem] w-full font-medium rounded"
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <span className="relative text-red-600 font-medium mt-2">
                {errors?.name &&
                  (errors?.name?.message || "Please enter valid input data")}
              </span>
            </div>
            <div className="w-full mb-6">
              <label
                className="relative block text-[2rem] font-medium mb-1 capitalize"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="focus:outline-none border border-gray-500 focus:border-[#008000] py-4  px-4 text-[1.5rem] w-full font-medium rounded"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <span className="relative text-red-600 font-medium mt-2">
                {errors?.email &&
                  (errors?.email?.message || "Please enter valid input data")}
              </span>
            </div>
            <div className="w-full mb-6">
              <label
                className="relative block text-[2rem] font-medium mb-1 capitalize"
                htmlFor="phone"
              >
                phone no
              </label>
              <input
                type="number"
                id="phone"
                className="focus:outline-none border border-gray-500 focus:border-[#008000] py-4  px-4 text-[1.5rem] w-full font-medium rounded"
                {...register("phoneNumber", {
                  required: "PhoneNumber is required",
                })}
              />
              <span className="relative text-red-600 font-medium mt-2">
                {errors?.phoneNumber &&
                  (errors?.phoneNumber?.message ||
                    "Please enter valid input data")}
              </span>
            </div>
            <div className="w-full mb-6">
              <label
                className="relative block text-[2rem] font-medium mb-1 capitalize"
                htmlFor="message"
              >
                How can we help?
              </label>
              <textarea
                rows={4}
                cols={50}
                className="focus:outline-none border border-gray-500 focus:border-[#008000] py-4  px-4 text-[1.5rem] w-full font-medium rounded"
                {...register("message", {
                  required: "Message is required",
                })}
              />
              <span className="relative text-red-600 font-medium mt-2">
                {errors?.message &&
                  (errors?.message?.message || "Please enter valid input data")}
              </span>
            </div>

            <div>
              {loading ? (
                <button
                  disabled
                  className={`relative w-full bg-gray-300 text-center py-7 text-gray-500 font-medium capitalize text-[2rem] rounded transition-all duration-300`}
                >
                  Saving...
                </button>
              ) : (
                <button
                  className={`relative w-full bg-[#008000] text-center py-7 text-white capitalize text-[2rem] rounded hover:bg-[#246424] transition-all duration-300`}
                >
                  Contact us
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contacts;
