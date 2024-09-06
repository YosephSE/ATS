"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/redux/Hooks'
import { setLogin } from '@/redux/slices/ModalSlice'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import { logOut } from '@/redux/slices/UserSlice'

interface Props {
    page: "home" | "roles"
}

const Header = ({ page }: Props) => {
    const user = useAppSelector((state: RootState) => state.user.loggedInUser)
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
        if (user) {
            dispatch(logOut())
        }else{
            if (roles){
                dispatch(setLogin())
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
                    className='text-nowrap'
                >
                    {
                        user?
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
