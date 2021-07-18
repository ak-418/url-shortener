import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heading', () => {
  render(<App />);
  const headerElement = screen.getByText(/URL SHORTENER/);
  expect(headerElement).toBeInTheDocument();
});
