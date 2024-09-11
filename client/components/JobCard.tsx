import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Jobs } from '../../types/job.types'
import { useAppDispatch } from '@/redux/Hooks';
import { singlejob } from '@/redux/slices/JobSlice';

const JobCard = ({job}: {job: Jobs}) => {
  const dispatch = useAppDispatch()
  const handleClick = async(id: string) => {
    await dispatch(singlejob(id))
  }
  return (
    <div onClick={()=> handleClick(job._id)} className=" bg-gradient-to-tl from-white from-0% via-[rgba(165,220,247,0.36)] via-55% to-[rgba(116,200,242,0.63)] to-100% dark:from-[#1f265f] dark:from-0% dark:via-[rgba(0,35,99,0.88)] dark:via-55% dark:to-[rgba(40,105,138,0.94)] dark:to-100%  p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border gap-4 hover:cursor-pointer hover:scale-105 focus:scale-105 z-10 flex justify-between items-start w-[350px]">
      <div className='flex flex-col gap-1'>
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{job.location}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{`${job.minSalary} birr - ${job.maxSalary} birr per month`}</p>
      </div>
      <div className="flex flex-col space-y-9 items-end justify-between">
        <div>
            <BookmarkBorderIcon className="text-gray-400" />
        </div>
        <p className="text-gray-400 text-sm">2 days</p>
      </div>
    </div>
  );
};

export default JobCard;
