import React, { useRef, useState } from 'react';
import { 
  TextField, 
  Button, 
  CircularProgress 
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setClosed, setLogin} from '@/redux/slices/ModalSlice';

const SignUpForm = () => {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (
            firstNameRef && firstNameRef.current &&
            lastNameRef && lastNameRef.current && 
            emailRef && emailRef.current &&
            passwordRef && passwordRef.current &&
            confirmPasswordRef && confirmPasswordRef.current
        ){
            if(passwordRef.current.value === confirmPasswordRef.current.value){
                setTimeout(() => {
                    console.log(firstNameRef.current?.value)
                    setLoading(false)
                    dispatch(setClosed())
                }, 2000);
            } else{
                setError("Password do not match")
                setLoading(false)
            }
        } else {
            setError("Please fill all the required fields")
            setLoading(false)
        }

    };

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
                    'Register'
                )}
            </Button>
        </form>
        <p className='text-center mt-5'>Have an account? <span className='text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer' onClick={() => dispatch(setLogin())}>Sign In</span></p>
        </div>
    );
};

export default SignUpForm;