import { CategoryProps } from "../../types/Category";
import { CategoryListContainer, CategoryImageContainer, CategoryWrapper, CategoryName } from "./styled";

const Category = (props: CategoryProps) => {
  return (
    <CategoryWrapper>
      {props.content.map((e,index) => {
        return (
          <CategoryListContainer key={index}>
            <CategoryImageContainer>
              <img src={e.imagePath} alt={e.name} />
            </CategoryImageContainer>
            <CategoryName>{e.name}</CategoryName>
          </CategoryListContainer>
        );
      })}
    </CategoryWrapper>
  );
};

export default Category;
