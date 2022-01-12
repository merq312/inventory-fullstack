import React, { ReactNode } from 'react';
import { Main, PageContainer } from '../../utils/styles';
import Header from '../Header';
import Drawer from '../Drawer';

type AppProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppProps) => {
  return (
    <PageContainer>
      <Header />
      <Main>
        <Drawer />
        {children}
      </Main>
    </PageContainer>
  );
};
