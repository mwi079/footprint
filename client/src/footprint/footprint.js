import './footprint.css';
import { Doughnut } from 'react-chartjs-2';

export default function footprint({ journey, homeUse }) {
  const carCO2 = (Math.round(journey.CO2 * 100) / 100).toFixed(2);
  const homeCO2 = (Math.round(homeUse.CO2 * 100) / 100).toFixed(2);
  const total = (Math.round((journey.CO2 + homeUse.CO2) * 100) / 100).toFixed(
    2
  );

  const test = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4',
        ],
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F',
        ],
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  return (
    <center className="resultsContainer">
      <h2>Results</h2>
      <div className="results">
        <h3>{carCO2} kg of CO2 on journey</h3>
        <h3>{homeCO2} kg of CO2 from your home</h3>
        <Doughnut
          data={test}
          options={{
            title: {
              display: true,
              text: 'Average Rainfall per month',
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'right',
            },
          }}
        ></Doughnut>
        <h3>{total} kg of CO2 in total</h3>
      </div>
    </center>
  );
}
