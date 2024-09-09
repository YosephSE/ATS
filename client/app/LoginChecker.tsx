"use client"
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/redux/Hooks'
import { resetSuccess as resetUser, fetchuser as userLogin } from '@/redux/slices/UserSlice'
import { fetchuser as adminLogin, resetSuccess as resetAdmin } from '@/redux/slices/AdminSlice'


const LoginChecker = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
      const userToken = sessionStorage.getItem('userToken');
      const adminToken = sessionStorage.getItem('adminToken');
      const fetchUser = async()=>{
        if (userToken) {
            await dispatch(userLogin({ token: userToken })); 
            dispatch(resetUser())
        }
        if (adminToken) {
            await dispatch(adminLogin({ token: adminToken })); 
            dispatch(resetAdmin())
        }
      }

      fetchUser()
    }, [dispatch])
    return (
        <div>
            {children}
        </div>
    )
    }

export default LoginChecker
