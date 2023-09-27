import { CategoryList } from "../../types/Admin";
import {
  CategoryListContainer,
  CategoryImageContainer,
  CategoryWrapper,
  CategoryName,
} from "./styled";

interface CategoryProps {
  content: CategoryList[];
}

const Category = (props: CategoryProps) => {
  return (
    <CategoryWrapper>
      {props.content.map((e, index) => {
        return (
          <CategoryListContainer key={index}>
            <CategoryImageContainer>
              <img
                className="relative h-full w-full object-cover"
                src={e.imagePath}
                alt={e.categoryName}
              />
            </CategoryImageContainer>
            <CategoryName className="font-semibold">{e.categoryName}</CategoryName>
          </CategoryListContainer>
        );
      })}
    </CategoryWrapper>
  );
};

export default Category;
