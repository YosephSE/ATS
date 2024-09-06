"use client"
import React, { useEffect, useRef, useState } from 'react';
import { 
  TextField, 
  Button, 
  CircularProgress 
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';
import { setClosed, setRegister } from '@/redux/slices/ModalSlice';
import { login, resetSuccess } from '@/redux/slices/UserSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import useLoginHandler from '@/customHooks/loginHandler';
import useLoginState from '@/customHooks/loginState';


const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const modalState = useAppSelector((state: RootState) => state.modal.user)
  const {currentState, redirect} = useLoginState(modalState === "candidate")

  const loginHandler = useLoginHandler(modalState)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(emailRef && emailRef.current && passwordRef && passwordRef.current){
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        loginHandler(data)
    }
}

  useEffect(() => {
        if (currentState.isSuccess){
            router.push(redirect)
            dispatch(resetSuccess())
            dispatch(setClosed())
        }else if (currentState.isError){
            setError(currentState.error)
        }
    }, [currentState.loggedInUser, currentState.isError])

  return (
    <div>
      <h2 id="sign-in-modal" className="text-2xl font-semibold mb-4 text-center">{modalState === "candidate" ? "Sign in as a Candidate": "Sign in as an Employee"}</h2>
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
                <CircularProgress size={24} className="text-white"/>
            ) : (
                'Login'
            )}
        </Button>
      </form>
      <p className='text-center mt-5'>Don’t have an account? <span className='text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer' onClick={() => dispatch(setRegister())}>Sign Up</span></p>
    </div>
  );
};

export default SignInForm;