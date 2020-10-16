import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('renders welcome page', () => {
  const { getByText } = render(<App />);
  const ele = getByText(/choose a number/i);
  expect(ele).toBeInTheDocument();
});
