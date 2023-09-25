import { Icon } from "@iconify/react";
import { TabType } from "../../../types/Admin";

type NavbarProps = {
  handleTabSwitch: (tabName: TabType) => void;
  unReadMessageCount: number;
};

const Navbar = (props: NavbarProps) => {
  return (
    <div className=" sticky top-0 bg-white h-[7rem] w-full shadow-xl flex justify-between items-center pr-16 z-50">
      <div className="relative w-[220px] h-full border-r-2 flex items-center pl-16">
        <h1 className="relative text-3xl font-semibold text-[#3068EC]">
          Admin portal
        </h1>
      </div>
      <div className="relative flex gap-8 text-[2.4rem]">
        <span
          className="relative cursor-pointer"
          onClick={() => props.handleTabSwitch("queries")}
        >
          {props.unReadMessageCount !== 0 && (
            <span className="absolute text-sm bg-red-600 text-white rounded-full h-[2rem] w-[2rem] z-50 flex items-center justify-center -top-3 -right-2 font-semibold">
              <span className="relative leading-[0px]">
                {props.unReadMessageCount}
              </span>
            </span>
          )}

          <Icon icon="mdi:bell" />
        </span>
        <Icon icon="line-md:account" className="relative cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
