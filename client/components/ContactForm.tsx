"use client"
import React, { useRef, useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  CircularProgress,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputAdornment,
  Box
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';
import { setLoginAdmin } from '@/redux/slices/ModalSlice';
import { countries, CountryData } from '../public/countrydata';
import { contact } from '@/redux/slices/AdminSlice';
import { RootState } from '@/redux/store';

const ContactForm = () => {
  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(countries[0]);
  const [dialCode, setDialCode] = useState(selectedCountry.dialCode);

  const currentState = useAppSelector((state: RootState) => state.admin)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setDialCode(selectedCountry.dialCode);
  }, [selectedCountry]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(
      firstRef.current &&
      lastRef.current &&
      phoneRef.current &&
      emailRef.current
    ){
      const fullPhoneNumber = `${dialCode}${phoneRef.current.value}`;
      dispatch(contact({
        firstName: firstRef.current.value,
        lastName: lastRef.current.value,
        phoneNumber: fullPhoneNumber,
        email: emailRef.current.value
      }))
    } 
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const country = countries.find(c => c.dialCode === event.target.value);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleDialCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDialCode = event.target.value;
    setDialCode(inputDialCode);
    
    const country = countries.find(c => c.dialCode === inputDialCode);
    if (country) {
      setSelectedCountry(country);
    }
  };

  useEffect(() => {
    if (currentState.isError){
        setError(currentState.error)
    }
  }, [currentState.isError])

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 id="sign-in-modal" className="text-2xl font-semibold mb-4 text-center">Contact Admin</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <TextField
          inputRef={firstRef}
          label="First Name"
          type="text"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#0F6CF6',
              },
              '&:hover fieldset': {
                borderColor: 'blue',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'blue',
              },
            },
          }}
        />
        <TextField
          inputRef={lastRef}
          label="Last Name"
          type="text"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#0F6CF6',
              },
              '&:hover fieldset': {
                borderColor: 'blue',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'blue',
              },
            },
          }}
        />
        <TextField
            label="Phone number"
            type="tel"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
                startAdornment: (
                <InputAdornment sx={{}} position="start">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        value={dialCode}
                        onChange={handleDialCodeChange}
                        sx={{ 
                        minWidth: '20px',
                        width: `${(dialCode.length + 1) * 8}px`,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { border: 'none' },
                        },
                        '& .MuiInputBase-input': {
                            padding: '0', 
                        },
                        }}
                        inputProps={{ 
                        style: { padding: '0' } 
                        }}
                    />
                    <Select
                        value={selectedCountry.dialCode}
                        onChange={handleCountryChange}
                        sx={{ 
                        minWidth: 20,
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        }}
                        renderValue={(value) => (
                        <span>{selectedCountry.flag}</span>
                        )}
                    >
                        {countries.map((country) => (
                        <MenuItem key={country.code} value={country.dialCode}>
                            <div className="flex items-center">
                            <span className="mr-2">{country.flag}</span>
                            <span>{country.name} ({country.dialCode})</span>
                            </div>
                        </MenuItem>
                        ))}
                    </Select>
                    </Box>
                </InputAdornment>
                ),
            }}
            inputRef={phoneRef}
            sx={{
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#0F6CF6',
                },
                '&:hover fieldset': {
                    borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                },
                },
            }}
            />

        <TextField
          inputRef={emailRef}
          label="Email"
          type="email"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#0F6CF6',
              },
              '&:hover fieldset': {
                borderColor: 'blue',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'blue',
              },
            },
          }}
        />
        {error && <p className="text-red-500">{error}</p>}
        {currentState.isSuccess && <p className='text-blue-800'>Your request has been submitted</p>}
        <Button
          type="submit"
          variant="contained"
          disabled={currentState.isLoading}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            '&.Mui-disabled': {
              backgroundColor: '#1976d2', 
              color: 'white', 
            },
          }}
        >
          {currentState.isLoading ? (
            <CircularProgress size={24} sx={{ color: 'white' }}/>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
      <p className='text-center mt-5'>Have an account? <span className='text-blue-500 hover:underline hover:text-blue-700 cursor-pointer' onClick={() => dispatch(setLoginAdmin())}>Sign In</span></p>
    </div>
  );
};

export default ContactForm;
