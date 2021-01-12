import { TextField, } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import './forms.css'

// props.years.map(year=>{
//   return <div>{year}</div>
// })


export default function forms({years,makes,makesOfYear}) {
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
      //onChange={(_, year) => makesOfYear(year)}
      disabled={!makes.length}
      options={makes}
      renderInput={(params) => (
        <TextField {...params} label='Makes' variant='outlined'/>
      )}
      />
    </div>
  )
}
