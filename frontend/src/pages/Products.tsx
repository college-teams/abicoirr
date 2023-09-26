import Product1 from "../assets/card3.jpg";
import Product2 from "../assets/card4.jpg";
import Product3 from "../assets/card5.jpg";
import Product4 from "../assets/card6.jpg";
import Product5 from "../assets/card7.jpeg";
import { CardProps } from "../types/Card";
import PageImg from "../assets/productsPageImg.jpeg";
import Card from "../components/Card";
import { useAPI } from "../hooks/useApi";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";
import { getCategoryList } from "../api";
import { isApiError } from "../types/Api";
import { useEffect, useState } from "react";
import GifLoader from "../components/Loader/GifLoader";
import { CategoryList } from "../types/Admin";
import { CategoryListContainer, ProductListContainer } from "./styled";

const tempPopularProducts: CardProps[] = [
  {
    name: "Coco peat",
    image: Product1,
    price: "20.00",
    buttonText: "Shop now",
  },
  {
    name: "Wet coco peat",
    image: Product2,
    price: "20.00",
    buttonText: "Shop now",
  },
  {
    name: "dry coco peat",
    image: Product3,
    price: "20.00",
    buttonText: "Shop now",
  },
  {
    name: "wet with dry peat",
    image: Product4,
    price: "20.00",
    buttonText: "Shop now",
  },
  { name: "product5", image: Product5, price: "20.00", buttonText: "Shop now" },
];

const Products = () => {
  const api = useAPI();
  const [loading, startLoading, endLoading] = useLoadingIndicator();

  // States
  const [categoryLists, setCategoryLists] = useState<CategoryList[]>([]);

  const fetchCategoryList = async () => {
    startLoading("/getCategoryList");
    try {
      const res = await getCategoryList(api);
      if (!isApiError(res)) {
        setCategoryLists(res);
      }
    } finally {
      endLoading("/getCategoryList");
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div>
      {loading && <GifLoader />}

      <div className="relative mt-[8rem]">
        <div className="relative w-[95%] m-auto">
          <img
            className="relative w-full h-full object-cover"
            src={PageImg}
            alt="productPageImg"
          />
        </div>
        <div className="flex gap-20 w-[90%] mt-[6rem] mb-[6rem] mx-auto">

          <div className="w-[20%] sticky top-[8rem]  h-screen  hidden lg:block ">
            <p className="relative text-[2.6rem] font-semibold mb-[4rem]">
              Categories
            </p>
            <CategoryListContainer className="border-r-2 pr-12">
              {categoryLists &&
                categoryLists.map((e, index) => (
                  <div
                    key={index}
                    className="flex justify-between cursor-pointer text-black/60 hover:text-black text-[1.5rem] font-medium mb-6"
                  >
                    <span>{e.categoryName}</span>
                    <span>{Math.round(Math.random() * 16 + 20)}</span>
                  </div>
                ))}
            </CategoryListContainer>
          </div>

          <div className="relative flex-1">
            <p className="relative text-[1.4rem] mb-8 font-medium text-black/60 mt-[5rem]">
              Showing all 52 result(s)
            </p>
            <ProductListContainer className="">
              {Array.from({ length: 3 }).map((_, repetitionIndex) =>
                tempPopularProducts.map((e, i) => (
                  <Card
                    key={repetitionIndex + "" + i}
                    {...e}
                  />
                ))
              )}
            </ProductListContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
