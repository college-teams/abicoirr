import styled from "styled-components";

export const CategoryWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  padding: 8rem 5rem;
  align-items: center;
  justify-content: center;
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
`;

export const CategoryName = styled.p`
  position: relative;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--light-green);
  }
`;
