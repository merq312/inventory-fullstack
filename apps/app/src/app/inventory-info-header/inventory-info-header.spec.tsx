import { render } from '@testing-library/react';

import InventoryInfoHeader from './inventory-info-header';

describe('InventoryInfoHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryInfoHeader />);
    expect(baseElement).toBeTruthy();
  });
});
