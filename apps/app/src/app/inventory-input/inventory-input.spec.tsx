import { render } from '@testing-library/react';

import InventoryInput from './inventory-input';

describe('InventoryInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryInput />);
    expect(baseElement).toBeTruthy();
  });
});
