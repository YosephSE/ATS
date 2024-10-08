"use client";
import { Modal } from "@mui/material";
import SignInForm from "./SigninForm";
import { RootState } from "@/redux/Store";
import { setClosed } from "@/redux/slices/ModalSlice";
import SignUpForm from "./SignUpForm";
import ContactForm from "./ContactForm";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { errorReset, resetSuccess } from "@/redux/slices/AdminSlice";
import { resetError } from "@/redux/slices/UserSlice";

const SignInModal = () => {
  const modalValue = useAppSelector((state: RootState) => state.modal.value);
  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(resetSuccess());
    dispatch(resetError());
    dispatch(errorReset());
    dispatch(setClosed());
  };

  return (
    <Modal
      className="bg-blue-800 py-4 outline-none w-full h-full bg-opacity-50 flex justify-center items-center"
      open={modalValue !== "closed"}
      onClose={handleOnClose}
      aria-labelledby="modal"
      aria-describedby="form"
    >
      <div className="w-[90%] bg-[#F8FDFF] dark:bg-gray-900 max-w-xl shadow-2xl p-6 rounded-3xl">
        {modalValue === "signin" ? (
          <SignInForm />
        ) : modalValue === "signup" ? (
          <SignUpForm />
        ) : (
          <ContactForm />
        )}
      </div>
    </Modal>
  );
};

export default SignInModal;
