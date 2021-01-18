import { Line } from 'react-chartjs-2';

export default function Trend({
  CO2Trend,
  CO2timeTrend,
  tempTrend,
  tempTimeTrend,
}) {
  const dataCO2 = [];
  const dataTemp = [];

  for (let i = 0; i < CO2Trend.length; i++) {
    dataCO2.push({ x: CO2timeTrend[i], y: CO2Trend[i] });
  }

  for (let i = 0; i < tempTrend.length; i++) {
    dataTemp.push({ x: tempTimeTrend[i], y: tempTrend[i] });
  }

  //console.log(data);
  const trend = {
    datasets: [
      { label: 'CO2', yAxesID: 'CO2', data: dataCO2 },
      { label: 'Temperature', yAxesID: 'Temperature', data: dataTemp },
    ],
    options: {
      scales: {
        xAxes: [{ type: 'time' }],
        yAxes: [
          {
            label: 'CO2',
            id: 'CO2',
            type: 'linear',
            position: 'left',
          },
          {
            label: 'Temparature',
            id: 'Temperature',
            type: 'linear',
            position: 'right',
          },
        ],
      },
    },
  };
  //console.log(CO2Trend);
  //console.log(timeTrend);
  //console.log(tempTrend);
  console.log(dataTemp);
  console.log(dataCO2);
  return <Line data={trend} options={trend.options} />;
}
