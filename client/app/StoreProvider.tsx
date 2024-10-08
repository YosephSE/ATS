'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../redux/Store'
import { ThemeProvider } from 'next-themes'


export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
  <ThemeProvider attribute='class'>
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  </ThemeProvider>
  )
}