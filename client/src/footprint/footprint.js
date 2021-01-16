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
        text: 'Your electricity mix',
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
        data: genMix,
      },
    ],
  };

  console.log(genMix);
  // console.log(genMix.reduce((a, b) => a + b, 0));
  // console.log(carCO2 > 0 && homeCO2 > 0);

  const split = {
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Your split',
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
        backgroundColor: ['#B21F00', '#C9DE00'],
        hoverBackgroundColor: ['#501800', '#4B5000'],
        data: [carCO2, homeCO2],
      },
    ],
  };
  //! FIX ENERGY UNITS
  //! EXIT AND REFRESH BUTTONS
  return (
    <center className="resultsContainer">
      <h2>Results</h2>
      <div className="results">
        {+carCO2 ? <h3>{carCO2} kg of CO2 on journey</h3> : null}
        {genMix === Array(9).fill(0) ? null : (
          <Doughnut data={mix} options={mix.options} />
        )}
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
