export type StoreItemData = {
  id?: number;
  name?: string;
  menuItems: Array<{
    id: number;
    price: number;
    menuItem: {
      name: string;
    };
  }>;
};

export type MenuItemData = {
  id: number;
  name: string;
  inStore?: boolean;
};
