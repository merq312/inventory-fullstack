import { getByText, render, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<App />);

    await waitFor(() =>
      getByText(baseElement as HTMLElement, 'Bento Sushi Product Tracker')
    );
  });
});
