import { Icon } from "@iconify/react";
import { SidebarList, SidebarWrapper } from "./styled";
import { TabType } from "../../../types/Admin";

type SidebarProps = {
  handleTabSwitch: (tabName: TabType) => void;
};

const Sidebar = ({ handleTabSwitch }: SidebarProps) => {
  const changeTab = (tabName: TabType): void => {
    handleTabSwitch(tabName);
  };

  return (
    <SidebarWrapper className=" sticky top-[7rem] bg-white shadow-xl h-screen w-[220px] border">
      <ul className="relative w-[inherit] my-6">
        <SidebarList
          onClick={() => changeTab("dashboard")}
          className="relative flex items-center gap-5 w-[90%] mx-auto mb-5 text-[1.8rem] px-4 rounded-md py-4 cursor-pointer hover:bg-[#E7F0FD] hover:!text-[#3068EC] ease-in-out"
        >
          <Icon className="icon text-[#B0B6C7]" icon="ic:round-dashboard" />
          <span className="relative font-semibold text-[1.4rem]">
            Dashboard
          </span>
        </SidebarList>
        <SidebarList
          onClick={() => changeTab("users")}
          className="relative flex items-center gap-5 w-[90%] mx-auto mb-5 text-[1.8rem] px-4 rounded-md py-4 cursor-pointer hover:bg-[#E7F0FD] hover:!text-[#3068EC] ease-in-out"
        >
          <Icon className="icon text-[#B0B6C7] " icon="mdi:users" />
          <span className="relative font-semibold text-[1.4rem]">Users</span>
        </SidebarList>
        <SidebarList
          onClick={() => changeTab("products")}
          className="relative flex items-center gap-5 w-[90%] mx-auto mb-5 text-[1.8rem] px-4 rounded-md py-4 cursor-pointer hover:bg-[#E7F0FD] hover:!text-[#3068EC] ease-in-out"
        >
          <Icon className="icon text-[#B0B6C7] " icon="teenyicons:bag-solid" />
          <span className="relative font-semibold text-[1.4rem]">Products</span>
        </SidebarList>
        <SidebarList
          onClick={() => changeTab("category")}
          className="relative flex items-center gap-5 w-[90%] mx-auto mb-5 text-[1.8rem] px-4 rounded-md py-4 cursor-pointer hover:bg-[#E7F0FD] hover:!text-[#3068EC] ease-in-out"
        >
          <Icon
            className="text-[#B0B6C7]"
            icon="streamline:interface-hierarchy-2-node-organization-links-structure-link-nodes-network-hierarchy"
          />
          <span className="relative font-semibold text-[1.4rem]">
            Categories
          </span>
        </SidebarList>
        <SidebarList
          onClick={() => changeTab("orders")}
          className="relative flex items-center gap-5 w-[90%] mx-auto mb-5 text-[1.8rem] px-4 rounded-md py-4 cursor-pointer hover:bg-[#E7F0FD] hover:!text-[#3068EC] ease-in-out"
        >
          <Icon className="icon text-[#B0B6C7] " icon="gridicons:cart" />
          <span className="relative font-semibold text-[1.4rem]">Orders</span>
        </SidebarList>
        <SidebarList
          onClick={() => changeTab("queries")}
          className="relative flex items-center gap-5 w-[90%] mx-auto mb-5 text-[1.8rem] px-4 rounded-md py-4 cursor-pointer hover:bg-[#E7F0FD] hover:!text-[#3068EC] ease-in-out"
        >
          <Icon className="icon text-[#B0B6C7] " icon="ri:message-2-fill" />
          <span className="relative font-semibold text-[1.4rem]">Queries</span>
        </SidebarList>
        <SidebarList
          onClick={() => changeTab("stats")}
          className="relative flex items-center gap-5 w-[90%] mx-auto mb-5 text-[1.8rem] px-4 rounded-md py-4 cursor-pointer hover:bg-[#E7F0FD] hover:!text-[#3068EC] ease-in-out"
        >
          <Icon className="icon text-[#B0B6C7] " icon="gridicons:cart" />
          <span className="relative font-semibold text-[1.4rem]">stats</span>
        </SidebarList>
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
