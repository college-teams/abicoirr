import {
  CurveLine,
  Description,
  Header,
  PopularProductsContainer,
  ViewButton,
} from "./styled";
import { Icon } from "@iconify/react";
import NoImage from "/assets/noImage.png";
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
