import { useEffect, useState } from "react";
import { getContactDetailsById } from "../../../api";
import { useAPI } from "../../../hooks/useApi";
import useToast from "../../../hooks/useToast";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import { ContactDetails } from "../../../types/Admin";
import { isApiError } from "../../../types/Api";
import Modal from "../../Modal";
import { CloseIcon, DetailsContainer, Wrapper } from "./styled";
import Loader from "../../Loader";

interface DetailsProps {
  open: boolean;
  close: () => void;
  selectedId: number | undefined;
  updateUnReadMessageCount: () => Promise<void>;
}

const Details = ({
  open,
  close,
  selectedId,
  updateUnReadMessageCount,
}: DetailsProps) => {
  const api = useAPI();
  const showToast = useToast();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();

  const [data, setData] = useState<ContactDetails | null>(null);

  const fetchContactDetailsById = async (id: number) => {
    startLoading("/getContactDetailsById");
    try {
      const res = await getContactDetailsById(api, id);
      if (!isApiError(res)) {
        setData(res);
        showToast("Contact details fetched successfully", "success");
      }
    } finally {
      endLoading("/getContactDetailsById");
      // Update UnreadMessagecount in frontend
      updateUnReadMessageCount();
    }
  };

  const handleClose = () => {
    setData(null);
    close();
  };
  useEffect(() => {
    if (selectedId && open) {
      fetchContactDetailsById(selectedId);
    }
  }, [selectedId, open]);

  const modalContent = (
    <Wrapper>
      <DetailsContainer className="border">
        {isLoading("/getContactDetailsById") && data === null ? (
          <div className="relative  flex items-center justify-center py-[5rem]">
            <Loader />
          </div>
        ) : (
          <>
            <CloseIcon
              className=""
              icon="ic:baseline-close"
              onClick={handleClose}
            />

            <div className="relative py-10 ml-10 w-full ">
              <div className="relative ">
                <h2 className="relative text-[2.2rem] font-semibold text-[#3068ec] capitalize">
                  contact details
                </h2>
              </div>

              <div className="relative w-full mt-8">
                <form>
                  <div className="relative flex flex-col mb-6">
                    <label
                      className="relative text-[1.5rem] font-semibold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      readOnly
                      placeholder="Name"
                      value={data?.name}
                      className={`relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem] rounded-md`}
                    />
                  </div>
                  <div className="relative flex flex-col mb-6">
                    <label
                      htmlFor="email"
                      className="relative text-[1.5rem] font-semibold mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      readOnly
                      placeholder="Email"
                      value={data?.email}
                      className={`relative border-2 border-gray-300 font-medium py-2 w-[85%] px-4 outline-none text-[1.4rem] rounded-md`}
                    />
                  </div>
                  <div className="relative flex flex-col mb-6">
                    <label
                      htmlFor="phone"
                      className="relative text-[1.5rem] font-semibold mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="text"
                      readOnly
                      placeholder="Phone number"
                      value={data?.phoneNumber}
                      className={`relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem] rounded-md`}
                    />
                  </div>
                  <div className="relative flex flex-col mb-6">
                    <label
                      htmlFor="password"
                      className="relative text-[1.5rem] font-semibold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="password"
                      placeholder="Message.."
                      readOnly
                      value={data?.message}
                      className="relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem]"
                    />
                  </div>

                  <div className="relative flex gap-5 mt-12">
                    <button
                      onClick={handleClose}
                      className="relative bg-orange-400 border-2 border-orange-400 text-[1.5rem] px-10 py-1 rounded-md text-white hover:bg-orange-600 hover:border-orange-600 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </DetailsContainer>
    </Wrapper>
  );
  return <Modal open={open} content={modalContent} />;
};

export default Details;
