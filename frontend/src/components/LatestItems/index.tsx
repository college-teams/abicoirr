import {
  CurveLine,
  Description,
  Header,
  LatestProductsContainer,
  ViewButton,
} from "./styled";
import NoImage from "/assets/noImage.png";
import { Icon } from "@iconify/react";
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
