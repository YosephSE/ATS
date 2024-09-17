import Header from "@/components/Header";
import React from "react";

const ForbiddenPage: React.FC = () => {
  return (
    <div className="bg-[#F0F8FF] dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <Header />
      <div className="flex min-h-[calc(100vh-63px)] flex-col justify-center items-center">
        <div className="bg-white dark:bg-slate-600 p-6 rounded-lg shadow-lg max-w-md text-center">
          <h1 className="md:text-4xl text-2xl text-[#333] dark:text-white">
            403 - Forbidden
          </h1>
          <p className="md:text-xl text-base text-[#555] dark:text-white">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
