import React from 'react'
import Sidebar from '@/components/SideBar';

const AllApp = () => {
  return (
    <div className='flex bg-[#F8FDFF]'>
        <Sidebar />
        <div className="w-[80%] mx-auto p-6 min-h-screen">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">All Applications</h2>
          <div>

          </div>
        </div>
    </div>
  )
}

export default AllApp
