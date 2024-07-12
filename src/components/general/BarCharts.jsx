import Chart from 'react-apexcharts'

function BarChart() {


    const data = {

        series: [{
            name: 'Cash Flow',
            data: [10, 20, 30, 40, 5]
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
                    columnWidth: '20%',
                    borderRadius: 4,
                    borderRadiusApplication: "end",
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            fill: {
                // type: "solid",
                colors: ["#AB3335"]
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
                        return y.toFixed(0);
                    }
                }
            },
            xaxis: {
                type: 'string',
                categories: [
                    "Mon", "Tue", "Wed", "Thu", "Fri"
                ],
                labels: {
                    rotate: -90
                }
            }
        },


    }



    return (
        <div >
            <div>
                <Chart options={data.options} series={data.series} type='bar' height={""} />
            </div>

        </div>
    )
}

export default BarChart