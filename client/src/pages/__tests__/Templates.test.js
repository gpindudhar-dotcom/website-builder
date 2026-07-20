import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Templates from '../Templates';

describe('Templates page', () => {
  it('renders the full catalog of professional templates', () => {
    render(
      <MemoryRouter>
        <Templates />
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId(/template-card-/i);
    expect(cards).toHaveLength(10);
  });
});
