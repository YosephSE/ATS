"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, CircularProgress, Menu, MenuItem } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/redux/Hooks'
import { setLoginCandidate } from '@/redux/slices/ModalSlice'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/Store'
import { logout, resetSuccess } from '@/redux/slices/UserSlice'
import { ExpandMore } from '@mui/icons-material'

interface Props {
    page?: "home" | "roles"
}

const Header = ({ page }: Props) => {
    const user = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [roles, setRoles] = useState(false)
    const [home, setHome] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    useEffect(() => {
        if (page === "home") {
            setHome(true)
        } else if (page === "roles") {
            setRoles(true)
        }
    }, [])

    const handleButton = () => {
        if (roles) {
            dispatch(setLoginCandidate())
        } else {
            router.push('/roles')
        }
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = async() => {
        await dispatch(logout())
        dispatch(resetSuccess())
        handleMenuClose()
    }

    return (
        <nav className={`flex items-center justify-between px-6 py-3 border-b shadow-lg ${roles && "absolute border-none shadow-none w-full top-0"}`}>
            <Link href="/" className="flex items-center space-x-2 focus:outline-none">
                <Image 
                    src="/logo.png" 
                    alt="Company Logo" 
                    width={50} 
                    height={50} 
                    className="object-contain"
                />
            </Link>
            <div className="flex items-center space-x-6">
                <Link href="/candidate/jobs" className="text-base text-gray-600 hover:text-gray-800">
                    Jobs
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                {user.loggedInUser ? (
                    <div>
                        <Button onClick={handleMenuOpen} className='flex items-center space-x-2'>
                            <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>{user.loggedInUser.name}</span>
                            <ExpandMore />
                        </Button>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose}>
                                {
                                    user.loggedInUser.role === "user" ?
                                        <Link href="../candidate/profile">Profile</Link>
                                    :
                                        <Link href="../admin/profile">Profile</Link>

                                }
                            </MenuItem>
                            <MenuItem><Link href="/candidate/applications">My Applications</Link></MenuItem>
                            {
                                user.isLoading ?
                                <CircularProgress size={24} className="text-white" />
                                :
                                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                            }
                        </Menu>
                    </div>
                ) : (
                    <Button
                        variant='contained'
                        onClick={handleButton}
                        disabled={user.isLoading}
                        className='text-nowrap'
                    >
                        {user.isLoading ? (
                            <CircularProgress size={24} className="text-white" />
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                )}
            </div>
        </nav>
    )
}

export default Header