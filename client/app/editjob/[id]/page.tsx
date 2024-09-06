import Sidebar from '@/components/SideBar';
import JobForm from '@/components/JobForm';

const simulate ={
  title: "Software Engineer",
  location: "Addis Ababa",
  department: "Engineering",
  type: "Full-time",
  status: true,
  description:  "Just place holder",
  minSalary: 100,
  maxSalary: 400,
  requirments: ["Hello1", "Hello2"],
  responsibilities: ["Hello1", "Hello2"]
}

const EditJob = () => {
  return (
    <div className='flex bg-[#F8FDFF]'>
        <Sidebar />
        <div className="w-[80%] mx-auto p-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Edit Job</h2>
          <JobForm page= {false} initialData={simulate} />
        </div>
    </div>
  );
};

export default EditJob;