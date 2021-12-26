import { useReducer, useCallback, useEffect } from 'react';
import { getAllMenuItems, getAllStoresWithMenu } from '../utils/api';
import { MenuItemData, StoreData } from '../features/Dashboard/types';

const initialState: {
  menuData: Array<MenuItemData>;
  storeData: Array<StoreData>;
  selectedStore: string;
  selectedStoreData: StoreData;
  menuLoadError: string;
  storeLoadError: string;
} = {
  menuData: [],
  storeData: [],
  selectedStore: '',
  selectedStoreData: { menuItems: [] },
  menuLoadError: '',
  storeLoadError: '',
};

type Action =
  | { type: 'set_menu_data'; payload: Array<MenuItemData> }
  | { type: 'set_store_data'; payload: Array<StoreData> }
  | { type: 'set_menu_error'; payload: string }
  | { type: 'set_store_error'; payload: string }
  | { type: 'set_selected_store'; payload: string }
  | { type: 'set_selected_store_data'; payload: StoreData }
  | { type: 'set_in_store_menu_data' };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'set_menu_data': {
      return { ...state, menuData: action.payload };
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
      return { ...state, selectedStore: action.payload };
    }
    case 'set_selected_store_data': {
      return { ...state, selectedStoreData: action.payload };
    }
    case 'set_in_store_menu_data': {
      return {
        ...state,
        menuData: state.menuData.map((i) => {
          let inStore = false;
          for (const j of state.selectedStoreData.menuItems) {
            if (i.name === j.menuItem.name) {
              inStore = true;
              break;
            }
          }
          return { ...i, inStore: inStore };
        }),
      };
    }
    default:
      return { ...state };
  }
};

const useDashboard = () => {
  const [state, setState] = useReducer(reducer, initialState);

  const setMenuData = useCallback(
    (payload: Array<MenuItemData>) =>
      setState({
        type: 'set_menu_data',
        payload: payload,
      }),
    []
  );
  const setStoreData = useCallback(
    (payload: Array<StoreData>) =>
      setState({
        type: 'set_store_data',
        payload: payload,
      }),
    []
  );
  const setMenuError = useCallback(
    (payload: string) =>
      setState({
        type: 'set_menu_error',
        payload: payload,
      }),
    []
  );
  const setStoreError = useCallback(
    (payload: string) =>
      setState({
        type: 'set_store_error',
        payload: payload,
      }),
    []
  );
  const setSelectedStore = useCallback(
    (payload: string) =>
      setState({
        type: 'set_selected_store',
        payload: payload,
      }),
    []
  );
  const setSelectedStoreData = useCallback(
    (payload: StoreData) =>
      setState({
        type: 'set_selected_store_data',
        payload: payload,
      }),
    []
  );
  const setInStoreOnMenuData = useCallback(
    () => setState({ type: 'set_in_store_menu_data' }),
    []
  );

  const dispatch = {
    setSelectedStore,
    setSelectedStoreData,
    setMenuData,
    setStoreData,
    setMenuError,
    setStoreError,
    setInStoreOnMenuData,
  };

  useEffect(() => {
    if (state.selectedStore) {
      setSelectedStoreData(
        state.storeData.filter((store) => store.name === state.selectedStore)[0]
      );
    }
  }, [setSelectedStoreData, state.selectedStore, state.storeData]);

  useEffect(() => {
    getAllStoresWithMenu()
      .then(setStoreData)
      .catch((err) => setStoreError(err.message));
    getAllMenuItems()
      .then(setMenuData)
      .catch((err) => setMenuError(err.message));
  }, [setMenuData, setMenuError, setStoreData, setStoreError]);

  return { state, dispatch };
};

export default useDashboard;
