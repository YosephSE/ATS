import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-3 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-medium text-green-600">"Glassdoor"</span>
          {/* <span className="text-xl text-gray-600">Careers</span> */}
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/jobs" className="text-sm text-gray-600 hover:text-gray-800">
            Jobs
          </Link>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
            <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Sign In
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center px-6 py-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-12 lg:pr-24">
            <h1 className="text-6xl md:text-7xl lg:text-7xl font-bold leading-tight">
              <span className="text-green-600">Find</span>
              <br />
              Your Next Job With Us
            </h1>
            {/* <p className="mt-4 text-xl md:text-2xl text-gray-600">Find your next job at Google.</p> */}
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-green-100 rounded-full"></div>
              <Image
                src="/image.png" // Replace with your actual image path
                alt="Camera equipment"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
              <svg className="absolute -top-4 -left-4 text-yellow-400" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <svg className="absolute -bottom-4 -right-4 text-blue-400" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;