"use client"
import React from 'react'
import CandidteProfile from '@/components/candidate/Profile';
import Header from '@/components/Header';

const AllApp = () => {
  return (
    <>
     <Header page='home' />
    <div className='flex bg-[#F8FDFF]'>
        <div className="w-full mx-auto p-6 min-h-screen">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pl-80">Profile</h2>
          <div>
            <CandidteProfile />
          </div>
        </div>
    </div>
    </>
  )
}

export default AllApp
