import React, { ReactNode, useState } from 'react';
import { Main, PageContainer } from '../../utils/styles';
import Header from '../Header';
import Drawer from '../Drawer';

type AppProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppProps) => {
  const [drawer, setDrawer] = useState(false);

  return (
    <PageContainer>
      <Header setDrawer={setDrawer} />
      <Main>
        <Drawer drawer={drawer} setDrawer={setDrawer} />
        {children}
      </Main>
    </PageContainer>
  );
};
