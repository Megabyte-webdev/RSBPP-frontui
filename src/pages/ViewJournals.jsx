import React from 'react';
import { BsJournalCheck } from 'react-icons/bs';

const ViewJournals = () => {
  const data = [
    {
      name: 'Company',
      email: 'company.com',
      faculty: 'In progress',
      dateAdded: '15 Oct 2024',
      submission: 'Web-based app for sales',
      status: 'Completed',
    },
    // Add more rows if needed
  ];

  return (
    <div className="flex flex-col p-4 md:p-8 min-h-screen bg-blue-50/50 font-sans">
      {/* Add Journal Button */}
      <p className="sticky top-4 bg-transparent ml-auto my-2 flex items-center gap-2 text-lg font-medium text-blue-600">
        <BsJournalCheck size={24} />
        Add Journal
      </p>

      {/* Table Wrapper with Horizontal Scroll */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-max bg-white shadow-lg rounded-lg border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left w-[180px]">Course Name</th>
              <th className="p-4 text-left w-[120px] hidden sm:table-cell">Faculty</th>
              <th className="p-4 text-left w-[150px] hidden md:table-cell">Date Added</th>
              <th className="p-4 text-left w-[200px]">File Submission</th>
              <th className="p-4 text-left w-[120px] hidden lg:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {/* Course Name and Avatar */}
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="leading-snug">
                      <p className="font-medium text-base">{row.name}</p>
                      <p className="text-sm text-gray-500">{row.email}</p>
                    </div>
                  </div>
                </td>

                {/* Faculty */}
                <td className="p-4 hidden sm:table-cell">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {row.faculty}
                  </span>
                </td>

                {/* Date Added */}
                <td className="p-4 hidden md:table-cell">{row.dateAdded || 'N/A'}</td>

                {/* File Submission */}
                <td className="p-4">
                  <div className="leading-snug">
                    <p className="text-base font-medium">Sales CRM</p>
                    <p className="text-sm text-gray-500">{row.submission}</p>
                  </div>
                </td>

                {/* Status */}
                <td className="p-4 text-green-600 font-semibold hidden lg:table-cell">
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewJournals;
