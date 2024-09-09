import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';
import { setClosed, setRegister } from '@/redux/slices/ModalSlice';
import { resetSuccess } from '@/redux/slices/UserSlice';
import { RootState } from '@/redux/Store';
import { useRouter } from 'next/navigation';
import useLoginHandler from '@/customHooks/loginHandler';
import useLoginState from '@/customHooks/loginState';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modalState = useAppSelector((state: RootState) => state.modal.user);
  const { currentState, redirect } = useLoginState(modalState === "candidate");
  const loginHandler = useLoginHandler(modalState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (currentState.loggedInUser?.firstTime) {
      const data = {
        oldPassword,
        newPassword
      };
      loginHandler(data, true);
    } else {
      const data = {
        email,
        password
      };
      loginHandler(data, false);
    }
  };

  useEffect(() => {
    if (currentState.isSuccess) {
      if (!currentState.loggedInUser?.firstTime) {
        router.push(redirect);
        dispatch(setClosed())
      }
      dispatch(resetSuccess());
    } else if (currentState.isError) {
      setError(currentState.error);
    }
  }, [currentState, dispatch, redirect, router]);

  useEffect(() => {
    if (currentState.loggedInUser?.firstTime) {
      setEmail('');
      setPassword('');
    } else {
      setOldPassword('');
      setNewPassword('');
    }
  }, [currentState.loggedInUser?.firstTime]);

  return (
    <div>
      <h2 id="sign-in-modal" className="text-2xl font-semibold mb-4 text-center">
        {modalState === "candidate" ? "Sign in as a Candidate" : currentState.loggedInUser?.firstTime ? "Change Password": "Sign in as an Employee"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        {!currentState.loggedInUser?.firstTime ? (
          <>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
              required
              className="w-[80%] bg-white"
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
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              required
              className="w-[80%] bg-white"
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
              InputLabelProps={{ shrink: true }}
            />
          </>
        ) : (
          <>
            <TextField
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              label="Old Password"
              type="password"
              required
              className="w-[80%] bg-white"
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
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
              type="password"
              required
              className="w-[80%] bg-white"
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
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <Button
          type="submit"
          variant="contained"
          disabled={currentState.isLoading}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
            '&.Mui-disabled': {
              backgroundColor: '#1976d2',
              color: 'white'
            }
          }}
        >
          {currentState.isLoading ? (
            <CircularProgress size={24} className="text-white" />
          ) : (
            currentState.loggedInUser?.firstTime ? 'Update Password' : 'Login'
          )}
        </Button>
      </form>
      {!currentState.loggedInUser?.firstTime && (
        <p className="text-center mt-5">
          Don’t have an account?{' '}
          <span
            className="text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer"
            onClick={() => dispatch(setRegister())}
          >
            Sign Up
          </span>
        </p>
      )}
    </div>
  );
};

export default SignInForm;