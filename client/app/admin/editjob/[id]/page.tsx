import Sidebar from '@/components/SideBar';
import JobForm from '@/components/JobForm';

const EditJob = ({params: {id}}: {params: {id: string}}) => {
  return (
    <div className='flex min-h-screen bg-[#F8FDFF] dark:bg-slate-800 dark:text-white'>
        <Sidebar />
        <div className="w-[80%] mx-auto p-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Edit Job</h2>
          <JobForm page= {false} id={id} />
        </div>
    </div>
  );
};

export default EditJob;