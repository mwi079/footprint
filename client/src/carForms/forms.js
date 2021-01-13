import { TextField, } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import './forms.css'

export default function forms({years,makes,models,makesOfYear,modelsOfMakes}) {
  return (
    <div>
      <Autocomplete
      className='carForm'
      onChange={(_, year) => makesOfYear(year)}
      options={years}
      renderInput={(params) => (
        <TextField {...params} label='Year' variant='outlined'/>
      )}
      />  
      <Autocomplete
      className='makesForm'
      onChange={(_, make) => modelsOfMakes(make)}
      disabled={!makes.length}
      options={makes}
      renderInput={(params) => (
        <TextField {...params} label='Makes' variant='outlined'/>
      )}
      />
      <Autocomplete
      className='modelsForm'
      //onChange={(_, model) => optionsOfModels(model)}
      disabled={!models.length}
      options={models}
      renderInput={(params) => (
        <TextField {...params} label='Models' variant='outlined'/>
      )}
      />
    </div>
  )
}
