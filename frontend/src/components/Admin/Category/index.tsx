import React, { useState, useMemo, useEffect } from "react";
import Table from "../../Table";
import SaveCategory from "./SaveCategory";
import { deleteCategory, getCategoryList } from "../../../api";
import { useAPI } from "../../../hooks/useApi";
import { isApiError } from "../../../types/Api";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import useToast from "../../../hooks/useToast";
import { Column } from "react-table";
import { Icon } from "@iconify/react";
import { GetCategory } from "../../../types/Admin";
import { ConfirmationModal } from "../../ConfirmModal";
import { useConfirmModal } from "../../../hooks/useConfirmModal";

const Category = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [data, setData] = useState<GetCategory[]>([]);
  const [seletedDetails, setSelectedDetails] = useState<number | null>(null);

  const api = useAPI();
  const showToast = useToast();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();
  const [props, activateConfirmModal] = useConfirmModal();

  const fetchCategoryList = async () => {
    startLoading("/getCategoryList");
    try {
      const res = await getCategoryList(api);
      if (!isApiError(res)) {
        setData(res);
      }
    } finally {
      endLoading("/getCategoryList");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedDetails(null);
  };

  const deleteCategoryDetails = async (categoryId: number) => {
    if (
      !(await activateConfirmModal(
        "Do you want to delete this category ? This is irreversible action!!"
      ))
    ) {
      return;
    }

    startLoading("/deleteCategory");
    try {
      const res = await deleteCategory(api, categoryId);

      if (!res || !isApiError(res)) {
        showToast("Contact details deleted successfully", "success");
        fetchCategoryList();
      }
    } finally {
      endLoading("/deleteCategory");
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const columns = useMemo<Column<GetCategory>[]>(
    () => [
      {
        Header: "Image",
        accessor: "imagePath",
        Cell: ({ cell }): JSX.Element => {
          return (
            <div className="relative h-[40px] w-[40px] overflow-hidden">
              <img
                className="relative h-full w-full  object-cover"
                src={cell.row.original.imagePath}
                alt={cell.row.original.categoryName}
              />
            </div>
          );
        },
        disableSortBy: true,
      },
      {
        Header: "Name",
        accessor: "categoryName",
        Cell: ({ cell }): JSX.Element => {
          return (
            <div
              className="relative cursor-pointer font-medium text-black hover:text-blue-500"
              onClick={() => {
                setSelectedDetails(cell.row.original.id);
                setOpenModal(true);
              }}
            >
              {cell.row.original.categoryName}
            </div>
          );
        },
      },
      { Header: "Description", accessor: "categoryDescription" },
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

      <SaveCategory
        selectedId={seletedDetails}
        open={openModal}
        close={handleClose}
        refreshList={fetchCategoryList}
      />

      <div className="relative">
        <div className="relative flex justify-between items-center mb-10">
          <div className="relative text-[2.4rem] font-semibold capitalize">
            category list ({data.length})
          </div>
          <div>
            <button
              onClick={() => setOpenModal(true)}
              className="relative flex gap-3 items-center bg-[#3068ec] text-white px-12 py-4 text-[1.4rem] rounded-md font-medium capitalize"
            >
              <Icon className="text-[1.8rem]" icon="ic:baseline-plus" />
              <span>Create category</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Table
            data={data}
            columns={columns}
            loading={
              isLoading("/getCategoryList") || isLoading("/deleteCategory")
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
