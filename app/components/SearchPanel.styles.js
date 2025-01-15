import { styled } from '@mui/system';

export const StyledAutocomplete = styled('div')({
  width: 215,
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
    borderRadius: '100px',
    border: '2px solid #ee3124',
    padding: '0.2rem 1rem 0.25rem 1rem',
    fontFamily: 'museo-slab, Cambria, Cochin',
    fontSize: '0.875rem',
  },
  '& .MuiAutocomplete-popper': {
    fontFamily: 'museo-slab, Cambria, Cochin',
    fontSize: '0.875rem',
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'museo-slab, Cambria, Cochin',
    fontSize: '0.875rem',
    transform: 'translate(20px, 0.7rem) scale(1)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    transform: 'translate(8px, -5px) scale(0.8)',
    fontSize: '0.7rem',
    backgroundColor: '#eeeeee',
    borderRadius: '100px',
    padding: '0 15px',
  },
  '& .MuiFormLabel-filled': {
    transform: 'translate(8px, -5px) scale(0.8)',
    fontSize: '0.7rem',
    backgroundColor: '#eeeeee',
    borderRadius: '100px',
    padding: '0 15px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ee3124',
    borderWidth: '0',
  },
  '& .MuiInputBase-input': {
    padding: '0 0 0 5px !important',
  },
});