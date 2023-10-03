import {
  CurveLine,
  Description,
  Header,
  PopularProductsContainer,
  ViewButton,
} from "./styled";
import { Icon } from "@iconify/react";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NoImage from "../../assets/noImage.png";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/Admin";

type PopularProductsProps = {
  PopularProductList: Product[];
};

const PopularProducts = ({ PopularProductList }: PopularProductsProps) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/products");
  };

  return (
    <PopularProductsContainer>
      <Header>most popular</Header>
      <CurveLine />
      <Description>Meet our most lovable plants.</Description>
      <ViewButton onClick={clickHandler}>
        View more <Icon icon="bi:arrow-right" />
      </ViewButton>
      <div className=" mt-20">
        {/* <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 20,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 3,
              partialVisibilityGutter: 20,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {tempPopularProducts.map((e, i) => (
            <Card key={i} {...e} />
          ))}
        </Carousel> */}

        <div className="relative flex flex-wrap gap-[3rem] justify-center">
          {PopularProductList &&
            PopularProductList.map((e, i) => {
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
                  externalSites={e.links}
                  stockQuantity={e.stockQuantity}
                  buttonText="Shop now"
                />
              );
            })}
        </div>
      </div>
    </PopularProductsContainer>
  );
};

export default PopularProducts;
