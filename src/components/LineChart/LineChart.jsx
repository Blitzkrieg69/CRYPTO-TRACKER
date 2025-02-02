import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([['Date', 'Prices']]);

    useEffect(() => {
        let dataCopy = [['Date', 'Prices']];
        if (historicalData && historicalData.prices) {
            historicalData.prices.map((item) => {
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`, item[1]]);
            });
            setData(dataCopy);
        }
    }, [historicalData]);

    const options = {
        backgroundColor: '#000000',
        hAxis: {
            title: 'DATE',
            titleTextStyle: {
                color: 'rgb(255, 255, 255)',
            },
            textStyle: { color: 'rgb(255, 255, 255)' },
        },
        vAxis: {
            title: 'PRICE',
            textStyle: { color: 'rgb(255, 255, 255)' },
            titleTextStyle: { color: 'rgb(255, 255, 255)' },
            gridlines: { color: 'rgb(0, 0, 0)' },
        },
        lineWidth: 3,
        series: {
            0: { color: 'rgb(25, 254, 0)' },
        },
        legend: 'none',
    };

    return (
        <div className="coin-chart">
            <Chart
                chartType="LineChart"
                data={data}
                options={options}
                height={'400px'}
                legendToggle
            />
        </div>
    );
};

export default LineChart;