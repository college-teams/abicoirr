import React, { useState, useMemo, useEffect } from "react";
import Table from "../../Table";
import Details from "./Details";
import { getContactDetailList } from "../../../api";
import { useAPI } from "../../../hooks/useApi";
import { isApiError } from "../../../types/Api";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import { Column } from "react-table";
import { ContactDetailsList } from "../../../types/Admin";

interface QueriesProps {
  updateUnReadMessageCount: () => Promise<void>;
}

const Queries = ({ updateUnReadMessageCount }: QueriesProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [data, setData] = useState<ContactDetailsList[]>([]);
  const [seletedDetails, setSelectedDetails] = useState<number>();

  const api = useAPI();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();

  const fetchContactDetailList = async () => {
    startLoading("/getContactDetailList");
    try {
      const res = await getContactDetailList(api);
      if (!isApiError(res)) {
        setData(res);
      }
    } finally {
      endLoading("/getContactDetailList");
    }
  };

  useEffect(() => {
    fetchContactDetailList();
  }, []);

  const columns = useMemo<Column<ContactDetailsList>[]>(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }): JSX.Element => {
          return (
            <div
              className="relative cursor-pointer font-medium text-blue-500"
              onClick={() => {
                setSelectedDetails(cell.row.original.id);
                setOpenModal(true);
              }}
            >
              {cell.row.original.name}
            </div>
          );
        },
      },
      { Header: "Email", accessor: "email" },
      { Header: "PhoneNumber", accessor: "phoneNumber" },
    ],
    []
  );

  return (
    <React.Fragment>
      <Details
        updateUnReadMessageCount={updateUnReadMessageCount}
        selectedId={seletedDetails}
        open={openModal}
        close={() => setOpenModal(false)}
      />

      <div className="relative">
        <div className="relative flex justify-between items-center mb-10">
          <div className="relative text-[2.4rem] font-semibold capitalize">
            Contact Details ({data.length})
          </div>
        </div>

        <div className="relative">
          <Table
            data={data}
            columns={columns}
            loading={isLoading("/getContactDetailList")}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Queries;
