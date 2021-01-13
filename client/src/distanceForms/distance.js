import { TextField } from '@material-ui/core';
import './distance.css';

export default function Distance({ journeyDistance, journey }) {
  return (
    <center>
      <form className="form">
        <TextField
          type="number"
          className="milage"
          variant="outlined"
          value={journey.distance}
          onChange={journeyDistance}
        />
      </form>
    </center>
  );
}
