import React, { useState, useMemo, useEffect } from "react";
import Table from "../../Table";
import { Icon } from "@iconify/react";
import SaveOrder from "./SaveOrder";
import { AdminOrderResponseData } from "../../../types/Admin";
import { getAdminOrders } from "../../../api";
import { useAPI } from "../../../hooks/useApi";
import { isApiError } from "../../../types/Api";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import { Column } from "react-table";
import { format } from "date-fns";

const Orders = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [data, setData] = useState<AdminOrderResponseData[]>([]);
  const api = useAPI();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();

  // states
  const [seletedOrderId, setSeletedOrderId] = useState<number | null>(null);

  const fetchAdminOrders = async () => {
    startLoading("/getAdminOrders");
    try {
      const res = await getAdminOrders(api);
      if (!isApiError(res)) {
        setData(res);
      }
    } finally {
      endLoading("/getAdminOrders");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSeletedOrderId(null);
  };

  useEffect(() => {
    fetchAdminOrders();
  }, []);

  const columns = useMemo<Column<AdminOrderResponseData>[]>(
    () => [
      {
        Header: "Order_id",
        accessor: "id",
        Cell: ({ cell }): JSX.Element => {
          return (
            <div
              className="relative cursor-pointer font-medium text-black hover:text-blue-500"
              onClick={() => {
                setSeletedOrderId(cell.row.original.id);
                setOpenModal(true);
              }}
            >
              {cell.row.original.id}
            </div>
          );
        },
      },
      { Header: "OrderStatus", accessor: "orderStatus" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Total", accessor: "totalAmount" },
      {
        Header: "Delivery date",
        accessor: "deliveryDate",
        Cell: ({ value }): string => format(new Date(value), "yyyy-mm-dd"),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <SaveOrder
        open={openModal}
        close={handleClose}
        refreshList={fetchAdminOrders}
        selectedId={seletedOrderId}
      />

      <div className="relative">
        <div className="relative flex justify-between items-center mb-10">
          <div className="relative text-[2.4rem] font-semibold capitalize">
            Orders list ({data.length})
          </div>
          <div>
            <button
              onClick={() => setOpenModal(true)}
              className="relative flex gap-3 items-center bg-[#3068ec] text-white px-12 py-4 text-[1.4rem] rounded-md font-medium capitalize"
            >
              <Icon className="text-[1.8rem]" icon="ic:baseline-plus" />
              <span>Create order</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Table
            data={data}
            columns={columns}
            loading={isLoading("/getAdminOrders")}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Orders;
