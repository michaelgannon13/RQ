import React from 'react';
import { createUseStyles } from 'react-jss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options
}) => {
  const classes = useStyles();
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classes.select}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const useStyles = createUseStyles({
  select: {
    padding: '12px 20px',
    fontSize: '1rem',
    borderRadius: '24px',
    color: '#333',
    border: '2px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    cursor: 'pointer',
    backgroundColor: 'white',
    '&:focus': {
      borderColor: '#6890F0',
    },
  }
}, { name: 'Select' }); 