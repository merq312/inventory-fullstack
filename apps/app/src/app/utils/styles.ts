import styled from 'styled-components';

export const PageContainerDiv = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

export const ItemsContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 2rem;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;
