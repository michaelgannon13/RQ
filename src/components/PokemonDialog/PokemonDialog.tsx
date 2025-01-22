import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  styled,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import { PokemonDialogProps } from '../../types/components';
import { getTypeColor } from '../../types/pokemon';
import Spinner from '../Spinner/Spinner';
import { createUseStyles } from 'react-jss';

const TypeBadge = styled('span')<{ backgroundColor: string }>(({ backgroundColor }) => ({
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '0.8rem',
  color: 'white',
  fontWeight: 'bold',
  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  backgroundColor,
}));

const useStyles = createUseStyles({
  closeIcon: {
    color: '#000000'
  }
});

export const PokemonDialog: React.FC<PokemonDialogProps> = ({
  pokemonNumber: pokemonId,
  open,
  onClose,
}) => {
  const classes = useStyles();
  const { pokemon, loading } = useGetPokemonDetails(pokemonId);
  const [contentReady, setContentReady] = useState(false);

  React.useEffect(() => {
    if (open) {
      setContentReady(false);
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, pokemonId]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-testid="pokemon-dialog-content"
      TransitionProps={{
        onExited: () => setContentReady(false),
      }}
    >
      {(!contentReady || loading) ? (
        <DialogContent>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '400px',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Spinner size={80} />
            <Typography>Loading Pokémon details...</Typography>
          </Box>
        </DialogContent>
      ) : pokemon ? (
        <Fade in={contentReady} timeout={300}>
          <div>
            <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }}>
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8
                }}
              >
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ 
                  background: '#f5f5f5',
                  borderRadius: 1,
                  padding: 2,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    style={{ maxWidth: '200px', height: 'auto' }}
                  />
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography color="text.secondary" variant="h6">
                    #{pokemon.number}
                  </Typography>
                  <Typography variant="h4" sx={{ 
                    my: 1,
                    textTransform: 'capitalize',
                    color: '#333'
                  }}>
                    {pokemon.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
                    {pokemon.types.map((type) => (
                      <TypeBadge
                        key={type}
                        backgroundColor={getTypeColor(type)}
                      >
                        {type}
                      </TypeBadge>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography>
                      <strong>Height:</strong> {pokemon.height.minimum} - {pokemon.height.maximum}
                    </Typography>
                    <Typography>
                      <strong>Weight:</strong> {pokemon.weight.minimum} - {pokemon.weight.maximum}
                    </Typography>
                    <Typography>
                      <strong>Classification:</strong> {pokemon.classification}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Weaknesses
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                        {pokemon.weaknesses.map((type) => (
                          <TypeBadge
                            key={type}
                            backgroundColor={getTypeColor(type)}
                          >
                            {type}
                          </TypeBadge>
                        ))}
                      </Box>
                    </Box>
                    
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Resistances
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                        {pokemon.resistant.map((type) => (
                          <TypeBadge
                            key={type}
                            backgroundColor={getTypeColor(type)}
                          >
                            {type}
                          </TypeBadge>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </div>
        </Fade>
      ) : (
        <DialogContent>
          <Box sx={{ textAlign: 'center', padding: '24px', color: 'error.main' }}>
            Pokemon not found
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
};
