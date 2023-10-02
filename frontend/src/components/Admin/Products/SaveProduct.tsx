/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  deleteFile,
  deleteProductImage,
  getCategoryList,
  getProductById,
  saveProduct,
  updateProduct,
  uploadFiles,
} from "../../../api";
import { useAPI } from "../../../hooks/useApi";
import useToast from "../../../hooks/useToast";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import { isApiError } from "../../../types/Api";
import Modal from "../../Modal";
import { CloseIcon, DetailsContainer, Wrapper } from "./styled";
import Loader from "../../Loader";
import {
  CategoryList,
  ECommercePlatformName,
  FileResponse,
  Product,
  ProductImages,
  UpdateProductRequest,
} from "../../../types/Admin";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { ConfirmationModal } from "../../ConfirmModal";
import { useConfirmModal } from "../../../hooks/useConfirmModal";
import Select from "react-select";

interface SaveProductDetailsProps {
  open: boolean;
  close: () => void;
  selectedId: number | null;
  refreshList: () => Promise<void>;
}

const SaveProductDetails = ({
  open,
  close,
  selectedId,
  refreshList,
}: SaveProductDetailsProps) => {
  const api = useAPI();
  const showToast = useToast();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();
  const [fileDirty, setFileDirty] = useState<boolean>(false);
  const [props, activateConfirmModal] = useConfirmModal();
  const [categoryListOptions, setCategoryListOptions] = useState([]);
  const [categoryList, setCategoryList] = useState<CategoryList[]>([]);
  const [seletedCategoryId, setSeletedCategoryId] = useState<number | null>(
    null
  );
  const [seletedCategoryName, setSeletedCategoryName] = useState<string>("");
  const [fileResponses, setFileResponses] = useState<FileResponse[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    trigger,
    setValue,
    setError,
    clearErrors,
    control,
    watch,
    getValues,
    formState: { errors, isDirty },
  } = useForm<Product>({ mode: "onChange" });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "links",
  });

  const fetchProductDetailsById = async (id: number) => {
    startLoading("/getProductById");
    try {
      const res = await getProductById(api, id);
      if (!isApiError(res)) {
        setFormValues(res);
      }
    } finally {
      endLoading("/getProductById");
    }
  };

  const uploadImages = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        startLoading("/uploadFiles");
        const files: File[] = Array.from(e.target.files);

        const res = await uploadFiles(api, files, "product");
        if (!isApiError(res)) {
          setFileResponses((pre) => [...pre, ...res]);
          showToast("Images uploaded successfully", "success");
        }
      } finally {
        endLoading("/uploadFiles");
        setFileDirty(true);
      }
    }
  };

  const deleteImage = async (imageKey: string): Promise<void> => {
    if (
      !(await activateConfirmModal(
        "Do you want to delete this image? This is an irreversible action and it will be permanently removed from the database!"
      ))
    ) {
      return;
    }

    try {
      startLoading("/deleteProductImage");
      let res;

      if (selectedId) {
        res = await deleteProductImage(api, selectedId, imageKey);
      } else {
        res = await deleteFile(api, imageKey);
      }

      if (!res || !isApiError(res)) {
        const images = fileResponses.filter((e) => e.imageKey !== imageKey);
        setFileResponses(images);
        showToast("Image successfully removed from the database", "success");
        setFileDirty(images.length > 0);
      }
    } finally {
      endLoading("/deleteProductImage");
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
    refreshList();
  };

  const resetForm = () => {
    setFileDirty(false);
    setFileResponses([]);
    setValue("links", []);
    reset();
    setSeletedCategoryId(null);
    setSeletedCategoryName("");
    setCategoryListOptions([]);
    setCategoryList([]);
  };

  const onSubmit = async (
    data: Product | UpdateProductRequest
  ): Promise<void> => {
    if (!data.links || data.links.length <= 0) {
      setError("links", {
        message: "Shop links is required",
      });
      return;
    } else {
      clearErrors("links");
    }

    if (!seletedCategoryId) {
      setError("category", {
        message: "Category links is requires",
      });
      return;
    } else {
      clearErrors("category");
    }

    data = data as UpdateProductRequest;

    data.categoryId = seletedCategoryId;
    const images: ProductImages[] =
      fileResponses?.map(
        (e) =>
          ({ imageKey: e.imageKey, imagePath: e.imagePath } as ProductImages)
      ) || [];

    data.images = images;

    startLoading("/saveProduct");

    let res;
    if (selectedId) {
      res = await updateProduct(api, selectedId, data);
    } else {
      res = await saveProduct(api, data);
    }

    endLoading("/saveProduct");

    if (!isApiError(res)) {
      showToast(
        `Product ${selectedId ? "updated" : "saved"} successfully`,
        "success"
      );
      refreshList();
      resetForm();
      close();
    }
  };

  const setFormValues = useCallback(
    (data: Product) => {
      Object.keys(data).forEach((key) => {
        switch (key) {
          case "images": {
            const images = data["images"];
            if (images != null && images.length > 0) {
              const imageResponse = [];
              for (let i = 0; i < images.length; i++) {
                imageResponse.push({
                  entityKey: "product",
                  imagePath: images[i]["imagePath"],
                  imageKey: images[i]["imageKey"],
                });
              }
              setFileResponses(imageResponse);
              setValue("images", images);
            } else {
              setFileResponses([]);
            }
            break;
          }

          case "category": {
            const category = categoryList.filter(
              (e) => e.id == data["category"].id
            );

            if (category && category.length > 0) {
              setSeletedCategoryId(category[0].id);
              setSeletedCategoryName(category[0].categoryName);
              setValue("category", category[0]);
            }
            break;
          }
          default: {
            setValue(key as keyof Product, data[key as keyof Product]);
            break;
          }
        }
      });
    },
    [setValue, categoryList]
  );

  const fetchCategoryList = async () => {
    startLoading("/getCategoryList");
    try {
      const res = await getCategoryList(api);
      if (!isApiError(res)) {
        setCategoryList(res);
        const options = res.map((e) => ({
          value: e.id,
          label: e.categoryName,
        }));
        setCategoryListOptions(options as any);
      }
    } finally {
      endLoading("/getCategoryList");
    }
  };

  const availableItems: ECommercePlatformName[] = [
    "MEESHO",
    "AMAZON",
    "FLIPKART",
  ];

  const nonSelectedItems = availableItems.filter(
    (item) =>
      !getValues("links")
        ?.map((e) => e.platformName)
        .includes(item as ECommercePlatformName)
  );

  const handleAddItem = async () => {
    const hasError = await trigger("links");

    if (!hasError) {
      return;
    }

    if (nonSelectedItems.length > 0) {
      append({ platformName: nonSelectedItems[0], link: "" });
    }
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    reset({});
    fetchCategoryList();
    if (selectedId) {
      fetchProductDetailsById(selectedId);
    }
  }, [selectedId, open]);

  // console.log(watch(), seletedCategoryName, categoryList);
  watch();

  const modalContent = (
    <Wrapper>
      <DetailsContainer className="border">
        {isLoading("/getProductById") || isLoading("/getCategoryList") ? (
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
                  {selectedId ? "Edit" : "Add"} product
                </h2>
              </div>

              <div className="relative w-full mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative flex w-[85%] items-center justify-between gap-5 mb-6">
                    <div className="relative flex-1 flex flex-col">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="name"
                      >
                        Name*
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        {...register("productName", {
                          required: "ProductName is required",
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-3  px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.productName &&
                          (errors?.productName?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>

                    <div className="relative flex-1">
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <>
                            <label
                              className="relative text-[1.5rem] font-semibold mb-1 block"
                              htmlFor="category"
                            >
                              Category*
                            </label>
                            <Select
                              {...field}
                              id="category"
                              value={field.value}
                              onChange={(newValue: any) => {
                                field.onChange(newValue);
                                setSeletedCategoryId(newValue?.value);
                              }}
                              defaultInputValue={seletedCategoryName}
                              options={categoryListOptions}
                              isSearchable={true}
                              isLoading={isLoading("/getCategoryList")}
                              isClearable={true}
                              className="relative border font-medium outline-none text-[1.4rem] rounded-md"
                            />
                          </>
                        )}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.category &&
                          (errors?.category?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex flex-col mb-6">
                    <label
                      htmlFor="Description"
                      className="relative text-[1.5rem] font-semibold mb-2"
                    >
                      Description*
                    </label>
                    <textarea
                      id="Description"
                      placeholder="Description.."
                      {...register("productDescription", {
                        required: "ProductDescription is required",
                      })}
                      rows={5}
                      className="relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem]"
                    />
                    <span className="relative text-red-600 font-medium mt-2">
                      {errors?.productDescription &&
                        (errors?.productDescription?.message ||
                          "Please enter valid input data")}
                    </span>
                  </div>

                  <div className="relative flex justify-between w-[85%] gap-5">
                    <div className="relative flex-1 flex flex-col mb-6">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="price"
                      >
                        Price*
                      </label>
                      <input
                        id="price"
                        type="text"
                        placeholder="Price"
                        {...register("price", {
                          required: "Price is required",
                          pattern: {
                            value: /^\d+(\.\d{1,5})?$/,
                            message: "Please enter a valid price",
                          },
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-2  px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.price &&
                          (errors?.price?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>

                    <div className="relative flex-1 flex flex-col mb-6">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="stockQuantity"
                      >
                        Stock Quantity*
                      </label>
                      <input
                        id="stockQuantity"
                        type="number"
                        min={0}
                        placeholder="Stock Quantity"
                        {...register("stockQuantity", {
                          required: "StockQuantity is required",
                          pattern: {
                            value: /^\d+$/,
                            message: "Please enter a valid stock quantity",
                          },
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-2 px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.stockQuantity &&
                          (errors?.stockQuantity?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex flex-col mb-6">
                    <label
                      className="relative text-[1.5rem] font-semibold mb-2"
                      htmlFor="discountPercent"
                    >
                      Discount Percent
                    </label>
                    <input
                      id="discountPercent"
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Discount Percent"
                      {...register("discountPercent", {
                        pattern: {
                          value: /^\d+$/,
                          message: "Please enter a valid discount price",
                        },
                      })}
                      className={`relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem] rounded-md`}
                    />
                    <span className="relative text-red-600 font-medium mt-2">
                      {errors?.discountPercent &&
                        (errors?.discountPercent?.message ||
                          "Please enter valid input data")}
                    </span>
                  </div>

                  <div className="relative flex flex-col mb-6">
                    <label
                      className="relative text-[1.5rem] font-semibold mb-2"
                      htmlFor="discountPercent"
                    >
                      External Links*
                    </label>
                    <span className="relative text-red-600 font-medium -mt-2 mb-4 block text-[1.3rem]">
                      {errors?.links &&
                        (errors?.links?.message ||
                          "Please enter valid input data")}
                    </span>

                    {fields.map((field, index) => (
                      <div
                        className="flex gap-10 items-center mb-5 w-[85%]"
                        key={index}
                      >
                        <div className="relative  w-[60%]">
                          <input
                            defaultValue={field.link}
                            {...register(`links.${index}.link`, {
                              required: {
                                value: true,
                                message: "Link is required field",
                              },
                              pattern: {
                                value:
                                  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                                message: "Please enter a valid URL",
                              },
                            })}
                            onChange={(e) => {
                              trigger("links");
                              const newValue = e.target.value;
                              setValue(`links.${index}.link`, newValue);
                              clearErrors(`links`);
                            }}
                            placeholder="Enter the shop link"
                            className={`relative border-2 border-gray-300 font-medium w-full  py-3 px-4 outline-none text-[1.2rem] rounded-md`}
                          />

                          <span className="relative text-red-600 font-medium mt-2">
                            {errors?.links?.[index]?.link &&
                              (errors?.links?.[index]?.link?.message ||
                                "Please enter valid input data")}
                          </span>
                        </div>

                        <div className="relative w-[30%]">
                          <select
                            {...register(`links.${index}.platformName`)}
                            defaultValue={field.platformName}
                            id={`links.${index}.platformName`}
                            className={`relative border-2 border-gray-300 font-medium w-full py-3 px-4 outline-none text-[1.4rem] rounded-md`}
                          >
                            {availableItems.map((item) => (
                              <option
                                key={item}
                                value={item}
                                disabled={getValues()
                                  .links.map((f) => f.platformName)
                                  .includes(item)}
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                          <span className=" invisible">
                            {errors?.links?.[index]?.link &&
                              errors?.links?.[index]?.link?.message}
                          </span>
                        </div>

                        <div className="relative w-[10%]">
                          <Icon
                            onClick={() => handleRemoveItem(index)}
                            icon="material-symbols:delete-outline"
                            className={`h-[25px] w-[25px] cursor-pointer ${
                              index === 0 && fields.length < 2
                                ? " pointer-events-none opacity-50"
                                : ""
                            }`}
                          />
                          <span className=" invisible">
                            {errors?.links?.[index]?.link && "T"}
                          </span>
                        </div>
                      </div>
                    ))}

                    {nonSelectedItems.length > 0 && (
                      <div className="relative text-center flex items-center justify-start">
                        <button
                          className="relative bg-slate-300 hover:bg-slate-600 hover:text-white w-[120px] py-3 text-[1.4rem] rounded-md font-semibold text-center"
                          type="button"
                          onClick={handleAddItem}
                        >
                          + Add link
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="relative font-medium text-[2rem] mb-[2rem]">
                    Images
                  </div>

                  <div className="relative flex gap-8 flex-wrap">
                    {fileResponses &&
                      fileResponses.map((fileResponse, i) => (
                        <div
                          key={i}
                          className="relative flex  gap-2 items-center"
                        >
                          <div className="relative overflow-hidden h-[150px] w-[150px]">
                            <img
                              className="border h-full w-full object-cover"
                              src={fileResponse.imagePath}
                              alt={fileResponse.entityKey}
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
                      ))}
                  </div>

                  <div className="mt-6">
                    {!isLoading("/deleteProductImage") &&
                    !isLoading("/uploadFiles") ? (
                      <input
                        multiple
                        type="file"
                        name="file"
                        onChange={uploadImages}
                      />
                    ) : (
                      <div className="relative my-10">
                        <Loader />
                      </div>
                    )}
                  </div>

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

                    {isLoading("/saveCategory") || (!isDirty && !fileDirty) ? (
                      <button
                        disabled
                        className="relative disabled:bg-gray-300 disabled:border-gray-300 disabled:pointer-events-none  bg-orange-400 border-2 border-orange-400 text-[1.5rem] px-10 py-1 rounded-md text-white hover:bg-orange-600 hover:border-orange-600 transition-all duration-300"
                      >
                        {isLoading("/saveCategory") ? "Saving" : "Save"}
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

export default SaveProductDetails;
