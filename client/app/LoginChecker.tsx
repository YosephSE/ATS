"use client"
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/redux/Hooks'
import { login as userLogin } from '@/redux/slices/UserSlice'
import { login as adminLogin } from '@/redux/slices/AdminSlice'
import StoreProvider from './StoreProvider'

const LoginChecker = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
      const userToken = localStorage.getItem('userToken');
      const adminToken = localStorage.getItem('adminToken');
  
      if (userToken) {
          dispatch(userLogin({ token: userToken })); 
      }
  
      if (adminToken) {
          dispatch(adminLogin({ token: adminToken })); 
      }
    }, [dispatch])
    return (
        <div>
            {children}
        </div>
    )
    }

export default LoginChecker
