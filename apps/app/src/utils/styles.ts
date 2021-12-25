import styled from 'styled-components';

export const Main = styled.main`
  margin: 0;
  overflow-y: auto;
  @media (min-width: 1400px) {
    margin: 0 200px;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 2rem;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;
