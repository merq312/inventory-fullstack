export type StoreItemData = {
  id?: number;
  name?: string;
  menuItems: Array<{
    id: number;
    price: number;
    retired: boolean;
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
