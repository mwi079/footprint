import {
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { CloseSharp } from '@material-ui/icons';
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
  distanceUnits,
  changeDistanceUnits,
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
        <CloseSharp className="close" />
        <h3>Enter the details of your car</h3>
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
        <h3>Enter the length of your journey</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            type="number"
            className="carForms"
            variant="outlined"
            label="Journey"
            min="0"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {
                    <Select
                      value={distanceUnits}
                      onChange={changeDistanceUnits}
                    >
                      <MenuItem key="Miles" value="Miles">
                        Miles
                      </MenuItem>
                      <MenuItem key="km" value="km">
                        km
                      </MenuItem>
                    </Select>
                  }
                </InputAdornment>
              ),
              inputProps: { min: 0 },
            }}
            onChange={(event) => journeyDistance(event.target.value)}
            value={journey.distance}
          />
          <p></p>
          <Button
            className="carForms"
            variant="contained"
            color="primary"
            type="submit"
          >
            Calculate
          </Button>
        </form>
      </center>
    </div>
  );
}
