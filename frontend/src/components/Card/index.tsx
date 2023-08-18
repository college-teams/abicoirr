import { CardProps } from "../../types/Card";
import {
  CardButton,
  CardContainer,
  CardDetailsContainer,
  CardImageContainer,
  CardName,
  CardPrice,
} from "./styled";

const Card = ({ name, price, image, buttonText }: CardProps) => {
  return (
    <CardContainer>
      <CardImageContainer>
        <img src={image} alt={name} />
      </CardImageContainer>
      <CardDetailsContainer>
        <CardName>{name}</CardName>
        <CardPrice>
          &#8377; {price}
          <span className="font-light ml-3  line-through ">&#8377;30.00</span>
          <span className="ml-5 font-normal">10% off</span>{" "}
        </CardPrice>
        <CardButton>{buttonText}</CardButton>
      </CardDetailsContainer>
    </CardContainer>
  );
};

export default Card;
