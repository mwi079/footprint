import { TextField, Button } from '@material-ui/core';
import { toOutcode } from 'postcode';

export default function Home({
  updatePostcode,
  updateRange,
  postcode,
  dateRange,
  intensity,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    if (!postcode) return alert('Valid UK postcode required');
    if (
      dateRange.from === undefined ||
      dateRange.to === undefined ||
      dateRange.from > dateRange.to
    )
      return alert('Valid date range required');
    intensity();
  }

  return (
    <div>
      <center>
        <h2>Select range</h2>
        <form className="rangeForm" noValidate>
          <TextField
            id="from"
            label="From"
            type="datetime-local"
            defaultValue="null"
            className="rangeFrom"
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
            defaultValue="null"
            className="rangeTo"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) =>
              updateRange(event.target.value, event.target.id)
            }
          />
        </form>
        <p></p>
        <h2>Enter Postcode</h2>
        <form className="postcodeForm" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="postcode"
            placeholder="format: AB10 6RG"
            onChange={(event) => {
              updatePostcode(toOutcode(event.target.value));
            }}
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
