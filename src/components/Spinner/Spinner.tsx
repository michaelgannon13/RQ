import React from 'react';
import { createUseStyles } from 'react-jss';

const Spinner: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <div className={classes.pokeball}></div>
    </div>
  );
};

const useStyles = createUseStyles({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  pokeball: {
    width: '60px',
    height: '60px',
    backgroundColor: '#f00',
    borderRadius: '50%',
    position: 'relative',
    animation: '$spin 1.5s linear infinite',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '60px',
      height: '30px',
      backgroundColor: '#fff',
      borderRadius: '0 0 30px 30px',
      bottom: 0,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '20px',
      height: '20px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '4px solid #333',
    }
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  }
}, { name: 'Spinner' });

export default Spinner; 