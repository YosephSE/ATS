"use client"
import React, { useEffect, useRef, useState } from 'react';
import { 
  TextField, 
  Button, 
  CircularProgress 
} from '@mui/material';
import { useAppDispatch } from '@/redux/Hooks';
import { setClosed, setLogin} from '@/redux/slices/ModalSlice';
import { register, resetSuccess} from '@/redux/slices/UserSlice';
import { useAppSelector } from '@/redux/Hooks';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
    const currentState = useAppSelector((state: RootState) => state.user)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)

    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            firstNameRef && firstNameRef.current &&
            lastNameRef && lastNameRef.current && 
            emailRef && emailRef.current &&
            passwordRef && passwordRef.current &&
            confirmPasswordRef && confirmPasswordRef.current
        ){
            if(passwordRef.current.value === confirmPasswordRef.current.value){
                    dispatch(
                        register(
                            {
                                firstName: firstNameRef.current!.value,
                                lastName: lastNameRef.current!.value,
                                email: emailRef.current!.value,
                                password: passwordRef.current!.value
                            }
                        ))
            } else{
                setError("Password do not match")
            }
        }
    };

    useEffect(() => {
        if (currentState.isSuccess){
            dispatch(setClosed())
            router.push('/jobs')
            dispatch(resetSuccess())
        }else if (currentState.isError){
            setError(currentState.error)
        }
    }, [currentState.loggedInUser, currentState.isError])

    return (
        <div>
        <h2 id="sign-in-modal" className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
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
                inputRef={firstNameRef}
                label="First Name"
                type="text"
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
                inputRef={lastNameRef}
                label="Last Name"
                type="text"
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
                inputRef={confirmPasswordRef}
                label="Confirm Password"
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
                    'Register'
                )}
            </Button>
        </form>
        <p className='text-center mt-5'>Have an account? <span className='text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer' onClick={() => dispatch(setLogin())}>Sign In</span></p>
        </div>
    );
};

export default SignUpForm;