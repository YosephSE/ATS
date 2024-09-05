"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@mui/material'
import { useAppDispatch } from '@/redux/Hooks'
import { setLogin } from '@/redux/slices/ModalSlice'

interface Props {
    page: string
}

const Header = ({ page }: Props) => {
    const dispatch = useAppDispatch()
    return (
        <nav className="flex items-center justify-between px-6 py-3 border-b shadow-lg">
            <Link href="/" className="flex items-center space-x-2 focus:outline-none">
            <span className="text-xl md:text-2xl font-medium text-blue-700 hover:text-blue-800">Company Name</span>
            </Link>
            <div className="flex items-center space-x-6">
                <Link href="/jobs" className="text-base text-gray-600 hover:text-gray-800">
                    Jobs
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <Button
                    variant='contained'
                    onClick = {() => dispatch(setLogin())} 
                >
                    Sign In
                </Button>
            </div>
        </nav>
    )
}

export default Header
