export type MenuItem = {
  id: number;
  day: string;
  name: string;
  retired: boolean;
  menuItemOnStoreId: number;
  overnightCount: number;
  morningCount: number;
  afternoonCount: number;
  leftoverCountOne: number;
  leftoverCountTwo: number;
};

export class ItemTotals {
  constructor(
    public overnightCount: number = 0,
    public morningCount: number = 0,
    public afternoonCount: number = 0,
    public leftoverCountOne: number = 0,
    public leftoverCountTwo: number = 0
  ) {}
}
