import { useCallback } from "react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  deleteCategoryImage,
  getCategoryById,
  saveCategory,
  updateCategory,
  uploadFile,
} from "../../../api";
import { useAPI } from "../../../hooks/useApi";
import useToast from "../../../hooks/useToast";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import { isApiError } from "../../../types/Api";
import Modal from "../../Modal";
import { CloseIcon, DetailsContainer, Wrapper } from "./styled";
import Loader from "../../Loader";
import { Category, CategoryList, FileResponse } from "../../../types/Admin";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { ConfirmationModal } from "../../ConfirmModal";
import { useConfirmModal } from "../../../hooks/useConfirmModal";

interface DetailsProps {
  open: boolean;
  close: () => void;
  selectedId: number | null;
  refreshList: () => Promise<void>;
}

const Details = ({ open, close, selectedId, refreshList }: DetailsProps) => {
  const api = useAPI();
  const showToast = useToast();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();
  const [fileDirty, setFileDirty] = useState<boolean>(false);
  const [props, activateConfirmModal] = useConfirmModal();
  
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<CategoryList>();

  const [fileResponse, setFileResponse] = useState<FileResponse | null>(null);

  const fetchCategoryDetailsById = async (id: number) => {
    startLoading("/getCategoryById");
    try {
      const res = await getCategoryById(api, id);
      if (!isApiError(res)) {
        setFormValues(res);
      }
    } finally {
      endLoading("/getCategoryById");
    }
  };

  const uploadImage = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        startLoading("/uploadFile");
        const file: File = e.target.files[0];
        const res = await uploadFile(api, file, "category");
        if (!isApiError(res)) {
          setFileResponse(res);
          showToast("Image uploaded successfully", "success");
        }
      } finally {
        endLoading("/uploadFile");
        setFileDirty(true);
      }
    }
  };

  const deleteImage = async (imageKey: string): Promise<void> => {
    try {
      startLoading("/deleteCategoryImage");
      const res = await deleteCategoryImage(api, getValues().id, imageKey);
      if (!res || !isApiError(res)) {
        setFileResponse(null);
        showToast("Image deleted successfully", "success");
      }
    } finally {
      endLoading("/deleteCategoryImage");
      setFileDirty(true);
    }
  };

  const handleClose = async () => {
    if (
      (isDirty || fileDirty) &&
      !(await activateConfirmModal(
        "The form has unsaved changes, do you want to close ?"
      ))
    ) {
      return;
    }
    resetForm();
    close();
  };

  const resetForm = () => {
    setFileDirty(false);
    setFileResponse(null);
    reset();
  };

  const onSubmit = async (data: Category): Promise<void> => {
    if (!fileResponse) {
      showToast("Please upload image before saving category!!", "error");
      return;
    }

    data.imageKey = fileResponse?.imageKey;
    data.imagePath = fileResponse?.imagePath;

    startLoading("/saveCategory");

    let res;
    if (selectedId) {
      res = await updateCategory(api, selectedId, data);
    } else {
      res = await saveCategory(api, data);
    }

    endLoading("/saveCategory");

    if (!isApiError(res)) {
      showToast(
        `Category details ${selectedId ? "updated" : "saved"} successfully`,
        "success"
      );
      refreshList();
      resetForm();
      close();
    }
  };

  const setFormValues = useCallback(
    (data: Category) => {
      Object.keys(data).forEach((key) => {
        switch (key) {
          case "imageKey": {
            setFileResponse((pre) => ({
              ...pre,
              entityKey: "category",
              imagePath: data["imagePath"],
              imageKey: data["imageKey"],
            }));
            setValue("imageKey", data["imageKey"]);
            break;
          }

          default: {
            setValue(key as keyof Category, data[key as keyof Category]);
            break;
          }
        }
      });
    },
    [setValue]
  );

  useEffect(() => {
    if (selectedId) {
      fetchCategoryDetailsById(selectedId);
    }
  }, [selectedId]);

  const modalContent = (
    <Wrapper>
      <DetailsContainer className="border">
        {isLoading("/getCategoryById") ? (
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
                  {selectedId ? "Edit" : "Add"} Category
                </h2>
              </div>

              <div className="relative w-full mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                      placeholder="Name"
                      {...register("categoryName", {
                        required: "CategoryName is required",
                      })}
                      className={`relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem] rounded-md`}
                    />
                    <span className="relative text-red-600 font-medium mt-2">
                      {errors?.categoryName &&
                        (errors?.categoryName?.message ||
                          "Please enter valid input data")}
                    </span>
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
                      {...register("categoryDescription", {
                        required: "CategoryDescription is required",
                      })}
                      rows={5}
                      className="relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem]"
                    />
                    <span className="relative text-red-600 font-medium mt-2">
                      {errors?.categoryDescription &&
                        (errors?.categoryDescription?.message ||
                          "Please enter valid input data")}
                    </span>
                  </div>

                  <div className="relative font-medium text-[2rem] mb-[2rem]">
                    Image
                  </div>
                  {!fileResponse || isLoading("/deleteCategoryImage") ? (
                    <div>
                      <input type="file" name="file" onChange={uploadImage} />
                      {(isLoading("/uploadFile") ||
                        isLoading("/deleteCategoryImage")) && (
                        <div className="relative my-10">
                          <Loader />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative flex gap-10 items-center">
                      <div className="relative overflow-hidden h-[150px] w-[150px]">
                        <img
                          className="border h-full w-full object-cover"
                          src={fileResponse?.imagePath}
                          alt={fileResponse?.entityKey}
                        />
                      </div>
                      <Icon
                        onClick={() => {
                          deleteImage(fileResponse.imageKey);
                        }}
                        className="relative h-[30px] w-[30px] cursor-pointer"
                        icon="material-symbols:delete-outline"
                      />
                    </div>
                  )}

                  <div className="relative flex gap-5 mt-12">
                    <button
                      type="button"
                      onClick={handleClose}
                      className={`relative border-orange-400 border-2 text-[1.5rem] px-8 py-1 rounded-md text-orange-400 hover:text-white hover:bg-orange-400 transition-all duration-300 ${
                        isLoading("/saveCategory") &&
                        `border-gray-300 hover:border-gray-300 hover:bg-gray-300 border-2 pointer-events-none`
                      }`}
                    >
                      Cancel
                    </button>

                    {isLoading("/saveCategory") ? (
                      <button
                        disabled
                        className="relative disabled:bg-gray-300 disabled:border-gray-300 disabled:pointer-events-none  bg-orange-400 border-2 border-orange-400 text-[1.5rem] px-10 py-1 rounded-md text-white hover:bg-orange-600 hover:border-orange-600 transition-all duration-300"
                      >
                        Saving...
                      </button>
                    ) : (
                      <button
                        className={`relative bg-orange-400 border-2 border-orange-400 text-[1.5rem] px-10 py-1 rounded-md text-white hover:bg-orange-600 hover:border-orange-600 transition-all duration-300 `}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </DetailsContainer>
    </Wrapper>
  );
  return (
    <>
      <ConfirmationModal {...props} />
      <Modal open={open} content={modalContent} />;
    </>
  );
};

export default Details;
