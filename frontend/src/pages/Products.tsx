import Product1 from "../assets/card3.jpg";
import Product2 from "../assets/card4.jpg";
import Product3 from "../assets/card5.jpg";
import Product4 from "../assets/card6.jpg";
import Product5 from "../assets/card7.jpeg";
import { CardProps } from "../types/Card";
import PageImg from "../assets/productsPageImg.jpeg";
import { CategoryLists } from "../utils/CategoryList";
import Card from "../components/Card";

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
  return (
    <div className="relative mt-[8rem]">
      <div className="relative w-[95%] m-auto">
        <img
          className="relative w-full h-full object-cover"
          src={PageImg}
          alt="productPageImg"
        />
      </div>
      <div className="flex gap-20 w-[90%] mt-[10rem] mb-[6rem] mx-auto">
        <div className="w-[22%] sticky top-[8rem]  h-screen">
          <p className="relative text-[3rem] font-medium mb-[5rem]">
            Categories
          </p>
          {CategoryLists.map((e) => (
            <div className="flex justify-between cursor-pointer text-black/50 hover:text-black text-[1.5rem] font-medium mb-6">
              <span>{e.name}</span>
              <span>{Math.round(Math.random() * 16 + 20)}</span>
            </div>
          ))}
        </div>
        <div className="relative flex-1">
          <p className="relative text-[1.4rem] mb-8 font-medium text-black/60 mt-[5rem]">
            Showing all 52 result(s)
          </p>
          <div className="flex  flex-wrap gap-16 justify-around">
            {Array.from({ length: 3 }).map((_, repetitionIndex) =>
              tempPopularProducts.map((e, i) => (
                <Card
                  key={repetitionIndex + "" + i}
                  {...e}
                  classNames="mid-size-card"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
