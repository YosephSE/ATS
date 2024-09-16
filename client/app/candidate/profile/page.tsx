"use client"
import React from 'react'
import CandidateProfile from '@/components/candidate/Profile';
import Header from '@/components/Header';

const AllApp = () => {
  return (
    <>
     <Header page='home' />
    <div className='flex bg-[#F8FDFF] dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900'>
        <div className="w-full mx-auto p-6 min-h-screen">
          <div>
            <h2 className="text-3xl font-bold mb-1 pl-20">Profile Detail</h2>
            <CandidateProfile />
          </div>
        </div>
    </div>
    </>
  )
}

export default AllApp
