import { Icon } from "@iconify/react";

const Navbar = () => {
  const isDark = false;
  return (
    <div className=" sticky top-0 bg-white h-[7rem] w-full shadow-xl flex justify-between items-center pr-16 z-50">
      <div className="relative w-[220px] h-full border-r-2 flex items-center pl-16">
        <h1 className="relative text-3xl font-semibold text-[#3068EC]">
          Admin portal
        </h1>
      </div>
      <div className="relative flex gap-8 text-[2.4rem]">
        {isDark ? (
          <Icon icon="ph:sun-fill" className="relative cursor-pointer" />
        ) : (
          <Icon icon="lucide:moon" className="relative cursor-pointer" />
        )}
        <Icon icon="mdi:bell" className="relative cursor-pointer" />
        <Icon icon="line-md:account" className="relative cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
