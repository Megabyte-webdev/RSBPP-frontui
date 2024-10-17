import React, { useEffect, useState } from 'react';

// Simulated API response
const fetchAllAssignments = async () => [
  {
    id: 1,
    name: 'Jason Price',
    role: 'Admin',
    email: 'janick_parisian@yahoo.com',
    image: 'https://via.placeholder.com/100',
    submittedBy: 'Jason Price',
  },
  {
    id: 2,
    name: 'Jukkoe Sisao',
    role: 'CEO',
    email: 'sibyl_koezy@gmail.com',
    image: 'https://via.placeholder.com/100',
    submittedBy: 'Jukkoe Sisao',
  },
  {
    id: 3,
    name: 'Harriet King',
    role: 'CTO',
    email: 'nadia_block@hotmail.com',
    image: 'https://via.placeholder.com/100',
    submittedBy: 'Harriet King',
  },
];

const fetchUserAssignments = async (user) =>
  (await fetchAllAssignments()).filter((assignment) => assignment.submittedBy === user.name);

const SubmittedAssignments = ({ user }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const loadAssignments = async () => {
      const data =
        user.role === 'admin'
          ? await fetchAllAssignments() // Fetch all for admin
          : await fetchUserAssignments(user); // Fetch only user's assignments
      setAssignments(data);
    };

    loadAssignments();
  }, [user]);

  return (
    <div className="p-8 min-h-max bg-gray-50 flex justify-center">
                <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">

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
            <p className="text-xs text-gray-500">
              Submitted by: {assignment.submittedBy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmittedAssignments;
