import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-markdown', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>Mocked ReactMarkdown: {children}</div>,
}));

jest.mock('@apollo/client', () => ({
  ApolloProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ path, element }: { path: string, element: React.ReactElement }) => <div>Route: {path}</div>,
}));

jest.mock('react-jss', () => ({
  createUseStyles: () => () => ({
    root: 'mock-root',
    content: 'mock-content',
    scrollableArea: 'mock-scrollableArea',
  }),
}));

jest.mock('../contexts', () => ({
  LayoutProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../components', () => ({
  Nav: () => <nav>Mocked Nav</nav>,
  Spinner: () => <div>Mocked Spinner</div>,
}));

jest.mock('../screens', () => ({
  ListPage: () => <div>Mocked ListPage</div>,
  Home: () => <div>UI Assessment - Pokédex (Senior)</div>,
}));

jest.mock('./client', () => ({
  client: {},
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) => (
    <div>
      {fallback}
      {children}
    </div>
  ),
}));

describe('App Component', () => {
  test('renders the root layout', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.mock-root')).toBeInTheDocument();
  });

  test('renders the navigation bar', () => {
    render(<App />);
    expect(screen.getByText('Mocked Nav')).toBeInTheDocument();
  });

  test('renders routes correctly', () => {
    render(<App />);
    expect(screen.getByText('Route: /')).toBeInTheDocument();
    expect(screen.getByText('Route: /pokemon')).toBeInTheDocument();
    expect(screen.getByText('Route: /pokemon/:id')).toBeInTheDocument();
  });

  test('renders the suspense fallback (Spinner)', () => {
    render(<App />);
    expect(screen.getByText('Mocked Spinner')).toBeInTheDocument();
  });
});
