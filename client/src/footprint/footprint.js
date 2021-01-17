import './footprint.css';
import { Doughnut } from 'react-chartjs-2';

export default function footprint({ journey, homeUse, genMix }) {
  const carCO2 = (Math.round(journey.CO2 * 100) / 100).toFixed(2);
  const homeCO2 = (Math.round(homeUse.CO2 * 100) / 100).toFixed(2);
  const total = (Math.round((journey.CO2 + homeUse.CO2) * 100) / 100).toFixed(
    2
  );

  const mix = {
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Your electricity generation mix',
        fontSize: 20,
      },
      tooltips: {
        callbacks: {
          afterLabel: function (data) {
            return `${data.value}%`;
          },
        },
      },
    },
    labels: [
      'biomass',
      'coal',
      'imports',
      'gas',
      'nuclear',
      'other',
      'hydro',
      'solar',
      'wind',
    ],
    datasets: [
      {
        label: 'Split',
        backgroundColor: [
          'rgb(255, 99, 132,0.75)',
          'rgb(255, 159, 64,0.75)',
          'rgb(255, 205, 86,0.75)',
          'rgb(75, 192, 192,0.75)',
          'rgb(54, 162, 235,0.75)',
          'rgb(50, 168, 82,0.75)',
          'rgb(42, 42, 173,0.75)',
          'rgb(173, 42, 162,0.75)',
          'rgb(168, 159, 34,0.75)',
        ],
        hoverBackgroundColor: [
          'rgb(255, 99, 132,1.5)',
          'rgb(255, 159, 64,1.5)',
          'rgb(255, 205, 86,1.5)',
          'rgb(75, 192, 192,1.5)',
          'rgb(54, 162, 235,1.5)',
          'rgb(50, 168, 82,1.5)',
          'rgb(42, 42, 173,1.5)',
          'rgb(173, 42, 162,1.5)',
          'rgb(168, 159, 34,1.5)',
        ],
        data: genMix,
      },
    ],
  };

  const split = {
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Your car/home split',
        fontSize: 20,
      },
      tooltips: {
        callbacks: {
          afterLabel: function (data) {
            return `${data.value}kg`;
          },
        },
      },
    },
    labels: ['Car', 'Home'],
    datasets: [
      {
        label: 'Split',
        backgroundColor: ['rgb(255, 99, 132,0.75)', 'rgb(255, 159, 64,0.75)'],
        hoverBackgroundColor: [
          'rgb(255, 99, 132,1.5)',
          'rgb(255, 159, 64,1.5)',
        ],
        data: [carCO2, homeCO2],
      },
    ],
  };

  return (
    <center className="resultsContainer">
      <h2>Results</h2>
      <div className="results">
        {+carCO2 ? <h3>{carCO2} kg of CO2 from your car</h3> : null}
        {genMix !== Array(9).fill(0) && +homeUse.elec ? (
          <Doughnut data={mix} options={mix.options} />
        ) : null}
        {+homeCO2 ? <h3>{homeCO2} kg of CO2 from your home</h3> : null}
        {+carCO2 !== 0 && +homeCO2 !== 0 ? (
          <>
            <Doughnut data={split} options={split.options} />
            <h3>{total} kg of CO2 in total</h3>
          </>
        ) : null}
      </div>
    </center>
  );
}
