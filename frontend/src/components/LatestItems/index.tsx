import {
  CurveLine,
  Description,
  Header,
  LatestProductsContainer,
  ViewButton,
} from "./styled";
import NoImage from "../../assets/noImage.png";
import { Icon } from "@iconify/react";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/Admin";

type LatestProductsProps = {
  latestProductList: Product[];
};

const LatestProducts = ({ latestProductList }: LatestProductsProps) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/products");
  };

  return (
    <LatestProductsContainer>
      <Header>latest</Header>
      <Header>products</Header>
      <CurveLine />
      <Description>Meet our most lovable plants.</Description>
      <ViewButton onClick={clickHandler}>
        View more <Icon icon="bi:arrow-right" />
      </ViewButton>
      <div className="mt-20">
        {/* <Carousel
          additionalTransfrom={0}
          arrows
          // autoPlay
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
          renderButtonGroupOutside={true}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1440,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            desktop2: {
              breakpoint: {
                max: 1440,
                min: 992,
              },
              items:3,
              partialVisibilityGutter: 30,
            },
            mobile: {
              breakpoint: {
                max: 500,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 20,
            },
            tablet: {
              breakpoint: {
                max: 992,
                min: 768,
              },
              items: 2,
              partialVisibilityGutter: 20,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={2}
          swipeable
        >
          {tempLatestProducts.map((e, i) => (
            <Card key={i} {...e} />
          ))}
        </Carousel> */}

        <div className="relative flex flex-wrap gap-[3rem] justify-center">
          {latestProductList && latestProductList.map((e, i) => {
            const image = e.images.length > 0 ? e.images[0].imagePath : NoImage;
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
    </LatestProductsContainer>
  );
};

export default LatestProducts;
