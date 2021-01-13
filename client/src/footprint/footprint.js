export default function footprint({ journey }) {
  return (
    <div id="test">
      <center className="resultsContainer">
        <h1>{journey.CO2}</h1>
        <h1>kg of Carbon Dioxide were produced by your journey</h1>
      </center>
    </div>
  );
}
