import Chart from 'react-apexcharts'

const RoundChart = ({ strokeProps = {} }) => {
  // Destructure properties from strokeProps with fallback values
  const {
    strokeHeight = 350,           // Default height for the chart
    strokeSize = "50%",           // Default hollow size
    strokeColor = ["#dee2e6", "#dee2e6"], // Use light gray for progress color
    strokeLabel = "0%",           // Default label (0% if not provided)
    shades = "",                 // Default shades (empty string if not provided)
    strokeCap = "round"          // Default stroke cap (round if not provided)
  } = strokeProps;

  // Ensure the strokeLabel is a valid number, otherwise default to 0
  const participationPercentage = parseFloat(strokeLabel) || 0;

  const data = {
    series: [participationPercentage], // Use the participation percentage directly
    options: {
      chart: {
        height: strokeHeight,
        type: 'radialBar',
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: strokeSize,
          },
          // Ensure that the start and end angles cover the full circle
          startAngle: 0, // Start angle at 0 degrees
          endAngle: 360, // End angle at 360 degrees for a full circle
          dataLabels: {
            enabled: false, // Keep this off for cleaner visuals
            name: {
              fontSize: '12px',
              color: "#000",
              offsetY: 0,
            },
            value: {
              offsetY: 10,
              fontSize: '12px',
              color: "#000",
              formatter: function (val) {
                return val + "%"; // Display percentage
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        colors: strokeColor,
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        },
      },
      stroke: {
        dashArray: shades,
        lineCap: strokeCap,
      },
      labels: [strokeLabel],
    },
  };

  return (
    <div>
      <Chart options={data.options} series={data.series} type='radialBar' />
    </div>
  );
}

export default RoundChart;
