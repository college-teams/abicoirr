import { Icon } from "@iconify/react";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { useAPI } from "../../../hooks/useApi";
import { useLoadingIndicator } from "../../../hooks/useLoadingIndicator";
import { useEffect, useState } from "react";
import { DashboardEntityItemsCount } from "../../../types/Dashboard";
import { getDashboardEntityItemsCount } from "../../../api";
import { isApiError } from "../../../types/Api";
import Loader from "../../Loader";

const Dashboard = (): JSX.Element => {
  const api = useAPI();
  const [, startLoading, endLoading, isLoading] = useLoadingIndicator();

  // States
  const [entityItemsCount, setEntityItemsCount] =
    useState<DashboardEntityItemsCount>();

  const fetchEntityItemsCount = async () => {
    startLoading("/getDashboardEntityItemsCount");
    try {
      const res = await getDashboardEntityItemsCount(api);
      if (!isApiError(res)) {
        setEntityItemsCount(res);
      }
    } finally {
      endLoading("/getDashboardEntityItemsCount");
    }
  };

  // Api calls
  useEffect(() => {
    fetchEntityItemsCount();
  }, []);

  return (
    <div className="relative ">
      <div className="relative flex items-center justify-between flex-wrap gap-2">
        <div className="relative bg-[#62DBBC] h-[120px] w-[300px] flex items-center  px-10 gap-8 text-white rounded-xl">
          <div className="relative h-[70px] w-[70px] bg-[#4EAF97] rounded-full flex items-center justify-center text-[2.6rem] ">
            <Icon className="" icon="mdi:users" />
          </div>
          <div className="relative flex flex-col gap-2 text-[1.7rem] capitalize">
            <span className=" font-medium">Total Users</span>
            <span className="relative text-[2rem] font-semibold">
              {isLoading("/getDashboardEntityItemsCount") ? (
                <Loader />
              ) : (
                entityItemsCount?.users || 0
              )}
            </span>
          </div>
        </div>

        <div className="relative bg-[#EE667F] h-[120px] w-[300px] flex items-center  px-10 gap-8 text-white rounded-xl">
          <div className="relative h-[70px] w-[70px] bg-[#C95266] rounded-full flex items-center justify-center text-[2.6rem] ">
            <Icon icon="streamline:interface-hierarchy-2-node-organization-links-structure-link-nodes-network-hierarchy" />
          </div>
          <div className="relative flex flex-col gap-2 text-[1.7rem] capitalize">
            <span className=" font-medium">Total Categories</span>
            <span className="relative text-[2rem] font-semibold">
              {isLoading("/getDashboardEntityItemsCount") ? (
                <Loader />
              ) : (
                entityItemsCount?.categories || 0
              )}
            </span>
          </div>
        </div>

        <div className="relative bg-[#F8BC61] h-[120px] w-[300px] flex items-center  px-10 gap-8 text-white rounded-xl">
          <div className="relative h-[70px] w-[70px] bg-[#CE984D] rounded-full flex items-center justify-center text-[2.6rem] ">
            <Icon icon="teenyicons:bag-solid" />
          </div>
          <div className="relative flex flex-col gap-2 text-[1.7rem] capitalize">
            <span className=" font-medium">Total Products</span>
            <span className="relative text-[2rem] font-semibold">
              {isLoading("/getDashboardEntityItemsCount") ? (
                <Loader />
              ) : (
                entityItemsCount?.products || 0
              )}
            </span>
          </div>
        </div>

        <div className="relative bg-[#54A1F8] h-[120px] w-[300px] flex items-center  px-10 gap-8 text-white rounded-xl">
          <div className="relative h-[70px] w-[70px] bg-[#4082CB] rounded-full flex items-center justify-center text-[2.6rem] ">
            <Icon icon="gridicons:cart" />
          </div>
          <div className="relative flex flex-col gap-2 text-[1.7rem] capitalize">
            <span className=" font-medium">Total Orders</span>
            <span className="relative text-[2rem] font-semibold">
              {isLoading("/getDashboardEntityItemsCount") ? (
                <Loader />
              ) : (
                entityItemsCount?.adminOrders || 0
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="relative flex flex-col gap-11 w-full  mt-24">
        <div className="relative px-6 py-6 bg-white flex items-center justify-center">
          <BarChart />
        </div>
        <div className="relative  px-6 py-6 bg-white flex items-center justify-center">
          <LineChart />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
