import { Fragment, useState, useEffect } from "react";
import Sidebar from "../components/Admin/Sidebar";
import { TabComponentType, TabType } from "../types/Admin";
import Dashboard from "../components/Admin/Dashboard";
import Products from "../components/Admin/Products";
import Orders from "../components/Admin/Orders";
import Category from "../components/Admin/Category";
import Stats from "../components/Admin/Stats";
import Queries from "../components/Admin/Queries";
import Users from "../components/Admin/Users";
import Navbar from "../components/Admin/Navbar";
import { getUnReadMessageCount } from "../api";
import { useAPI } from "../hooks/useApi";
import { isApiError } from "../types/Api";

const AdminHome = () => {
  const api = useAPI();

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [unReadQueriesCount, setUnReadQueriesCount] = useState<number>(0);

  const handleTabSwitch = (tabName: TabType): void => {
    setActiveTab(tabName);
  };

  const fetchUnReadMessageCount = async () => {
    console.log("CALLED");
    
    const res = await getUnReadMessageCount(api);
    if (!isApiError(res)) {
      setUnReadQueriesCount(res.count);
    }
  };

  useEffect(() => {
    fetchUnReadMessageCount();
  }, []);

  const TabComponent: TabComponentType = {
    dashboard: <Dashboard />,
    orders: <Orders />,
    category: <Category  />,
    stats: <Stats />,
    users: <Users />,
    products: <Products />,
    queries: <Queries updateUnReadMessageCount={fetchUnReadMessageCount} />,
  };

  return (
    <Fragment>
      <Navbar
        unReadMessageCount={unReadQueriesCount}
        handleTabSwitch={handleTabSwitch}
      />
      <div className="relative flex">
        <Sidebar handleTabSwitch={handleTabSwitch} />
        <div className="relative bg-[#e8e8e8] w-full">
          <main className="relative px-12 py-12">
            {TabComponent[activeTab]}
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminHome;
