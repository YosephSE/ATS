"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/redux/Hooks'
import { setLoginCandidate } from '@/redux/slices/ModalSlice'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import { logOut, resetSuccess } from '@/redux/slices/UserSlice'

interface Props {
    page: "home" | "roles"
}

const Header = ({ page }: Props) => {
    const user = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [roles, setRoles] = useState(false)
    const [home, setHome] = useState(false)

    useEffect(() => {
        if(page === "home"){
            setHome(true)
        } else if(page === "roles") {
            setRoles(true)
        }
    }, [])

    const handleButton = () => {
        if (user.loggedInUser) {
            dispatch(logOut())
            dispatch(resetSuccess())
        }else{
            if (roles){
                dispatch(setLoginCandidate())
            }else { 
                router.push('/roles')
            }
        }
    }

    return (
        <nav className={`flex items-center justify-between px-6 py-3 ${home && "border-b shadow-lg"} ${roles && "absolute w-full top-0"}`}>
            <Link href="/" className="flex items-center space-x-2 focus:outline-none">
            <span className="text-xl md:text-2xl font-medium text-blue-700 hover:text-blue-800">Company{roles && <br/>} Name</span>
            </Link>
            <div className="flex items-center space-x-6">
                <Link href="/jobs" className="text-base text-gray-600 hover:text-gray-800">
                    Jobs
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <Button
                    variant='contained'
                    onClick = {handleButton}
                    disabled = {user.isLoading} 
                    className='text-nowrap'
                >
                    {
                        user.isLoading ?
                        <CircularProgress size={24} className="text-white"/>
                        :
                        user.loggedInUser?
                        "Log Out"
                        :
                        "Sign in"
                    }
                </Button>
            </div>
        </nav>
    )
}

export default Header
