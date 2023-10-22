import React, { useEffect, useState } from "react";
import NoImage from "/assets/noImage.png";
import Card from "../components/Card";
import RedirectSite from "../components/RedirectSite";
import GifLoader from "../components/Loader/GifLoader";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryProducts, getProductById } from "../api";
import { useAPI } from "../hooks/useApi";
import { isApiError } from "../types/Api";
import { Product, ProductImages } from "../types/Admin";
import { SubImagesContainer } from "./styled";
import { calculateDiscountPercentage } from "../utils";
import ImageWithFallback from "../utils/ImageWithFallback";
import BulkOrder from "../components/BulkOrder";

const ProductDetail = () => {
  const api = useAPI();
  const { productId } = useParams();

  const [loading, startLoading, endLoading] = useLoadingIndicator();
  const navigate = useNavigate();

  // states
  const [redirect, setRedirect] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [relatedProductList, setRelatedProductList] = useState<Product[]>([]);
  const [primaryImage, setPrimaryImage] = useState<ProductImages | null>();
  const [quantity, setQuantity] = useState<number>(1);
  const [openBulkOrderModal, setOpenBulkOrderModaltate] = useState(false);

  type QUANTITY_ACTIONS = "Add" | "REMOVE";

  const fetchProductDetails = async () => {
    startLoading("/getProductById");
    try {
      const res = await getProductById(api, Number(productId));
      if (!isApiError(res)) {
        setProduct(res);
        if (res.images.length > 0) {
          const { imageKey, imagePath } = res.images[0];
          handleImageChangehandler(imageKey, imagePath);
        }

        fetchCategoryProductList(res.category.id);
      } else {
        navigate(`/products`);
      }
    } finally {
      endLoading("/getProductById");
    }
  };

  const fetchCategoryProductList = async (categoryId: number) => {
    startLoading("/getCategoryProducts");
    try {
      const res = await getCategoryProducts(api, categoryId, 4, [
        Number(productId),
      ]);
      if (!isApiError(res)) {
        setRelatedProductList(res);
      }
    } finally {
      endLoading("/getCategoryProducts");
    }
  };

  const handleImageChangehandler = (imageKey: string, imagePath: string) => {
    setPrimaryImage({ imageKey, imagePath });
  };

  const quantityHandler = (action: QUANTITY_ACTIONS): void => {
    if (action === "Add") {
      setQuantity((pre) => pre + 1);
    } else if (action === "REMOVE") {
      if (quantity !== 0) {
        setQuantity((pre) => pre - 1);
      }
    }
  };

  const orderPlacinghandler = (): void => {
    if (product && quantity > product?.maxOrder) {
      setOpenBulkOrderModaltate(true);
    } else {
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (productId) {
      setPrimaryImage(null);
      setQuantity(1);
      fetchProductDetails();
    }
  }, [productId]);

  return (
    <React.Fragment>
      {loading && <GifLoader />}
      <div className="relative mt-[14rem]">
        <div className="relative flex w-[90%] mx-auto  mlg:gap-[5rem] gap-[7rem] mb-20 flex-col mlg:flex-row ">
          <div className="relative flex-1 ">
            <div className="h-[200px] w-full sm:h-[250px]  lg:w-[600px] lg:h-[300px] xl:h-[400px]  mb-8 border">
              <ImageWithFallback
                imagePath={primaryImage?.imagePath}
                defaultImage={NoImage}
                alt={product?.productName || "productDetailsImage"}
                className="h-full w-full object-cover"
              />
            </div>

            <SubImagesContainer className="relative flex  mx-auto max-w-[500px] w-full">
              <div className="flex gap-5 justify-center">
                {product?.images.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className={`relative h-[7rem] w-[8rem] cursor-pointer ${
                        e.imageKey === primaryImage?.imageKey
                          ? "border-[3.5px] border-yellow-600 "
                          : ""
                      }`}
                      onClick={() =>
                        handleImageChangehandler(e.imageKey, e.imagePath)
                      }
                    >
                      <ImageWithFallback
                        imagePath={e.imagePath}
                        defaultImage={NoImage}
                        alt={e.imageKey}
                        className="h-full w-full object-cover"
                        hideOnError={false}
                      />
                    </div>
                  );
                })}
              </div>
            </SubImagesContainer>
          </div>
          <div className="flex-1">
            <p className="relative text-center mlg:text-left text-[1.4rem] xl:text-[1.6rem] mb-6 ">
              Avaliability :{" "}
              <span className="relative font-semibold">
                {product?.stockQuantity || 0 > 0 ? (
                  <span className="relative text-green-600">In stock</span>
                ) : (
                  <span className="relative text-red-600">Out Of Stock 😔</span>
                )}
              </span>
            </p>
            <p className="relative uppercase text-[2rem] xl:text-[3rem] mb-6 font-medium  text-center mlg:text-left">
              {product?.productName}
            </p>
            <p className="relative mb-6 text-[1.6rem]  xl:text-[1.8rem] text-center mlg:text-left">
              <span className="relative font-semibold">
                &#8377;{product?.sellingPrice}
              </span>
              <span className="font-light ml-3 text-[1.6rem] line-through ">
                &#8377;{product?.actualPrice}
              </span>
              <span className="ml-5 font-normal text-[1.6rem]">
                {calculateDiscountPercentage(
                  product?.actualPrice || 0,
                  product?.sellingPrice || 0
                )}
                % off
              </span>
            </p>

            <div className="relative mb-6 text-xl flex justify-center mlg:justify-start">
              <div className="relative border border-black px-4 py-3 flex items-center justify-between w-[20%]">
                <span
                  className="relative cursor-pointer block text-[3rem]"
                  onClick={() => quantityHandler("REMOVE")}
                >
                  -
                </span>
                <input
                  className="relative outline-none border-none bg-transparent w-full text-center text-[1.6rem]"
                  min={1}
                  value={quantity}
                />
                <span
                  className="relative cursor-pointer block  text-[3rem] outline-none"
                  onClick={() => quantityHandler("Add")}
                >
                  +
                </span>
              </div>
            </div>

            <div className="mb-10 mlg:mb-8 w-[50%] sm:w-[30%] lg:w-[60%] xl:w-[40%] mx-auto mlg:ml-0">
              <button
                className={`relative bg-[#008000] w-full py-4 text-white text-[1.6rem] hover:bg-[#008004c8] ${
                  (product?.stockQuantity || 0) <= 0
                    ? "pointer-events-none bg-gray-400"
                    : ""
                }`}
                onClick={orderPlacinghandler}
              >
                Shop now
              </button>
            </div>
            <p className="relative text-[1.4rem] text-center w-[70%] mx-auto mlg:text-justify mlg:w-full ">
              Images are for reference purposes only. Actual product may vary in
              shape or appearance based on climate, age, height, etc. The
              product is replaceable but not returnable.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <p className="relative text-center text-[2.5rem] mb-12 ">
            <span className="relative border-b-2 border-black">
              Description
            </span>
          </p>
          <p className="relative text-center w-[80%] mx-auto text-[1.6rem]">
            {product?.productDescription}
          </p>
        </div>

        {relatedProductList.length > 0 && (
          <div className="relative  mb-20">
            <div className="relative text-center mb-12">
              <p className="relative text-[2.5rem] capitalize">
                <span className="relative border-b-2 border-black">
                  related products
                </span>
              </p>
            </div>
            <div className="w-[90%] mx-auto">
              <div className="relative flex flex-wrap gap-[3rem] justify-center">
                {relatedProductList.map((e, i) => {
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
                      buttonText="Shop now"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <RedirectSite
          externalSites={product?.links || []}
          open={redirect}
          close={() => setRedirect(false)}
        />
        <BulkOrder
          open={openBulkOrderModal}
          close={() => setOpenBulkOrderModaltate(false)}
        />
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
