import { Modal } from '@mui/material';
import SignInForm from './SigninForm';

interface Props{
    open: boolean
    onClose: () => void
}

const SignInModal = ({ open, onClose }: Props) => {
  return (
    <Modal
        className='bg-blue-800 outline-none w-full h-full bg-opacity-50 flex justify-center items-center'
        open={open}
        onClose={onClose}
        aria-labelledby="sign-in-modal"
        aria-describedby="sign-in-form">

    <div className="w-[90%] bg-[#F8FDFF] max-w-xl shadow-2xl p-6 rounded-3xl">
        <SignInForm onClose={onClose}/>
    </div>
  </Modal>
  );
};

export default SignInModal;