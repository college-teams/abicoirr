import { useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import { TabComponentType, TabType } from "../types/Admin";
import Dashboard from "../components/Admin/Dashboard";
import Products from "../components/Admin/Products";
import Orders from "../components/Admin/Orders";
import Category from "../components/Admin/Category";
import Stats from "../components/Admin/Stats";
import Queries from "../components/Admin/Queries";
import Users from "../components/Admin/Users";

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const handleTabSwitch = (tabName: TabType): void => {
    setActiveTab(tabName);
  };

  const TabComponent: TabComponentType = {
    dashboard: <Dashboard />,
    orders: <Orders />,
    category: <Category />,
    stats: <Stats />,
    users: <Users />,
    products: <Products />,
    queries: <Queries />,
  };

  return (
    <div className="relative flex">
      <Sidebar handleTabSwitch={handleTabSwitch} />
      <div className="relative bg-[#e8e8e8] w-full">
        <main className="relative px-12 py-12">{TabComponent[activeTab]}</main>
      </div>
    </div>
  );
};

export default AdminHome;
