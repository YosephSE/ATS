import Image from 'next/image';
import Modal from '../components/Modal';
import Header from '@/components/Header';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white from-0% via-[rgba(165,220,247,0.36)] via-55% to-[rgba(116,200,242,0.63)] to-100% font-sans">
      <Header page= "home"/>
      <main className="flex-grow flex px-6 py-12 md:items-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-12 lg:pr-24">
            <h1 className="text-4xl md:text-7xl lg:text-7xl font-bold leading-tight">
              <span className="text-blue-700">Find</span>
              <br />
              Your Next Job With Us
            </h1>
          </div>
          
          <div className="w-full mt-8 md:w-1/2 flex justify-center items-center">
            <div className="relative w-40 h-40 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full"></div>
              <Image
                src="/HomePage.jpg"
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

      <footer className='w-full text-center'>
        <h6>@All rights reserved 2024</h6>
      </footer>

      <Modal />
    </div>
  );
};

export default HomePage;