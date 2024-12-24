import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ users }) => {
  // Process data to count users by role
  const roles = users?.reduce((acc, user) => {
    if (user.role) {
      acc[user.role] = (acc[user.role] || 0) + 1;
    }
    return acc;
  }, {});

  // Prepare data for the bar chart
  const roleNames =  roles && Object?.keys(roles);
  const roleCounts = roles && Object?.values(roles);

  const chartData = {
    series: [{
      name: 'Users',
      data: roleCounts,
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: roleNames,  // The role names will be displayed on the x-axis
      },
      title: {
        text: 'Users by Role',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
        },
      },
    },
  };

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
