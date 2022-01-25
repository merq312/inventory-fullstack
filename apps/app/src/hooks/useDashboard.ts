import { useContext, useEffect, useReducer } from 'react';
import {
  addMenuItemToStore,
  getAllMenuItems,
  getAllStoresWithMenu,
} from '../utils/api';
import { MenuItemData, StoreItemData } from '../features/Dashboard/types';
import { StoreContext } from '../providers';

export type dashboardState = {
  menuData: Array<MenuItemData>;
  storeData: Array<StoreItemData>;
  selectedStore: string;
  selectedStoreData: StoreItemData;
  menuLoadError: string;
  storeLoadError: string;
  newStoreItemName: string;
  newStoreItemPrice: string;
  newStoreItemError: boolean;
};

const initialState: dashboardState = {
  menuData: [],
  storeData: [],
  selectedStore: '',
  selectedStoreData: { menuItems: [] },
  menuLoadError: '',
  storeLoadError: '',
  newStoreItemName: '',
  newStoreItemPrice: '',
  newStoreItemError: false,
};

export type Action =
  | { type: 'set_menu_data'; payload: Array<MenuItemData> }
  | { type: 'set_store_data'; payload: Array<StoreItemData> }
  | { type: 'set_menu_error'; payload: string }
  | { type: 'set_store_error'; payload: string }
  | { type: 'set_selected_store'; payload: string }
  | { type: 'set_new_store_item_name'; payload: string }
  | { type: 'set_new_store_item_price'; payload: string }
  | { type: 'set_new_store_item_error'; payload: boolean };

export const setMenuData = (payload: Array<MenuItemData>): Action => {
  return {
    type: 'set_menu_data',
    payload: payload,
  };
};

export const setStoreData = (payload: Array<StoreItemData>): Action => {
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

export const setNewStoreItemName = (payload: string): Action => {
  return {
    type: 'set_new_store_item_name',
    payload: payload,
  };
};

export const setNewStoreItemPrice = (payload: string): Action => {
  return {
    type: 'set_new_store_item_price',
    payload: payload,
  };
};

export const setNewStoreItemError = (payload: boolean): Action => {
  return {
    type: 'set_new_store_item_error',
    payload: payload,
  };
};

const filterSelectedStore = (
  storeData: Array<StoreItemData>,
  selectedStore: string
) => {
  return storeData.filter((store) => store.name === selectedStore)[0];
};

const setInStoreOnMenuData = (
  menuData: Array<MenuItemData>,
  selectedStoreData: StoreItemData
) => {
  return menuData.map((i) => {
    let inStore = false;
    for (const j of selectedStoreData.menuItems) {
      if (i.name === j.menuItem.name) {
        inStore = true;
        break;
      }
    }
    return { ...i, inStore: inStore };
  });
};

const reducer = (state: dashboardState, action: Action) => {
  switch (action.type) {
    case 'set_menu_data': {
      if (state.selectedStore === '') {
        return { ...state, menuData: action.payload };
      } else {
        const menuData = action.payload.map((i) => {
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
      if (state.selectedStore) {
        const selectedStore = state.selectedStore;
        const selectedStoreData = filterSelectedStore(
          action.payload,
          selectedStore
        );
        const menuData = setInStoreOnMenuData(
          state.menuData,
          selectedStoreData
        );

        return {
          ...state,
          storeData: action.payload,
          menuData: menuData,
          selectedStoreData: selectedStoreData,
        };
      } else {
        return { ...state, storeData: action.payload };
      }
    }
    case 'set_menu_error': {
      return { ...state, menuLoadError: action.payload };
    }
    case 'set_store_error': {
      return { ...state, storeLoadError: action.payload };
    }
    case 'set_selected_store': {
      const selectedStoreData = filterSelectedStore(
        state.storeData,
        action.payload
      );
      const menuData = setInStoreOnMenuData(state.menuData, selectedStoreData);

      return {
        ...state,
        selectedStore: action.payload,
        selectedStoreData: selectedStoreData,
        menuData: menuData,
      };
    }
    case 'set_new_store_item_name': {
      return { ...state, newStoreItemName: action.payload };
    }
    case 'set_new_store_item_price': {
      return { ...state, newStoreItemPrice: action.payload };
    }
    case 'set_new_store_item_error': {
      return { ...state, newStoreItemError: action.payload };
    }
    default:
      return { ...state };
  }
};

const useDashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { authToken } = useContext(StoreContext);

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

  useEffect(() => {
    const price = parseFloat(state.newStoreItemPrice);
    const itemName = state.newStoreItemName;
    const selectedStore = state.selectedStore;
    const newStoreItemName = state.newStoreItemName;
    const newStoreItemPrice = state.newStoreItemPrice;

    if (itemName && price) {
      dispatch(setNewStoreItemPrice(''));

      addMenuItemToStore(selectedStore, newStoreItemName, price, authToken)
        .then(() => getAllStoresWithMenu())
        .then((data) => dispatch(setStoreData(data)))
        .then(() => dispatch(setNewStoreItemError(false)))
        .catch(() => dispatch(setNewStoreItemError(true)));
    } else if (newStoreItemPrice && newStoreItemPrice !== '') {
      dispatch(setNewStoreItemError(true));
    }
  }, [
    authToken,
    state.newStoreItemName,
    state.newStoreItemPrice,
    state.selectedStore,
  ]);

  return { state, dispatch };
};

export default useDashboard;
