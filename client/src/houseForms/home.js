import { TextField } from '@material-ui/core';
import moment from 'moment';

export default function Home() {
  return (
    <div>
      <center>
        <h2>Select range</h2>
        <form className="rangeForm" noValidate>
          <TextField
            id="datetime-local"
            label="From"
            type="datetime-local"
            defaultValue="null"
            className="rangeFrom"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="datetime-local"
            label="To"
            type="datetime-local"
            defaultValue="null"
            className="rangeTo"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <p></p>
        <h2>Enter Postcode</h2>
        <form className="postcodeForm">
          <TextField
            variant="outlined"
            label="postcode"
            placeholder="AB10"
            onChange={(event) => {
              console.log(event.target.value);
            }}
          />
        </form>
      </center>
    </div>
  );
}
