import { TextField } from '@material-ui/core';
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
}) {
  return (
    <div>
      <Autocomplete
        className="carForm"
        onChange={(_, year) => makesOfYear(year)}
        options={years}
        renderInput={(params) => (
          <TextField {...params} label="Year" variant="outlined" />
        )}
      />
      <Autocomplete
        className="makesForm"
        onChange={(_, make) => modelsOfMakes(make)}
        disabled={makes[0] === 'makes'}
        options={makes}
        key={makes}
        renderInput={(params) => (
          <TextField {...params} label="Makes" variant="outlined" />
        )}
      />
      <Autocomplete
        className="modelsForm"
        onChange={(_, model) => optionsOfModels(model)}
        disabled={models[0] === 'models'}
        options={models}
        key={models}
        renderInput={(params) => (
          <TextField {...params} label="Models" variant="outlined" />
        )}
      />
      <Autocomplete
        className="optionsForm"
        onChange={(_, option) => getCarID(option)}
        disabled={options[0] === 'options'}
        options={options}
        key={options}
        getOptionLabel={(option) => option.text}
        renderInput={(params) => (
          <TextField {...params} label="Options" variant="outlined" />
        )}
      />
    </div>
  );
}
