import React, { useRef, useState } from 'react';
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
    className='bg-blue-800 bg-opacity-50'
    open={open}
    onClose={onClose}
    aria-labelledby="sign-in-modal"
    aria-describedby="sign-in-form">

    <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-[#F8FDFF] shadow-2xl p-6 rounded-lg">
      <h2 id="sign-in-modal" className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          inputRef={emailRef}
          label="Email"
          id="outlined-required"
          type="email"
          required
          className="w-full"
        />
        <TextField
          inputRef={passwordRef}
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          required
          className="w-full"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          {loading ? (
            <CircularProgress size={24} className="text-white" />
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </div>
  </Modal>
  );
};

export default SignInModal;