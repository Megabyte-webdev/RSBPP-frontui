import React from 'react';
import Chart from 'react-apexcharts';  // Importing Chart.js
import RoundChart from '../components/general/RoundChart'; // Assuming RoundChart is a separate file

const CoursesOverview = ({ courses }) => {
  // Assuming we want to display a radial chart for each course based on the number of participants
  const courseParticipationData = courses?.map(course => ({
    title: course.title,
    participation: Math.min(course.participate, 100), // Ensuring participation is never more than 100%
  }));

  return (
    <div className="p-6 pb-0 bg-gray-50 rounded-lg shadow-lg">
      <div className="grid grid-cols-responsive gap-2 justify-center">
        {courseParticipationData?.map((course, index) => (
          <div key={index} className="bg-white p-4  rounded-lg shadow-md">
            <h3 className="text-xs font-medium text-gray-700 mb-2">{course.title}</h3>
            <div className="max-w-60">
              <RoundChart
                strokeProps={{
                  strokeHeight: 350,
                  strokeSize: "50%",
                  strokeColor: ["#00E396", "#FEB019"], // Gradient color for chart
                  strokeLabel: `${course.participation}%`, // Label showing participation %
                  shades: "5",
                  strokeCap: "round",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesOverview;
