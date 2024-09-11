import Sidebar from '@/components/SideBar';
import JobForm from '@/components/JobForm';

const PostJob = () => {
  return (
    <div className='flex min-h-screen bg-[#F8FDFF]'>
        <Sidebar />
        <div className="w-[80%] mx-auto p-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Post Job</h2>
          <JobForm page={true} />
        </div>
    </div>
  );
};

export default PostJob;