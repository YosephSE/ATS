import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { 
  Modal, 
  TextField, 
  Button, 
  CircularProgress 
} from '@mui/material';

interface Props{
    open: boolean
    onClose: () => void
}

const SignInModal = ({ open, onClose }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        if(emailRef && emailRef.current && passwordRef && passwordRef.current){
            console.log('Email:', emailRef.current.value);
            console.log('Password:', passwordRef.current.value);
            setLoading(false);
        }
        onClose();
    }, 2000);
  };

  return (
    <Modal
        className='bg-blue-800 outline-none w-full h-full bg-opacity-50 flex justify-center items-center'
        open={open}
        onClose={onClose}
        aria-labelledby="sign-in-modal"
        aria-describedby="sign-in-form">

    <div className="w-[90%] bg-[#F8FDFF] max-w-xl shadow-2xl p-6 rounded-3xl">
      <h2 id="sign-in-modal" className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
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
            inputRef={emailRef}
            label="Email"
            type="email"
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
            inputRef={passwordRef}
            label="Password"
            type="password"
            required
            className="w-[80%] bg-white"
            InputLabelProps={{
                shrink: true,
            }}
        />
        <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
                backgroundColor: '#1976d2', // Default MUI primary color
                '&:hover': {
                    backgroundColor: '#1565c0', // Darker shade on hover
                },
                '&.Mui-disabled': {
                    backgroundColor: '#1976d2', // Same as default when disabled (loading)
                    color: 'white', // Ensure text color remains white
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
      <p className='text-center mt-5'>Don’t have an account? <Link href=""><span className='text-blue-500 hover:underline hover:text-blue-700'>Sign Up</span></Link></p>
    </div>
  </Modal>
  );
};

export default SignInModal;