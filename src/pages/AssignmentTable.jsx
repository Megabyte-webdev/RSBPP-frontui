import React from 'react';

const AssignmentTable = ({ assignments, navigate, getDetails, indexOfFirstAssignment }) => {
    
    return (
        <table className="w-full min-w-[700px] overflow-auto bg-white rounded-lg border border-gray-300">
            <thead className='bg-gray-200 font-medium'>
                <tr>
                    <th className='p-2 mx-2 text-left min-w-[50px]'>S/N</th>
                    <th className='p-2 mx-2 text-left min-w-[150px]'>Assignment</th>
                    <th className='p-2 mx-2 text-left min-w-[150px]'>Course Name</th>
                    <th className='p-2 mx-2 text-left min-w-[150px]'>Faculty</th>
                    <th className='p-2 mx-2 text-left min-w-[150px]'>Date Added</th>
                    <th className='p-2 mx-2 text-left min-w-[150px]'>Status</th>
                    <th className='p-2 mx-2 text-left min-w-[150px]'>Action</th>
                </tr>
            </thead>
            <tbody>
                { assignments?.map((row, index) => (
                    <tr key={index} className='hover:bg-[#ddd]'>
                        <td className='p-2 mx-2 min-w-[50px]'>{index + 1 + indexOfFirstAssignment}</td>
                        <td className='p-2 mx-2 min-w-[150px]'>{row?.title || 'N/A'}</td>
                        <td className='p-2 mx-2 min-w-[150px]'>{getDetails('course', row.course_id, row.faculty_id)?.title}</td>
                        <td className='p-2 mx-2 min-w-[150px]'>{getDetails('faculty', row.course_id, row.faculty_id)?.title}</td>
                        <td className='p-2 mx-2 min-w-[150px]'>{new Date(row.created_at).toLocaleDateString()}</td>
                        <td className='p-2 mx-2 min-w-[150px]'>{row?.status || 'Pending'}</td>
                        <td className='p-2 mx-2 min-w-[150px]'>
                            <button onClick={() => {navigate('/upload-assignment', { state: { editData: row } }); scrollTo(0,0)}} className="bg-blue-500 text-white px-2 py-1 rounded">Submit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AssignmentTable;
