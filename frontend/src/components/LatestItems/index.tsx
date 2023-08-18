import {
  CurveLine,
  Description,
  Header,
  LatestProductsContainer,
  ViewButton,
} from "./styled";
import { Icon } from "@iconify/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardProps } from "../../types/Card";
import Product1 from "../../assets/card3.jpg";
import Product2 from "../../assets/card4.jpg";
import Product3 from "../../assets/card5.jpg";
import Product4 from "../../assets/card6.jpg";
import Product5 from "../../assets/card7.jpeg";
import Card from "../Card";

const tempLatestProducts: CardProps[] = [
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

const LatestProducts = () => {
  return (
    <LatestProductsContainer>
      <Header>latest</Header>
      <Header>products</Header>
      <CurveLine />
      <Description>Meet our most lovable plants.</Description>
      <ViewButton>
        View more <Icon icon="bi:arrow-right" />
      </ViewButton>
      <div className=" mt-20">
        <Carousel
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
          slidesToSlide={2}
          swipeable
        >
          {tempLatestProducts.map((e, i) => (
            <Card key={i} {...e} />
          ))}
        </Carousel>
      </div>
    </LatestProductsContainer>
  );
};

export default LatestProducts;
