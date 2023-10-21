import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types/Card";
import {
  CardButton,
  CardContainer,
  CardDetailsContainer,
  CardImageContainer,
  CardName,
  CardPrice,
} from "./styled";
import RedirectSite from "../RedirectSite";
import { calculateDiscountPercentage } from "../../utils";
import NoImage from "/assets/noImage.png";
import ImageWithFallback from "../../utils/ImageWithFallback";

const Card = ({
  id,
  name,
  externalSites,
  sellingPrice,
  actualPrice,
  image,
  buttonText,
  classNames,
  stockQuantity,
}: CardProps) => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const isOutOfStock = (stockQuantity || 0) <= 0;
  return (
    <React.Fragment>
      <CardContainer
        className={classNames}
        onClick={() => {
          navigate(`/products/${id}`);
        }}
      >
        {isOutOfStock ? (
          <span className="absolute -left-0 top-0  bg-orange-500 text-white capitalize z-50 text-[1.2rem] font-medium px-4 py-1">
            out of stock
          </span>
        ) : (
          calculateDiscountPercentage(actualPrice, sellingPrice) > 0 && (
            <span className="absolute -left-0 top-0  bg-green-500 text-white capitalize z-50 text-[1.2rem] font-medium px-4 py-1">
              {calculateDiscountPercentage(actualPrice, sellingPrice)}% off
            </span>
          )
        )}
        <CardImageContainer>
          <ImageWithFallback
            imagePath={image}
            defaultImage={NoImage}
            alt={name}
          />
        </CardImageContainer>
        <CardDetailsContainer>
          <CardName>{name}</CardName>
          <CardPrice>
            &#8377; {sellingPrice}
            <span className="font-light ml-3  line-through ">
              &#8377;{actualPrice}
            </span>
            {/* <span className="ml-5 font-normal">
              {calculateDiscountPercentage(actualPrice, sellingPrice)}% off
            </span> */}
          </CardPrice>
          <CardButton
            disabled={isOutOfStock}
            onClick={(e) => {
              setRedirect(true);
              e.stopPropagation();
            }}
          >
            {isOutOfStock ? "Out of stock" : buttonText}
          </CardButton>
        </CardDetailsContainer>
      </CardContainer>

      <RedirectSite
        externalSites={externalSites}
        open={redirect}
        close={() => setRedirect(false)}
      />
    </React.Fragment>
  );
};

export default Card;
