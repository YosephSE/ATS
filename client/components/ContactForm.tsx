"use client"
import React, { useRef, useState } from 'react';
import { 
  TextField, 
  Button, 
  CircularProgress 
} from '@mui/material';
import { useAppDispatch } from '@/redux/Hooks';
import { setClosed, setLogin } from '@/redux/slices/ModalSlice';

const ContactForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        if(emailRef && emailRef.current && nameRef && nameRef.current){
            console.log('Email:', emailRef.current.value);
            console.log('Password:', nameRef.current.value);
            setLoading(false);
            dispatch(setClosed())
        } else {
            setError("Required filled is missing")
            setLoading(false)
        }
    }, 2000);
  };

  return (
    <div>
      <h2 id="sign-in-modal" className="text-2xl font-semibold mb-4 text-center">Contact Admin</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <TextField
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
            inputRef={nameRef}
            label="Full Name"
            type="Name"
            required
            className="w-[80%] bg-white"
            InputLabelProps={{
                shrink: true,
            }}
        />
        <TextField
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
            inputRef={emailRef}
            label="Email"
            type="email"
            required
            className="w-[80%] bg-white"
            InputLabelProps={{
                shrink: true,
            }}
        />
        <div>
            {
                error?
                <p className = "text-red-500">{error}</p>
                :
                <></>
            }
        </div>
        <Button
            type="submit"
            variant="contained"
            disabled={loading}
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
            {loading ? (
                <CircularProgress size={24} className="text-white"/>
            ) : (
                'Login'
            )}
        </Button>
      </form>
      <p className='text-center mt-5'>Have an account? <span className='text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer' onClick={() => dispatch(setLogin())}>Sign In</span></p>
    </div>
  );
};

export default ContactForm;