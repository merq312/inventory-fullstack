import { render } from '@testing-library/react';

import InventoryInputCard from './index';

describe('InventoryInput', () => {
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

  const session = 'MC'

  it('should render successfully', () => {
    const { baseElement } = render(<InventoryInputCard item={item} session={session} />);
    expect(baseElement).toBeTruthy();
  });
});
