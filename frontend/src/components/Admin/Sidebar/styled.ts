import styled from "styled-components";

export const SidebarWrapper = styled.div`
    height: calc(100vh - 7rem);
`;

export const SidebarList = styled.li`
  &:hover .icon {
    color: var(--admin-theme-color);
  }
`;
