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

const Card = ({ id,name, externalSites,price, image, buttonText, classNames }: CardProps) => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  return (
    <React.Fragment>
      <CardContainer
        className={classNames}
        onClick={() => {
          navigate(`/products/${id}`);
        }}
      >
        <CardImageContainer>
          <img src={image} alt={name} />
        </CardImageContainer>
        <CardDetailsContainer>
          <CardName>{name}</CardName>
          <CardPrice>
            &#8377; {price}
            <span className="font-light ml-3  line-through ">&#8377;30.00</span>
            <span className="ml-5 font-normal">10% off</span>
          </CardPrice>
          <CardButton
            onClick={(e) => {
              setRedirect(true);
              e.stopPropagation();
            }}
          >
            {buttonText}
          </CardButton>
        </CardDetailsContainer>
      </CardContainer>

      <RedirectSite externalSites={externalSites} open={redirect} close={() => setRedirect(false)} />
    </React.Fragment>
  );
};

export default Card;
