import styled from "styled-components";

export const CategoryWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  column-gap: 5rem;
  row-gap: 4rem;
  padding: 8rem 5rem;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 6rem 2.5rem;
  }
`;

export const CategoryListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

export const CategoryImageContainer = styled.div`
  position: relative;
  height: 170px;
  width: 170px;
  border-radius: 50%;
  cursor: pointer;
  outline-offset: 8px;
  outline: 2px solid var(--light-green);
  box-shadow: 0 2.5rem 4rem rgba(0, 0, 0, 0.2);
  overflow: hidden;

  img {
    transition: all ease 0.5s;

    &:hover {
      transform: scale(1.08);
    }
  }

  @media screen and (max-width: 1024px) {
    height: 150px;
    width: 150px;
  }

  @media screen and (max-width: 768px) {
    height: 120px;
    width: 120px;
  }

  @media screen and (max-width: 500px) {
    height: 80px;
    width: 80px;
  }
`;

export const CategoryName = styled.p`
  position: relative;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  width: 150px;
  margin-top: 1rem;

  &:hover {
    color: var(--light-green);
  }

  @media screen and (max-width:768px){
  width: 100px;
  }
`;
