export default function footprint({ journey, homeUse }) {
  return (
    <center className="resultsContainer">
      <h2>Results</h2>
      <div className="results">
        <h3>{journey.CO2} kg of CO2 on journey</h3>
        <h3>{homeUse.CO2} kg of CO2 from your home</h3>
      </div>
    </center>
  );
}
