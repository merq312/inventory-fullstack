import styled from 'styled-components';

export const Main = styled.main`
  margin: 0;
  padding: 0.4rem 1rem;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  @media (min-width: 1400px) {
    width: 80vw;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  background-color: #f5f5f5;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 2rem;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;
