export default function footprint({ car }) {
  return (
    <div>
      {car.year}
      {car.make}
      {car.model}
      {car.option}
      {car.id}
    </div>
  );
}
