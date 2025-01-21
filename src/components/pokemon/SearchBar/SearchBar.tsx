import React from 'react';
import { createUseStyles } from 'react-jss';
import { SearchInput } from '../../common/SearchInput/SearchInput';
import { Select } from '../../common/Select/Select';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: Array<{ value: string; label: string; }>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOptions,
}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search by name or type..."
      />
      <Select
        value={sortBy}
        onChange={onSortChange}
        options={sortOptions}
      />
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
}, { name: 'SearchBar' }); 