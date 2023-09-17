import { SearchBoxWrapper } from "./styled";
import NotfoundImg from "../assets/notfound.webp";
import { useNavigate } from "react-router-dom";

const SearchProduct = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="relative mt-[8rem]">
      <SearchBoxWrapper className="relative h-[300px] bg-slate-500 flex items-center justify-center">
        <div className="relative w-[80%]">
          <div className="relative text-center mb-8 text-[2.5rem] capitalize font-medium text-[#fff]">
          Search product or categories
          </div>
          <input
            className="relative border border-[#777] w-full px-8 py-7 text-[1.6rem] outline-none"
            type="text"
            placeholder="Search...."
          />
        </div>
      </SearchBoxWrapper>

      <div>
        <div className="relative flex flex-col items-center justify-center">
          <div>
            <img src={NotfoundImg} alt="notfoundImg" />
          </div>
          <div className="relative flex flex-col items-center justify-center mb-10">
            <h2 className="relative text-[2.8rem] font-semibold text-center mb-10">
              No products to show
            </h2>
            <button
              className="relative bg-[#008000] text-white px-[6rem] py-6 text-[1.6rem]"
              onClick={clickHandler}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
