/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { useAPI } from "../../../hooks/useApi";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import useToast from "../../../hooks/useToast";
import Loader from "../../Loader";
import { AdminContainer, CloseIcon, Wrapper } from "./styled";
import { useConfirmModal } from "../../../hooks/useConfirmModal";
import {
  AdminOrder,
  AdminOrderResponseData,
  Product,
  UpdateAdminOrderRequest,
} from "../../../types/Admin";
import { useCallback, useEffect, useState } from "react";
import {
  getAdminOrderById,
  getProductList,
  saveAdminOrder,
  updateAdminOrder,
} from "../../../api";
import { isApiError } from "../../../types/Api";
import { ConfirmationModal } from "../../ConfirmModal";
import Modal from "../../Modal";
import Select from "react-select";

interface SaveOrderProps {
  open: boolean;
  close: () => void;
  selectedId: number | null;
  refreshList: () => Promise<void>;
}

const SaveOrder = ({
  open,
  close,
  refreshList,
  selectedId,
}: SaveOrderProps) => {
  const api = useAPI();
  const showToast = useToast();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();
  const [props, activateConfirmModal] = useConfirmModal();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<AdminOrder>({ mode: "onChange" });

  const handleClose = async () => {
    if (
      isDirty &&
      !(await activateConfirmModal(
        "The form has unsaved changes, do you want to close ?"
      ))
    ) {
      return;
    }

    reset();
    close();
    refreshList();
  };

  const [, setProducts] = useState<Product[]>([]);
  const [productListOptions, setProductListOptions] = useState([]);

  const ORDER_STATUS_OPTIONS = [
    "PENDING",
    "PROCESSED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];
  const PAYMENT_TYPE_OPTIONS = [
    "CREDIT_CARD",
    "DEBIT_CARD",
    "NET_BANKING",
    "CASH_ON_DELIVERY",
  ];
  const PAYMENT_STATUS_OPTIONS = ["PENDING", "PAID", "FAILED", "REFUNDED"];

  const fetchAdminOrderById = async (id: number) => {
    startLoading("/getAdminOrderById");
    try {
      const res = await getAdminOrderById(api, id);
      if (!isApiError(res)) {
        setFormValues(res);
      }
    } finally {
      endLoading("/getAdminOrderById");
    }
  };

  const fetchProductList = async () => {
    startLoading("/getProductList");
    try {
      const res = await getProductList(api);
      if (!isApiError(res)) {
        setProducts(res);
        const options = res.map((e) => ({
          value: e.id,
          label: e.productName,
        }));
        setProductListOptions(options as any);
      }
    } finally {
      endLoading("/getProductList");
    }
  };

  const onSubmit = async (
    data: AdminOrder | UpdateAdminOrderRequest
  ): Promise<void> => {
    const productsIds = (data.productIds as any).map((e: any) => e.value);

    data.productIds = productsIds;
    data.userId = 1;

    startLoading("/saveAdminOrder");

    let res;
    if (selectedId) {
      res = await updateAdminOrder(
        api,
        selectedId,
        data as UpdateAdminOrderRequest
      );
    } else {
      res = await saveAdminOrder(api, data);
    }

    endLoading("/saveAdminOrder");

    if (!isApiError(res)) {
      showToast(
        `Order ${selectedId ? "updated" : "saved"} successfully`,
        "success"
      );
      refreshList();
      reset();
      close();
    }
  };

  const setFormValues = useCallback(
    (data: AdminOrderResponseData) => {
      Object.keys(data).forEach((key) => {
        switch (key) {
          case "products": {
            const productNames = data["products"].map((e) => ({
              value: e.id,
              label: e.productName,
            }));
            setValue("productIds", productNames as any);
            break;
          }
          default: {
            setValue(key as keyof AdminOrder, data[key as keyof AdminOrder]);
            break;
          }
        }
      });
    },
    [setValue]
  );

  useEffect(() => {
    reset({});
    fetchProductList();
    if (selectedId) {
      fetchAdminOrderById(selectedId);
    }
  }, [selectedId, open]);

  const modalContent = (
    <Wrapper>
      <AdminContainer className="border">
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
                <h2 className="relative text-[2.4rem] font-semibold text-[#3068ec] capitalize">
                  {selectedId ? "Edit" : "Add"} Order
                </h2>
              </div>

              <div className="relative w-full mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative flex w-[85%] items-center justify-between gap-5 mb-6">
                    <div className="relative flex-1">
                      <Controller
                        name="orderStatus"
                        control={control}
                        rules={{ required: "Order status is required" }}
                        render={({ field }) => (
                          <>
                            <label
                              className="relative text-[1.5rem] font-semibold mb-1 block"
                              htmlFor="orderStatus"
                            >
                              Order Status*
                            </label>
                            <select
                              {...field}
                              className="relative border-2 border-gray-300 w-full py-4 outline-none px-3 text-xl"
                            >
                              <option value="">Select an order status</option>
                              {ORDER_STATUS_OPTIONS.map((status, index) => (
                                <option key={index} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </>
                        )}
                      />

                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.orderStatus && errors?.orderStatus?.message}
                      </span>
                    </div>

                    <div className="relative flex-1">
                      <Controller
                        name="paymentStatus"
                        control={control}
                        rules={{ required: "Payment status is required" }}
                        render={({ field }) => (
                          <>
                            <label
                              className="relative text-[1.5rem] font-semibold mb-1 block"
                              htmlFor="PaymentStatus"
                            >
                              Payment status*
                            </label>
                            <select
                              {...field}
                              className="relative border-2 border-gray-300 w-full py-4 outline-none px-3 text-xl"
                            >
                              <option value="">Select an payment status</option>
                              {PAYMENT_STATUS_OPTIONS.map((status, index) => (
                                <option key={index} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </>
                        )}
                      />

                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.paymentStatus &&
                          errors?.paymentStatus?.message}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex w-[85%] items-center justify-between gap-5 mb-6">
                    <div className="relative flex-1">
                      <Controller
                        name="paymentType"
                        control={control}
                        rules={{ required: "Payment type is required" }}
                        render={({ field }) => (
                          <>
                            <label
                              className="relative text-[1.5rem] font-semibold mb-1 block"
                              htmlFor="paymentType"
                            >
                              Payment type*
                            </label>
                            <select
                              {...field}
                              className="relative border-2 border-gray-300 w-full py-4 outline-none px-3 text-xl  rounded-md"
                            >
                              <option value="">Select an payment type</option>
                              {PAYMENT_TYPE_OPTIONS.map((status, index) => (
                                <option key={index} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </>
                        )}
                      />

                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.paymentType && errors?.paymentType?.message}
                      </span>
                    </div>

                    <div className="relative flex flex-1 flex-col">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="deliveryDate"
                      >
                        Delivery Date*
                      </label>
                      <input
                        id="deliveryDate"
                        type="datetime-local"
                        placeholder="Delivery Date"
                        {...register("deliveryDate", {
                          required: "DeliveryDate is required",
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-3 px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.deliveryDate &&
                          (errors?.deliveryDate?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex flex-col mb-6">
                    <div className="relative flex-1">
                      <Controller
                        name="productIds"
                        control={control}
                        rules={{ required: "Product is required" }}
                        render={({ field }) => (
                          <>
                            <label
                              className="relative text-[1.5rem] font-semibold mb-1 block"
                              htmlFor="product"
                            >
                              Products*
                            </label>
                            <Select
                              {...field}
                              id="product"
                              value={field.value}
                              onChange={(newValue: any) => {
                                field.onChange(newValue);
                              }}
                              options={productListOptions}
                              isSearchable={true}
                              isLoading={isLoading("/getProductList")}
                              isClearable={true}
                              isMulti={true}
                              className="relative font-medium outline-none text-[1.4rem] rounded-md py-2 w-[85%]"
                            />
                          </>
                        )}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.productIds &&
                          (errors?.productIds?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex flex-col mb-6">
                    <label
                      htmlFor="ShippingAddress"
                      className="relative text-[1.5rem] font-semibold mb-2"
                    >
                      ShippingAddress*
                    </label>
                    <textarea
                      id="ShippingAddress"
                      placeholder="ShippingAddress.."
                      {...register("shippingAddress", {
                        required: "ShippingAddress is required",
                      })}
                      rows={5}
                      className="relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem]"
                    />
                    <span className="relative text-red-600 font-medium mt-2">
                      {errors?.shippingAddress &&
                        (errors?.shippingAddress?.message ||
                          "Please enter valid input data")}
                    </span>
                  </div>

                  <div className="relative flex flex-col mb-6">
                    <label
                      htmlFor="BillingAddress"
                      className="relative text-[1.5rem] font-semibold mb-2"
                    >
                      BillingAddress*
                    </label>
                    <textarea
                      id="BillingAddress"
                      placeholder="BillingAddress.."
                      {...register("billingAddress", {
                        required: "BillingAddress is required",
                      })}
                      rows={5}
                      className="relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem]"
                    />
                    <span className="relative text-red-600 font-medium mt-2">
                      {errors?.billingAddress &&
                        (errors?.billingAddress?.message ||
                          "Please enter valid input data")}
                    </span>
                  </div>

                  <div className="relative flex justify-between w-[85%] gap-5">
                    <div className="relative flex-1 flex flex-col mb-6">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="Price"
                      >
                        Price*
                      </label>
                      <input
                        id="Price"
                        type="text"
                        placeholder="Unit Price"
                        {...register("unitPrice", {
                          required: "UnitPrice Price is required",
                          pattern: {
                            value: /^\d+(\.\d{1,5})?$/,
                            message: "Please enter a valid price",
                          },
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-2  px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.unitPrice &&
                          (errors?.unitPrice?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>

                    <div className="relative flex-1 flex flex-col mb-6">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="quantity"
                      >
                        Quantity*
                      </label>
                      <input
                        id="quantity"
                        type="text"
                        min={0}
                        placeholder="Actual price"
                        {...register("quantity", {
                          required: "Quantity is required",
                          pattern: {
                            value: /^\d+$/,
                            message: "Please enter a valid quantity",
                          },
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-2 px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.quantity &&
                          (errors?.quantity?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex justify-between w-[85%] gap-5">
                    <div className="relative flex-1 flex flex-col mb-6">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="subtotal"
                      >
                        Subtotal*
                      </label>
                      <input
                        id="subtotal"
                        type="text"
                        placeholder="Subtotal"
                        {...register("subtotal", {
                          required: "Subtotal is required",
                          pattern: {
                            value: /^\d+(\.\d{1,5})?$/,
                            message: "Please enter a valid price",
                          },
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-2  px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.subtotal &&
                          (errors?.subtotal?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>

                    <div className="relative flex-1 flex flex-col mb-6">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="shippingCost"
                      >
                        ShippingCost*
                      </label>
                      <input
                        id="shippingCost"
                        type="text"
                        placeholder="Shipping Cost"
                        {...register("shippingCost", {
                          required: "ShippingCost is required",
                          pattern: {
                            value: /^\d+(\.\d{1,5})?$/,
                            message: "Please enter a valid price",
                          },
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-2  px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.shippingCost &&
                          (errors?.shippingCost?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex justify-between w-[85%] gap-5">
                    <div className="relative flex-1 flex flex-col mb-6">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="totalAmount"
                      >
                        Total Amount*
                      </label>
                      <input
                        id="totalAmount"
                        type="text"
                        placeholder="Total Amount"
                        {...register("totalAmount", {
                          required: "Total Amount is required",
                          pattern: {
                            value: /^\d+(\.\d{1,5})?$/,
                            message: "Please enter a valid total Amount",
                          },
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-2 px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.totalAmount &&
                          (errors?.totalAmount?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>

                    <div className="relative flex flex-1 flex-col mb-6">
                      <label
                        className="relative text-[1.5rem] font-semibold mb-2"
                        htmlFor="trackingNumber"
                      >
                        TrackingNumber*
                      </label>
                      <input
                        id="trackingNumber"
                        type="text"
                        placeholder="TrackingNumber"
                        {...register("trackingNumber", {
                          required: "TrackingNumber is required",
                        })}
                        className={`relative border-2 border-gray-300 font-medium  py-2 px-4 outline-none text-[1.4rem] rounded-md`}
                      />
                      <span className="relative text-red-600 font-medium mt-2">
                        {errors?.trackingNumber &&
                          (errors?.trackingNumber?.message ||
                            "Please enter valid input data")}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex flex-col mb-6">
                    <label
                      htmlFor="specialInstructions"
                      className="relative text-[1.5rem] font-semibold mb-2"
                    >
                      Special Instructions
                    </label>
                    <textarea
                      id="specialInstructions"
                      placeholder="SpecialInstructions.."
                      {...register("specialInstructions")}
                      rows={4}
                      className="relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem]"
                    />
                  </div>

                  <div className="relative flex flex-col mb-6">
                    <label
                      htmlFor="orderNotes"
                      className="relative text-[1.5rem] font-semibold mb-2"
                    >
                      Order Notes
                    </label>
                    <textarea
                      id="orderNotes"
                      placeholder="OrderNotes.."
                      {...register("orderNotes")}
                      rows={4}
                      className="relative border-2 border-gray-300 font-medium  py-2 w-[85%] px-4 outline-none text-[1.4rem]"
                    />
                  </div>

                  <div className="relative flex gap-5 mt-12">
                    <button
                      type="button"
                      onClick={handleClose}
                      className={`relative border-orange-400 border-2 text-[1.5rem] px-8 py-1 rounded-md text-orange-400 hover:text-white hover:bg-orange-400 transition-all duration-300 ${
                        isLoading("/saveAdminOrder") &&
                        ` !border-gray-300 bg-gray-300 border-2 !text-white pointer-events-none`
                      }`}
                    >
                      Cancel
                    </button>

                    {isLoading("/saveAdminOrder") || !isDirty ? (
                      <button className="relative bg-gray-300 border-gray-300 pointer-events-none   border-2 text-[1.5rem] px-10 py-1 rounded-md text-white">
                        {isLoading("/saveAdminOrder") ? "Saving" : "Save"}
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
      </AdminContainer>
    </Wrapper>
  );
  return (
    <>
      <ConfirmationModal {...props} />
      <Modal open={open} content={modalContent} />;
    </>
  );
};

export default SaveOrder;
