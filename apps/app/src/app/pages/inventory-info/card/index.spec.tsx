import { render } from '@testing-library/react';

import InventoryInfo from './index';

describe('InventoryInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryInfo />);
    expect(baseElement).toBeTruthy();
  });
});
