import { useNavigate } from "react-router-dom";
import { CategoryList } from "../../types/Admin";
import {
  CategoryListContainer,
  CategoryImageContainer,
  CategoryWrapper,
  CategoryName,
} from "./styled";
import NoImage from "/assets/noImage.png";
import ImageWithFallback from "../../utils/ImageWithFallback";

interface CategoryProps {
  content: CategoryList[];
}

const Category = (props: CategoryProps) => {
  const navigate = useNavigate();

  const navigationHandler = (categoryId: number): void => {
    navigate(`/products?categoryId=${categoryId}`);
  };

  return (
    <CategoryWrapper>
      {props.content.map((e, index) => {
        return (
          <CategoryListContainer
            onClick={() => navigationHandler(e.id)}
            key={index}
          >
            <CategoryImageContainer>
              <ImageWithFallback
                className="relative h-full w-full object-cover"
                imagePath={e.imagePath}
                defaultImage={NoImage}
                alt={e.categoryName}
              />
            </CategoryImageContainer>
            <CategoryName className="font-semibold">
              {e.categoryName}
            </CategoryName>
          </CategoryListContainer>
        );
      })}
    </CategoryWrapper>
  );
};

export default Category;
