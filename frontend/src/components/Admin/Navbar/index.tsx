import { Icon } from "@iconify/react";
import { TabType } from "../../../types/Admin";
import { useAppDispatch } from "../../../store/configureStore";
import { Link } from "react-router-dom";
import { setAdminStatus } from "../../../store/slices/user";
import { useEffect, useState } from "react";

type NavbarProps = {
  handleTabSwitch: (tabName: TabType) => void;
  unReadMessageCount: number;
};

const Navbar = (props: NavbarProps) => {
  const dispatch = useAppDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  // const [shoeAuth, setShowAuth] = useState(false);
  const [isLoggedIn] = useState(true);

  const handleDropdown = (e: React.MouseEvent) => {
    if (isLoggedIn) {
      setShowDropDown((pre) => !pre);
    } else {
      // setShowAuth(true);
    }
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (showDropDown) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropDown]);

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
        <Icon
          icon="line-md:account"
          className="relative cursor-pointer"
          onClick={handleDropdown}
        />
        {showDropDown && (
          <div className="dropdown absolute right-0  w-[180px] top-[4rem] bg-white shadow-xl border rounded-lg">
            <ul className="relative text-[1.5rem] w-full">
              <Link to={"/"}>
                <li
                  onClick={() => dispatch(setAdminStatus())}
                  className="relative text-center w-full py-5 hover:bg-slate-300 border-b-2 text-black"
                  style={{ fontWeight: 600 }}
                >
                  User
                </li>
              </Link>
              <li
                className="relative text-center w-full py-5 hover:bg-slate-300 text-black"
                style={{ fontWeight: 600 }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
