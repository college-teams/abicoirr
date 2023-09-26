import { useState } from "react";
// import Carousel from "react-multi-carousel";
import { CardProps } from "../types/Card";
import Product1 from "../assets/card3.jpg";
import Product2 from "../assets/card4.jpg";
import Product3 from "../assets/card5.jpg";
import Product4 from "../assets/card6.jpg";
import Product5 from "../assets/card7.jpeg";
import Card from "../components/Card";
import RedirectSite from "../components/RedirectSite";

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

const ProductDetail = () => {
  const [redirect, setRedirect] = useState(false);

  return (
    <div className="relative mt-[14rem]">
      <div className="relative flex w-[90%] mx-auto  mlg:gap-[5rem] gap-[7rem] mb-20 flex-col mlg:flex-row ">
        <div className="relative flex-1 ">
          <div className="h-[200px] w-full sm:h-[250px]  lg:w-[600px] lg:h-[300px] xl:h-[400px]  mb-8">
            <img
              src={Product4}
              alt="product1"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative flex gap-5 justify-center  mlg:w-[500px] w-full overflow-x-auto no-scrollbar">
            <div className="relative h-[7rem] w-[8rem] cursor-pointer">
              <img
                src={Product1}
                alt="product1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative h-[7rem] w-[8rem] cursor-pointer">
              <img
                src={Product1}
                alt="product1"
                className="h-full w-full object-cover "
              />
            </div>
            <div className="relative h-[7rem] w-[8rem] cursor-pointer">
              <img
                src={Product1}
                alt="product1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative h-[7rem] w-[8rem] cursor-pointer">
              <img
                src={Product1}
                alt="product1"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="relative text-center mlg:text-left text-[1.4rem] xl:text-[1.6rem] mb-6 ">
            Avaliability : <span>{"In stock"}</span>
          </p>
          <p className="relative uppercase text-[2rem] xl:text-[2.5rem] mb-6 font-medium  text-center mlg:text-left">
            COCOPEAT BLOCK(4-5KG)
          </p>
          <p className="relative mb-6 text-[1.6rem]  xl:text-[1.8rem] text-center mlg:text-left">
            <span className="relative font-semibold">&#8377;30.00</span>
            <span className="font-light ml-3 text-[1.6rem] line-through ">
              &#8377;10.00
            </span>
            <span className="ml-5 font-normal text-[1.6rem]">10% off</span>
          </p>
          <div className="mb-10 mlg:mb-8 w-[50%] sm:w-[30%] lg:w-[60%] xl:w-[40%] mx-auto mlg:ml-0">
            <button
              className="relative bg-[#008000] w-full py-4 text-white text-[1.6rem]"
              onClick={() => setRedirect(true)}
            >
              Shop now
            </button>
          </div>
          <p className="relative text-[1.4rem] text-center w-[70%] mx-auto mlg:text-justify mlg:w-full ">
            Images are for reference purposes only. Actual product may vary in
            shape or appearance based on climate, age, height, etc. The product
            is replaceable but not returnable.
          </p>
        </div>
      </div>

      <div className="">
        <p className="relative text-center text-[2.5rem] mb-12 ">
          <span className="relative border-b-2 border-black">Description</span>
        </p>
        <p className="relative text-center w-[80%] mx-auto text-[1.6rem]">
          4 -5 கிலோ எடை கொண்ட தேங்காய் நாரை 8-10 லிட்டர் தண்ணீரில் ஊறவைக்கலாம்
          இதன்மூலம் 13-15 கிலோ தேங்காய் நார் கிடைக்கும் இது LOW EC என்பதால்
          நேரடியாக பயன்படுத்தலாம் 4-5 kg of coir can be soaked in 8-10 liters of
          water to obtain 13-15 kg of coir which is LOW EC and can be used
          directly கோகோ பீட் என்பது நார்ச்சத்து இல்லாத, பஞ்சுபோன்ற, எடை குறைந்த,
          கார்க்கிப் பொருளாகும், இது தேங்காய் மட்டையில் உள்ள தென்னை நார்களை
          ஒன்றாக இணைக்கிறது Coco Peat is the non-fibrous, spongy, light weight,
          corky material that holds together the coir fibre in coconut husk.
          (4.5kg-5 kg)
        </p>
      </div>

      <div className="relative mt-20 mb-20">
        <div className="relative text-center mb-12">
          <p className="relative text-[2.5rem] capitalize">
            <span className="relative border-b-2 border-black">
              related popular
            </span>
          </p>
        </div>
        <div className="w-[70%] mx-auto">
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
                partialVisibilityGutter: 20,
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
            {tempPopularProducts.slice(0, 4).map((e, i) => (
              <Card key={i} {...e} />
            ))}
          </div>
        </div>
      </div>

      <RedirectSite open={redirect} close={() => setRedirect(false)} />
    </div>
  );
};

export default ProductDetail;
