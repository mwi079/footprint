export default function footprint({ journey, homeUse }) {
  return (
    <div id="test">
      <center className="resultsContainer">
        <h2>{journey.CO2} kg of CO2 on journey</h2>
        <h2>{homeUse.CO2} kg of CO2 from home</h2>
      </center>
    </div>
  );
}
