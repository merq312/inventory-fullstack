import { useEffect, useReducer } from 'react';
import { getAllMenuItems, getAllStoresWithMenu } from '../utils/api';
import { MenuItemData, StoreData } from '../features/Dashboard/types';

export type dashboardState = {
  menuData: Array<MenuItemData>;
  storeData: Array<StoreData>;
  selectedStore: string;
  selectedStoreData: StoreData;
  menuLoadError: string;
  storeLoadError: string;
};

const initialState: dashboardState = {
  menuData: [],
  storeData: [],
  selectedStore: '',
  selectedStoreData: { menuItems: [] },
  menuLoadError: '',
  storeLoadError: '',
};

export type Action =
  | { type: 'set_menu_data'; payload: Array<MenuItemData> }
  | { type: 'set_store_data'; payload: Array<StoreData> }
  | { type: 'set_menu_error'; payload: string }
  | { type: 'set_store_error'; payload: string }
  | { type: 'set_selected_store'; payload: string };

export const setMenuData = (payload: Array<MenuItemData>): Action => {
  return {
    type: 'set_menu_data',
    payload: payload,
  };
};

export const setStoreData = (payload: Array<StoreData>): Action => {
  return {
    type: 'set_store_data',
    payload: payload,
  };
};

export const setSelectedStore = (payload: string): Action => {
  return {
    type: 'set_selected_store',
    payload: payload,
  };
};

const reducer = (state: dashboardState, action: Action) => {
  switch (action.type) {
    case 'set_menu_data': {
      if (state.selectedStore === '') {
        return { ...state, menuData: action.payload };
      } else {
        const menuData = state.menuData.map((i) => {
          let inStore = false;
          for (const j of state.selectedStoreData.menuItems) {
            if (i.name === j.menuItem.name) {
              inStore = true;
              break;
            }
          }
          return { ...i, inStore: inStore };
        });
        return {
          ...state,
          menuData: menuData,
        };
      }
    }
    case 'set_store_data': {
      return { ...state, storeData: action.payload };
    }
    case 'set_menu_error': {
      return { ...state, menuLoadError: action.payload };
    }
    case 'set_store_error': {
      return { ...state, storeLoadError: action.payload };
    }
    case 'set_selected_store': {
      const selectedStore = action.payload;
      const selectedStoreData = state.storeData.filter(
        (store) => store.name === selectedStore
      )[0];
      const menuData = state.menuData.map((i) => {
        let inStore = false;
        for (const j of selectedStoreData.menuItems) {
          if (i.name === j.menuItem.name) {
            inStore = true;
            break;
          }
        }
        return { ...i, inStore: inStore };
      });

      return {
        ...state,
        selectedStore: selectedStore,
        selectedStoreData: selectedStoreData,
        menuData: menuData,
      };
    }
    default:
      return { ...state };
  }
};

const useDashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getAllStoresWithMenu()
      .then((data) =>
        dispatch({
          type: 'set_store_data',
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: 'set_store_error',
          payload: err.message,
        })
      );
    getAllMenuItems()
      .then((data) =>
        dispatch({
          type: 'set_menu_data',
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: 'set_menu_error',
          payload: err.message,
        })
      );
  }, []);

  return { state, dispatch };
};

export default useDashboard;
