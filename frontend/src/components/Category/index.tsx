import { CategoryList } from "../../types/Admin";
import { CategoryListContainer, CategoryImageContainer, CategoryWrapper, CategoryName } from "./styled";

 interface CategoryProps {
  content: CategoryList[];
}

const Category = (props: CategoryProps) => {
  return (
    <CategoryWrapper>
      {props.content.map((e,index) => {
        return (
          <CategoryListContainer key={index}>
            <CategoryImageContainer>
              <img src={e.imagePath} alt={e.categoryName} />
            </CategoryImageContainer>
            <CategoryName>{e.categoryName}</CategoryName>
          </CategoryListContainer>
        );
      })}
    </CategoryWrapper>
  );
};

export default Category;
