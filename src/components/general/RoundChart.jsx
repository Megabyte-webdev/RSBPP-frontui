
import Chart from 'react-apexcharts'

const RoundChart = () => {

    const data = {
        series: [100],
        options: {
          chart: {
            height: 350,
            type: 'radialBar',
            offsetY: -10
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: '12px',
                  color: "#000",
                  offsetY: 0
                },
                value: {
                  offsetY: 6,
                  fontSize: '12px',
                  color: "#000",
                  formatter: function (val) {
                    return val + "%";
                  }
                }
              }
            }
          },
          fill: {
            type: 'gradient',
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
            dashArray: 6
          },
          labels: ['Faithful user'],
        },    
    }

    return (
        <div>
            <Chart options={data.options} series={data.series} type='radialBar' />
        </div>
    )
}

export default RoundChart