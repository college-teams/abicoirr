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
import { calculateDiscountPercentage, isLoggedIn } from "../../utils";
import NoImage from "/assets/noImage.png";
import ImageWithFallback from "../../utils/ImageWithFallback";
import Auth from "../Auth";

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
  const [showAuth, setShowAuth] = useState(false);

  const isOutOfStock = (stockQuantity || 0) <= 0;

  const handleRedirect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isLoggedIn()) {
      setRedirect(true);
    } else {
      setShowAuth(true);
    }
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <CardContainer
        className={classNames}
        onClick={() => {
          navigate(`/products/${id}`);
        }}
      >
        {isOutOfStock ? (
          <span className="absolute -left-0 top-0  bg-orange-600 text-white capitalize z-50 text-[1.2rem] font-medium px-4 py-1 -mx-[2px] -my-[1.5px]">
            out of stock
          </span>
        ) : (
          calculateDiscountPercentage(actualPrice, sellingPrice) > 0 && (
            <span className="absolute -left-0 top-0 bg-green-600 text-white capitalize z-50 text-[1.2rem] font-medium px-4 py-1 -mx-[2px] -my-[1.5px]">
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
            <span className="ml-3  line-through font-medium">
              &#8377;{actualPrice}
            </span>
            {/* <span className="ml-5 font-normal">
              {calculateDiscountPercentage(actualPrice, sellingPrice)}% off
            </span> */}
          </CardPrice>
          <CardButton disabled={isOutOfStock} onClick={handleRedirect}>
            {isOutOfStock ? "Out of stock" : buttonText}
          </CardButton>
        </CardDetailsContainer>
      </CardContainer>

      <RedirectSite
        externalSites={externalSites}
        open={redirect}
        close={() => setRedirect(false)}
      />

      <Auth open={showAuth} close={() => setShowAuth(false)} />
    </React.Fragment>
  );
};

export default Card;
