export default function footprint({ car, milage }) {
  return (
    <center>
      {car.year}
      <p></p>
      {car.make}
      <p></p>
      {car.model}
      <p></p>
      {car.option}
      <p></p>
      {car.id}
      <p></p>
      {milage} miles
    </center>
  );
}
