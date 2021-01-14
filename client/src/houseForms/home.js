import { TextField, Button, InputAdornment } from '@material-ui/core';
import { toOutcode } from 'postcode';
import moment from 'moment';
import './home.css';

export default function Home({
  updatePostcode,
  updateRange,
  postcode,
  dateRange,
  homeCO2,
  updateHomeUse,
  homeUse,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    if (!postcode) return alert('Valid UK postcode required');
    if (
      dateRange.from === undefined ||
      dateRange.to === undefined ||
      dateRange.from >= dateRange.to
    )
      return alert('Valid date range required');
    let to = moment(dateRange.to);
    let from = moment(dateRange.from);
    if (moment.duration(to.diff(from)).asDays() > 14)
      return alert('Maximum allowable range is 14 days');
    if (homeUse.energy === undefined)
      return alert('Home energy consumption required');
    homeCO2();
  }

  return (
    <div>
      <center className="homeContainer">
        <h3>Select range</h3>
        <form className="homeForm" onSubmit={handleSubmit} noValidate>
          <TextField
            id="from"
            label="From"
            type="datetime-local"
            className="homeForms"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) =>
              updateRange(event.target.value, event.target.id)
            }
          />
          <TextField
            id="to"
            label="To"
            type="datetime-local"
            className="homeForms"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) =>
              updateRange(event.target.value, event.target.id)
            }
          />
          <p></p>
          <h3>Enter Postcode</h3>
          <TextField
            variant="outlined"
            label="Postcode"
            className="homeForms"
            placeholder="format: AB10 6RG"
            onChange={(event) => {
              updatePostcode(toOutcode(event.target.value));
            }}
          />
          <h3>Enter Home Energy Consumption over that period</h3>
          <TextField
            variant="outlined"
            type="number"
            label="Home Energy"
            className="homeForms"
            InputProps={{
              endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
            }}
            onChange={(event) => {
              updateHomeUse(event.target.value);
            }}
          />
          <p></p>
          <Button
            className="homeForms"
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
