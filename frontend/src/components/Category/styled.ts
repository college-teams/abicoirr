import styled from "styled-components";

export const CategoryWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
  padding: 8rem 12rem;
`;

export const CategoryListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CategoryImageContainer = styled.div`
  position: relative;
  height: 180px;
  width: 180px;
  border-radius: 50%;
  border: 1px solid var(--light-green);
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.08);
  }
`;

export const CategoryName = styled.p`
  position: relative;
  font-size: 2rem;
`;
