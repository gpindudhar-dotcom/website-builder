import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Editor from './Editor';
import { buildPublishedSite } from '../utils/siteExport';

test('renders the editor canvas and sidebar', () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/editor', state: { template: 'basic' } }]}> 
      <Routes>
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Builder Blocks')).toBeInTheDocument();
  expect(screen.getByText('Website Canvas')).toBeInTheDocument();
  expect(screen.getByText('Properties')).toBeInTheDocument();
});

test('allows editing the website title before saving', () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/editor', state: { template: 'basic' } }]}> 
      <Routes>
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText(/site title/i);
  fireEvent.change(titleInput, { target: { value: 'Bright Studio' } });

  expect(titleInput).toHaveValue('Bright Studio');
});

test('builds a navigable multi-page site package for published output', () => {
  const html = buildPublishedSite('Bright Studio', [
    { id: 'home', name: 'Home', components: [{ type: 'hero', text: 'Welcome', subtext: 'Hello there' }] },
    { id: 'about', name: 'About', components: [{ type: 'about', text: 'About us', subtext: 'We build cool sites' }] },
  ]);

  expect(html).toContain('<nav');
  expect(html).toContain('href="#page-about"');
  expect(html).toContain('id="page-about"');
  expect(html).toContain('Welcome');
});

test('publishes the current site to a live URL', async () => {
  const mockPost = jest.spyOn(require('axios'), 'post').mockResolvedValue({
    data: { publishedUrl: '/published/bright-studio/' },
  });
  const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

  render(
    <MemoryRouter initialEntries={[{ pathname: '/editor', state: { template: 'basic' } }]}> 
      <Routes>
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: /publish/i }));

  await waitFor(() => expect(mockPost).toHaveBeenCalled());
  await waitFor(() => expect(openSpy).toHaveBeenCalled());
  expect(await screen.findByText(/live at/i)).toBeInTheDocument();

  mockPost.mockRestore();
  openSpy.mockRestore();
});
