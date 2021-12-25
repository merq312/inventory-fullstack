import { render } from '@testing-library/react';

import Header from './index';

describe('Header', () => {
  it('should render successfully', () => {
    const setDrawer = jest.fn();
    const { baseElement } = render(<Header setDrawer={setDrawer} />);
    expect(baseElement).toBeTruthy();
  });
});
