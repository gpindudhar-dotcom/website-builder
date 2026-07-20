import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the login experience for returning builders', () => {
  render(<App />);
  expect(screen.getByText('Website Builder Login')).toBeInTheDocument();
  expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
});
