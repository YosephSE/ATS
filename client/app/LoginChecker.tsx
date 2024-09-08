"use client"
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/redux/Hooks'
import { fetchuser as userLogin } from '@/redux/slices/UserSlice'
import { fetchuser as adminLogin } from '@/redux/slices/AdminSlice'


const LoginChecker = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
      const userToken = sessionStorage.getItem('userToken');
      const adminToken = sessionStorage.getItem('adminToken');
  
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
