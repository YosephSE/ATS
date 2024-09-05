"use client"
import React from 'react'
import { Button } from '@mui/material'
import Header from '@/components/Header'
import { useAppDispatch } from '@/redux/Hooks'
import Modal from "../../components/Modal"
import { setLogin, setRegister, setContact } from '@/redux/slices/ModalSlice'

const RolesPage = () => {
    const dispatch = useAppDispatch()
    return (
        <div className='relative min-h-screen flex flex-col'>
            <div className='sticky top-0 z-10'>
                <Header page="roles" />
            </div>
            <div className='grid md:grid-cols-2 min-h-scren'>
                <div className='bg-[radial-gradient(circle,#94CFFA,#F5FFF6)] flex justify-center items-center min-h-screen'>
                    <div className='w-[80%] flex flex-col items-center gap-10'>
                        <h1 className='text-3xl text-center'>For Employee</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, doloremque beatae! Culpa dignissimos animi nulla, eligendi minima in ea?</p>
                        <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#F8FDFF',
                            color: '#000',
                            width: '120px',
                            height: '40px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                                color: 'white'
                            },
                            '&.Mui-disabled': {
                                backgroundColor: '#1976d2', 
                                color: 'white', 
                            },
                        }}
                        onClick = {() => dispatch(setLogin())} 
                        >
                            Login
                        </Button>
                        <p className='text-center mt-5'>Don’t have an account? <span className='text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer' onClick={() => dispatch(setContact())}>Contact Admin</span></p>
                    </div>
                </div>
                <div className='flex justify-center items-center min-h-screen'>
                    <div className='w-[80%] flex flex-col items-center gap-10'>
                        <h1 className='text-3xl text-center'>For Candidate</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, doloremque beatae! Culpa dignissimos animi nulla, eligendi minima in ea?</p>
                        <Button
                        variant='contained'
                        sx={{
                            width: '120px',
                            height: '40px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                                color: 'white'
                            },
                            '&.Mui-disabled': {
                                backgroundColor: '#1976d2', 
                                color: 'white', 
                            },
                        }}
                        onClick = {() => dispatch(setLogin())} 
                        >
                            Login
                        </Button>
                        <p className='text-center mt-5'>Don’t have an account? <span className='text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer' onClick={() => dispatch(setRegister())}>Sign Up</span></p>
                    </div>
                </div>
            </div>

            <Modal />
        </div>
    )
}

export default RolesPage