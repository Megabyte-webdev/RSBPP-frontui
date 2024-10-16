import React from 'react';
import { BsJournalCheck } from 'react-icons/bs';

const ViewJournals = () => {
  const data = [
    {
      name: 'Company',
      email: 'company.com',
      faculty: 'In progress',
      dateAdded: '',
      submission: 'Web-based app for sales',
      status: 'Completed',
    },
    // Add more rows if needed
  ];

  return (
    <div
      className="flex flex-col p-4 md:p-8 min-h-screen bg-blue-50/50 font-sans"
    >
      {/* Add Journal Button */}
      <p className="sticky top-4 bg-transparent ml-auto my-2 flex items-center gap-2 text-lg font-medium text-blue-600">
        <BsJournalCheck size={24} />
        Add Journal
      </p>

      {/* Table Wrapper */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Course Name</th>
              <th className="p-2 text-left">Faculty</th>
              <th className="p-2 text-left">Date Added</th>
              <th className="p-2 text-left">File Submission</th>
              <th className="p-2 text-left">Status</th>
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
                <td className="p-2 flex items-center gap-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">{row.name}</p>
                    <p className="text-xs text-gray-500">{row.email}</p>
                  </div>
                </td>
               <td className="p-2 flex items-center font-bold">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {row.faculty}
                  </span>
                </td>
                 <td className="p-2 flex items-center">{row.dateAdded}</td>
                <td className="p-2 flex flex-col justify-center">
<p className='text-sm font-medium'>Sales CRM</p><p className='text-xs'>{row.submission}</p></td>
                 <td className="p-2 flex items-center">
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
