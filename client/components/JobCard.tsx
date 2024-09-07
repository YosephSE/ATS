import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Jobs } from '../../types/job.types'

const JobCard = ({job}: {job: Jobs}) => {
  return (
    <div className="border gap-4 rounded-lg shadow-lg p-4 flex justify-between items-start w-full max-w-md">
      <div className='flex flex-col gap-1'>
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <p className="text-gray-600">{job.location}</p>
        <p className="text-gray-600 text-sm">{`${job.minSalary} birr - ${job.maxSalary} birr per month`}</p>
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
