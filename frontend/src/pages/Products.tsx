import NoImage from "/assets/noImage.png";
import PageImg from "/assets/productsPageImg.jpeg";
import Card from "../components/Card";
import { useAPI } from "../hooks/useApi";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";
import { getCategoryList, getCategoryProducts, getProductList } from "../api";
import { isApiError } from "../types/Api";
import { useEffect, useState } from "react";
import GifLoader from "../components/Loader/GifLoader";
import category1 from "/assets/category1.webp";
import category2 from "/assets/category2.webp";
import category3 from "/assets/category3.webp";
import category4 from "/assets/category4.webp";
import category5 from "/assets/category5.webp";
import { CategoryList, Product } from "../types/Admin";
import { CategoryListContainer, ProductListContainer } from "./styled";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const api = useAPI();
  const [loading, startLoading, endLoading] = useLoadingIndicator();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");

  // States
  const [categoryLists, setCategoryLists] = useState<CategoryList[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [totalCategoryProducts, setTotalCategoryProducts] = useState<number>(0);

  const categoryImages = [category2,category3,category4,category5];

  const fetchCategoryList = async () => {
    startLoading("/getCategoryList");
    try {
      const res = await getCategoryList(api);
      if (!isApiError(res)) {
        setCategoryLists(res);
        setTotalCategoryProducts(
          res.reduce((acc, val) => {
            return acc + val.count;
          }, 0)
        );
      }
    } finally {
      endLoading("/getCategoryList");
    }
  };

  const fetchProductList = async () => {
    startLoading("/getProductList");
    try {
      const res = await getProductList(api);
      if (!isApiError(res)) {
        setProductList(res);
      }
    } finally {
      endLoading("/getProductList");
    }
  };

  const fetchCategoryProductList = async () => {
    startLoading("/getCategoryProducts");
    try {
      const res = await getCategoryProducts(api, Number(categoryId), 0, []);
      if (!isApiError(res)) {
        setProductList(res);
      }
    } finally {
      endLoading("/getCategoryProducts");
    }
  };

  const handleCategorySelection = (categoryId: number | null = null) => {
    if (categoryId) {
      navigate(`/products?categoryId=${categoryId}`);
    } else {
      navigate(`/products`);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryProductList();
    } else {
      fetchProductList();
    }
  }, [categoryId]);

  return (
    <div>
      {loading && <GifLoader />}

      <div className="relative mt-[8rem]">
        <div className="relative w-full lg:w-[95%] m-auto">
          <img
            className="relative w-full h-full object-cover"
            src={PageImg}
            alt="productPageImg"
          />
        </div>

        {/* Mobile screens */}
        <div className="relative flex flex-col flex-wrap gap-10  mt-[4rem] px-14 lg:hidden">
          <div className="relative flex gap-x-8 gap-y-8 flex-wrap  items-center">
            <div
              onClick={() => handleCategorySelection()}
              className="relative flex items-center justify-center flex-col cursor-pointer"
            >
              <div className="relative h-[75px] w-[75px] rounded-full overflow-hidden  mb-7">
                <img
                  className="relative h-full w-full object-cover"
                  src={category1}
                  alt={"All categories"}
                />
              </div>
              <div className="relative break-words font-semibold text-2xl text-center w-[100px]">
                {"All categories"}
              </div>
            </div>
            {categoryLists &&
              categoryLists.map((e, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleCategorySelection(e.id)}
                    className="relative flex items-center justify-center flex-col cursor-pointer"
                  >
                    <div className="relative h-[75px] w-[75px] rounded-full overflow-hidden  mb-7">
                      <img
                        className="relative h-full w-full object-cover"
                        src={categoryImages[Math.floor(Math.random() * categoryImages.length)]}
                        alt={e.categoryName}
                      />
                    </div>
                    <div className="relative break-words font-semibold text-2xl text-center w-[100px] capitalize">
                      {e.categoryName}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
{/* Desktop screens */}
        <div className="flex gap-20 w-[90%] lg:mt-[6rem] mb-[6rem] mx-auto">
          <div className="w-[20%] sticky top-[8rem] max-h-screen  hidden lg:block ">
            <p className="relative text-[2.6rem] font-semibold mb-[4rem]">
              Categories
            </p>
            <CategoryListContainer className="border-r-2 pr-12">
              <div
                onClick={() => handleCategorySelection()}
                className={`flex ${
                  !Number(categoryId || 0)
                    ? "font-semibold !text-black/100"
                    : ""
                } justify-between cursor-pointer text-black/60 hover:text-black text-[1.5rem] font-medium mb-6`}
              >
                <span className="relative w-[80%]">{"All categories"}</span>
                <span>{totalCategoryProducts}</span>
              </div>

              {categoryLists &&
                categoryLists.map((e, index) => (
                  <div
                    onClick={() => handleCategorySelection(e.id)}
                    key={index}
                    className={`flex text-black/60  ${
                      e.id == Number(categoryId || 0)
                        ? "font-semibold !text-black/100"
                        : ""
                    } justify-between cursor-pointer  hover:text-black text-[1.5rem] font-medium mb-6`}
                  >
                    <span className="relative w-[80%]">{e.categoryName}</span>
                    <span>{e.count}</span>
                  </div>
                ))}
            </CategoryListContainer>
          </div>

          <div className="relative flex-1">
            <p className="relative text-[1.4rem] mb-8 font-medium text-black/60 mt-[5rem]">
              Showing all {productList.length} result(s)
            </p>
            <ProductListContainer className="">
              {productList.map((e, i) => {
                const image =
                  e.images.length > 0 ? e.images[0].imagePath : NoImage;
                return (
                  <Card
                    key={i}
                    id={e.id}
                    name={e.productName}
                    sellingPrice={e.sellingPrice}
                    actualPrice={e.actualPrice}
                    image={image}
                    stockQuantity={e.stockQuantity}
                    externalSites={e.links}
                    buttonText={"Shop now"}
                  />
                );
              })}
            </ProductListContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
