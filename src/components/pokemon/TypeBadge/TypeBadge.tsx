import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { getTypeColor } from '../../../types/pokemon';

interface TypeBadgeProps {
  type: string;
}

export const TypeBadge = memo<TypeBadgeProps>(({ type }) => {
  const classes = useStyles({ backgroundColor: getTypeColor(type) });
  
  return (
    <span className={classes.badge}>
      {type}
    </span>
  );
});

TypeBadge.displayName = 'TypeBadge';

const useStyles = createUseStyles({
  badge: {
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '0.8rem',
    color: 'white',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    backgroundColor: ({ backgroundColor }: { backgroundColor: string }) => backgroundColor,
  }
}, { name: 'TypeBadge' }); 