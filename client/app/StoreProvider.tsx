'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../redux/store'
import { useAppDispatch } from '@/redux/Hooks'
import { login as userLogin } from '@/redux/slices/UserSlice'
import { login as adminLogin } from '@/redux/slices/AdminSlice'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
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
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}