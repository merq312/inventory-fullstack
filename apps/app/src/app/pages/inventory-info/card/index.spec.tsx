import { render } from '@testing-library/react';

import InventoryInfoCard from './index';

describe('InventoryInfo', () => {
  const item = {
    id: 1,
    day: '2021-11-30',
    overnightCount: 0,
    morningCount: 0,
    afternoonCount: 0,
    leftoverCountOne: 0,
    leftoverCountTwo: 0,
    menuItemOnStoreId: 1,
    name: 'california'
  };

  it('should render successfully', () => {
    const { baseElement } = render(<InventoryInfoCard item={item} />);
    expect(baseElement).toBeTruthy();
  });
});
