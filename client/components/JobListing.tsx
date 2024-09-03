export default function JobListing({ job }: any) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.location}</p>
          <p className="text-gray-800 font-medium">{job.salary}</p>
        </div>
        <div>
          <span className="text-green-600 font-bold">{job.company}</span>
          <span className="text-gray-400 ml-2">{job.rating}★</span>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{job.description}</p>
      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
        Apply on employer site
      </button>
    </div>
  );
}
