import React from 'react';
import { createUseStyles } from 'react-jss';
import { SpinnerProps } from '../../types/components';

const Spinner: React.FC<SpinnerProps> = ({ size = 60 }) => {
  const classes = useStyles({ size });
  return (
    <div className={classes.spinner} data-testid="spinner">
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
  pokeball: ({ size = 60 }: SpinnerProps) => ({
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: '#f00',
    borderRadius: '50%',
    position: 'relative',
    animation: '$spin 1.5s linear infinite',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '50%',
      backgroundColor: '#fff',
      borderRadius: `0 0 ${size/2}px ${size/2}px`,
      bottom: 0,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: `${size/3}px`,
      height: `${size/3}px`,
      backgroundColor: '#fff',
      borderRadius: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '4px solid #333',
    }
  }),
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  }
}, { name: 'Spinner' });

export default Spinner; 