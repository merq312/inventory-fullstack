import { createContext, Dispatch, ReactNode } from 'react';
import useDashboard, { Action, dashboardState } from '../hooks/useDashboard';

type DashboardContext = {
  state: dashboardState;
  dispatch: Dispatch<Action>;
};

export const DashboardContext = createContext<DashboardContext>(
  {} as DashboardContext
);

type AppProps = {
  children: ReactNode;
};

export const DashboardProvider = ({ children }: AppProps) => {
  const { state, dispatch } = useDashboard();

  return (
    <DashboardContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};
