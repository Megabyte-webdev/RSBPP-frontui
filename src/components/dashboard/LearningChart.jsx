import Chart from 'react-apexcharts'

function LearningChart() {


    const data ={
          
        series: [{
          name: 'Cash Flow',
          data: [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, -0.2, -0.4, -0.6, -0.8, -1, -1.2,
          ]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            },
          },
          plotOptions: {
            bar: {
              colors: {
                ranges: [{
                  from: -100,
                  to: -46,
                  color: '#dee2e6'
                }, {
                  from: -45,
                  to: 0,
                  color: '#dee2e6'
                }]
              },
              columnWidth: '10%',
            }
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: {
            title: {
              text: undefined,
            },
            labels: {
              formatter: function (y) {
                return y.toFixed(0) + "%";
              }
            }
          },
          xaxis: {
            type: 'datetime',
            categories: [
              '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
              '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
              '2012-01-01', '2012-02-01', '2012-03-01', 
            ],
            labels: {
              rotate: -90
            }
          }
        },
      
      
    }



    return (
        <div >
            <div className="d-flex justify-content-between">
            <p>Learning Statistics</p>
                <p>Jan 2024</p>
                </div>
            <div>
                <Chart options={data.options} series={data.series} type='bar' height={""} />
            </div>

        </div>
    )
}

export default LearningChart