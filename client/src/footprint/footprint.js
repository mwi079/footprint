import './footprint.css';

export default function footprint({ journey, homeUse }) {
  return (
    <center className="resultsContainer">
      <h2>Results</h2>
      <div className="results">
        <h3>
          {(Math.round(journey.CO2 * 100) / 100).toFixed(2)} kg of CO2 on
          journey
        </h3>
        <h3>
          {(Math.round(homeUse.CO2 * 100) / 100).toFixed(2)} kg of CO2 from your
          home
        </h3>
        <h3>
          {(Math.round((journey.CO2 + homeUse.CO2) * 100) / 100).toFixed(2)} kg
          of CO2 in total
        </h3>
      </div>
    </center>
  );
}
