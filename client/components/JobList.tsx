import JobListing from './JobListing';

const jobs = [
  {
    title: 'Backend Engineer',
    location: 'San Francisco, CA',
    salary: '$119K - $175K (Employer est.)',
    company: 'Loft Orbital Solutions',
    rating: '4.6',
    description: 'Loft Orbital is looking for a Backend Engineer to join our international Ground Software team...',
  },
  
];

export default function JobList() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {jobs.map((job, index) => (
        <JobListing key={index} job={job} />
      ))}
    </div>
  );
}
