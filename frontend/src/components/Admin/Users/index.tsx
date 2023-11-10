import React, { useState, useMemo, useEffect } from "react";
import Table from "../../Table";
import { Icon } from "@iconify/react";
import SaveUser from "./SaveUser";
import { Column } from "react-table";
import { UserDetails } from "../../../types/User";
import { useAPI } from "../../../hooks/useApi";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import { getAllUsers } from "../../../api";
import { isApiError } from "../../../types/Api";

const Users = () => {
  const api = useAPI();
  const [seletedDetails, setSelectedDetails] = useState<number| null>(null);
  const [, startLoading, endLoading] = useLoadingIndicator();

  const [data, setData] = useState<UserDetails[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchAllUsers = async () => {
    startLoading("/getAllUsers");
    try {
      const res = await getAllUsers(api);
      if (!isApiError(res)) {
        setData(res);
      }
    } finally {
      endLoading("/getContactDetailList");
    }
  };

  const handleClose=()=>{
    setSelectedDetails(null);
    setOpenModal(false);
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = useMemo<Column<UserDetails>[]>(
    () => [
      {
        Header: "Firstname",
        accessor: "firstName",
        Cell: ({ cell }): JSX.Element => {
          return (
            <div
              className="relative cursor-pointer font-medium text-black hover:text-blue-500"
              onClick={() => {
                setSelectedDetails(cell.row.original.id);
                setOpenModal(true);
              }}
            >
              {cell.row.original.firstName}
            </div>
          );
        },
      },
      { Header: "Lastname", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      { Header: "PhoneNumber", accessor: "phoneNumber" },
      { Header: "Role", accessor: "role" },
    ],
    []
  );


  return (
    <React.Fragment>
      <SaveUser
        selectedId={seletedDetails}
        open={openModal}
        close={handleClose}
      />

      <div className="relative">
        <div className="relative flex justify-between items-center mb-10">
          <div className="relative text-[2.4rem] font-semibold capitalize">
            Users list ({data.length})
          </div>
          <div>
            <button
              onClick={() => setOpenModal(true)}
              className="relative flex gap-3 items-center bg-[#3068ec] text-white px-12 py-4 text-[1.4rem] rounded-md font-medium capitalize"
            >
              <Icon className="text-[1.8rem]" icon="ic:baseline-plus" />
              <span>Create admin</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Table data={data} columns={columns} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Users;
