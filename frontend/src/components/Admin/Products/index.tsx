import React, { useState, useMemo, useEffect } from "react";
import Table from "../../Table";
import { deleteProduct, getProductList } from "../../../api";
import { useAPI } from "../../../hooks/useApi";
import { isApiError } from "../../../types/Api";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import useToast from "../../../hooks/useToast";
import { Column } from "react-table";
import { Icon } from "@iconify/react";
import { ConfirmationModal } from "../../ConfirmModal";
import { useConfirmModal } from "../../../hooks/useConfirmModal";
import { Product } from "../../../types/Admin";
import SaveProductDetails from "./SaveProduct";

const Products = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [data, setData] = useState<Product[]>([]);
  const [seletedProductId, setSeletedProductId] = useState<number | null>(null);

  const api = useAPI();
  const showToast = useToast();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();
  const [props, activateConfirmModal] = useConfirmModal();

  const fetchProductList = async () => {
    startLoading("/getProductList");
    try {
      const res = await getProductList(api);
      if (!isApiError(res)) {
        setData(res);
      }
    } finally {
      endLoading("/getProductList");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSeletedProductId(null);
  };

  const deleteCategoryDetails = async (categoryId: number) => {
    if (
      !(await activateConfirmModal(
        "Do you want to delete this product ? This is irreversible action!!"
      ))
    ) {
      return;
    }

    startLoading("/deleteProduct");
    try {
      const res = await deleteProduct(api, categoryId);

      if (!res || !isApiError(res)) {
        showToast("product deleted successfully", "success");
        fetchProductList();
      }
    } finally {
      endLoading("/deleteProduct");
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const columns = useMemo<Column<Product>[]>(
    () => [
      {
        Header: "Name",
        accessor: "productName",
        Cell: ({ cell }): JSX.Element => {
          return (
            <div
              className="relative cursor-pointer font-medium text-black hover:text-blue-500"
              onClick={() => {
                setSeletedProductId(cell.row.original.id);
                setOpenModal(true);
              }}
            >
              {cell.row.original.productName}
            </div>
          );
        },
      },
      { Header: "Price", accessor: "price" },
      { Header: "Stock Quantity", accessor: "stockQuantity" },
      {
        Header: "Category",
        accessor: "category",
        Cell: ({ cell }) => {
          return cell.row.original.category.categoryName;
        },
      },
      {
        Header: "Action",
        Cell: ({ cell }): JSX.Element => {
          return (
            <Icon
              onClick={() => {
                deleteCategoryDetails(cell.row.original.id);
              }}
              icon="material-symbols:delete-outline"
              className="h-[20px] w-[20px] cursor-pointer"
            />
          );
        },
      },
    ],
    []
  );
  
  return (
    <React.Fragment>
      <ConfirmationModal {...props} />

      <SaveProductDetails
        selectedId={seletedProductId}
        open={openModal}
        close={handleClose}
        refreshList={fetchProductList}
      />

      <div className="relative">
        <div className="relative flex justify-between items-center mb-10">
          <div className="relative text-[2.4rem] font-semibold capitalize">
            Product list ({data.length})
          </div>
          <div>
            <button
              onClick={() => setOpenModal(true)}
              className="relative flex gap-3 items-center bg-[#3068ec] text-white px-12 py-4 text-[1.4rem] rounded-md font-medium capitalize"
            >
              <Icon className="text-[1.8rem]" icon="ic:baseline-plus" />
              <span>Create product</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Table
            data={data}
            columns={columns}
            loading={
              isLoading("/getProductList") || isLoading("/deleteProduct")
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Products;
