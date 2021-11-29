import { render } from '@testing-library/react';

import InventoryInfoHeader from './index';

describe('InventoryInfoHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryInfoHeader />);
    expect(baseElement).toBeTruthy();
  });
});
