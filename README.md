# Pokédex Application

A modern web application built with React and GraphQL that allows users to browse, search, and view detailed information about Pokémon.

## Features

- Browse through Pokémon with a responsive grid layout
- Search Pokémon by name or type
- Advanced sorting options:
  - Sort by number
  - Sort by name (A-Z)
  - Sort by primary type
  - Sort by number of types
  - Sort by name length
- View detailed Pokémon information in a modal, including:
  - Height and weight ranges
  - Classification
  - Type advantages and weaknesses
  - Resistance information
- Fully responsive design for all devices
- Keyboard accessibility and screen reader support
- Error handling with user-friendly messages
- Loading states with custom Pokéball spinner
- Pagination

## Tech Stack

- React 18
- TypeScript
- GraphQL with Apollo Client
- React JSS for styling
- React Router v6
- Jest and React Testing Library for testing

## Getting Started

1. Clone the repository
2. Run `yarn install` to install the dependencies
3. Run `yarn start` to start the development server
4. Run `yarn test` to run the unit tests
5. Open `http://localhost:3000` in your browser to view the application


## API

This project uses the [GraphQL Pokémon API](https://graphql-pokemon2.vercel.app) for fetching Pokémon data.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

