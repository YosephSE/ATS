"use client"
import { Modal } from '@mui/material';
import SignInForm from './SigninForm';
import { RootState } from '@/redux/Store';
import { setClosed } from '@/redux/slices/ModalSlice';
import SignUpForm from './SignUpForm';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';

const SignInModal = () => {
    const modalValue = useAppSelector((state: RootState) => state.modal.value)
    const dispatch = useAppDispatch()

    return (
        <Modal
            className='bg-blue-800 outline-none w-full h-full bg-opacity-50 flex justify-center items-center'
            open={modalValue !== "closed"}
            onClose={() => dispatch(setClosed())}
            aria-labelledby="modal"
            aria-describedby="form">

        <div className="w-[90%] bg-[#F8FDFF] max-w-xl shadow-2xl p-6 rounded-3xl">
            {
                modalValue === "signin"
                ?
                <SignInForm />
                :
                <SignUpForm />
            
            }
        </div>
    </Modal>
    );
    };

export default SignInModal;