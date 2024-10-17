import React, { useEffect, useState } from 'react';

// Simulated API response
const fetchAssignments = async () => {
  return [
    {
      id: 1,
      name: 'Jason Price',
      role: 'Admin',
      email: 'janick_parisian@yahoo.com',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Jukkoe Sisao',
      role: 'CEO',
      email: 'sibyl_koezy@gmail.com',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Harriet King',
      role: 'CTO',
      email: 'nadia_block@hotmail.com',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 4,
      name: 'Lenora Benson',
      role: 'Lead',
      email: 'fel.wallace@kunde.us',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 5,
      name: 'Olivia Reese',
      role: 'Strategist',
      email: 'kemmer.hattie@cremin.us',
      image: 'https://via.placeholder.com/100',
    },
    // Add more items as needed...
  ];
};

const SubmittedAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch assignments from the simulated API
    const loadAssignments = async () => {
      const data = await fetchAssignments();
      setAssignments(data);
    };

    loadAssignments();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <img
              src={assignment.image}
              alt={assignment.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{assignment.name}</h3>
            <p className="text-sm text-gray-500">{assignment.role}</p>
            <p className="text-sm text-gray-400">{assignment.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmittedAssignments;
