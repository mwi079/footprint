import { Line } from 'react-chartjs-2';
import './trend.css';
import { CloseSharp, PublicSharp } from '@material-ui/icons';

export default function Trend({
  CO2Trend,
  CO2timeTrend,
  tempTrend,
  tempTimeTrend,
  toggleWorldView,
}) {
  const dataCO2 = [];
  const dataTemp = [];

  for (let i = 0; i < CO2Trend.length; i++) {
    dataCO2.push({ x: CO2timeTrend[i], y: CO2Trend[i] });
  }

  for (let i = 0; i < tempTrend.length; i++) {
    dataTemp.push({ x: tempTimeTrend[i], y: tempTrend[i] });
  }

  const trend = {
    datasets: [
      {
        label: 'CO2',
        yAxisID: 'CO2',
        data: dataCO2,
        backgroundColor: 'rgb(54, 162, 235,0.75)',
        hoverBackgroundColor: 'rgb(54, 162, 235,1.5)',
      },
      {
        label: 'Temperature',
        yAxisID: 'Temperature',
        data: dataTemp,
        backgroundColor: 'rgb(255, 205, 86,0.75)',
        hoverBackgroundColor: 'rgb(255, 205, 86,1.5)',
      },
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
            setmin: 385,
            suggestedMax: 415,
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

  return (
    <div>
      <center className="worldContainer">
        <CloseSharp
          className="button"
          style={{
            position: 'relative',
            left: '50%',
            top: 0,
          }}
          onClick={toggleWorldView}
        />

        <PublicSharp
          color="primary"
          style={{ fontSize: 60, position: 'relative', right: 0, top: 10 }}
        />
        <div className="graph">
          <Line data={trend} options={trend.options}></Line>
        </div>
      </center>
    </div>
  );
}
