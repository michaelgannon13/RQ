import React from 'react';
import { createUseStyles } from 'react-jss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...'
}) => {
  const classes = useStyles();
  
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classes.input}
    />
  );
};

const useStyles = createUseStyles({
  input: {
    padding: '12px 20px',
    fontSize: '1rem',
    borderRadius: '24px',
    color: 'black',
    border: '2px solid #ddd',
    width: '100%',
    maxWidth: '400px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    '&:focus': {
      borderColor: '#6890F0',
    },
  }
}, { name: 'SearchInput' }); 