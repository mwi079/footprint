import { TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import './forms.css';

export default function forms({
  years,
  makes,
  models,
  options,
  makesOfYear,
  modelsOfMakes,
  optionsOfModels,
  getCarID,
  journeyDistance,
  journey,
  journeyCO2,
  car,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    if (journey.distance === undefined)
      return alert('Distance cannot be blank');
    if (car.id === '' || car.id === undefined)
      return alert('Full car details required');
    journeyCO2();
  }

  return (
    <div>
      <center className="carContainer">
        <h2>Enter the details of your car</h2>
        <Autocomplete
          className="carForms"
          onChange={(_, year) => makesOfYear(year)}
          options={years}
          renderInput={(params) => (
            <TextField {...params} label="Year" variant="outlined" />
          )}
        />
        <Autocomplete
          className="carForms"
          onChange={(_, make) => modelsOfMakes(make)}
          disabled={makes[0] === 'makes'}
          options={makes}
          key={makes}
          renderInput={(params) => (
            <TextField {...params} label="Makes" variant="outlined" />
          )}
        />
        <Autocomplete
          className="carForms"
          onChange={(_, model) => optionsOfModels(model)}
          disabled={models[0] === 'models'}
          options={models}
          key={models}
          renderInput={(params) => (
            <TextField {...params} label="Models" variant="outlined" />
          )}
        />
        <Autocomplete
          className="carForms"
          onChange={(_, option) => getCarID(option)}
          disabled={options[0] === 'options'}
          options={options}
          key={options}
          getOptionLabel={(option) => option.text}
          renderInput={(params) => (
            <TextField {...params} label="Options" variant="outlined" />
          )}
        />
      </center>
      <center className="distanceContainer">
        <h2>Enter the length of your journey</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            type="number"
            className="carForms"
            variant="outlined"
            onChange={(event) => journeyDistance(event.target.value)}
            value={journey.distance}
          />
          <Button
            className="carForms"
            variant="contained"
            color="primary"
            type="submit"
          >
            Sumbit
          </Button>
        </form>
      </center>
    </div>
  );
}
