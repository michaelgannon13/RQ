import React from 'react';
import { createUseStyles } from 'react-jss';

interface NoResultsProps {
  searchTerm: string;
}

export const NoResults: React.FC<NoResultsProps> = ({ searchTerm }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.noResults} data-testid="no-results">
      <img 
        src="https://static1.srcdn.com/wordpress/wp-content/uploads/2022/09/Sad-Pikachu.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5" 
        alt="Sad Pikachu"
        className={classes.sadPikachu}
      />
      <div className={classes.message}>
        <h3>Oh no! No Pokémon found...</h3>
        <p>Even Pikachu couldn't find any matches for "{searchTerm}"</p>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 20px',
    textAlign: 'center',
    minHeight: '400px',
    gap: '24px',
  },
  sadPikachu: {
    height: '200px',
    filter: 'grayscale(0.5) opacity(0.8)',
    animation: '$bounce 2s infinite ease-in-out',
  },
  message: {
    color: '#fff',
    '& h3': {
      fontSize: '1.5rem',
      marginBottom: '8px',
      color: '#fff',
    },
    '& p': {
      fontSize: '1.1rem',
      margin: 0,
    },
  },
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
}, { name: 'NoResults' }); 