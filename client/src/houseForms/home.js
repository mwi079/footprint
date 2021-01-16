import {
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
} from '@material-ui/core';
import { CloseSharp, RefreshSharp, HomeSharp } from '@material-ui/icons';
import { isValid } from 'postcode';
import moment from 'moment';
import './home.css';

export default function Home({
  updatePostcode,
  updateRange,
  postcode,
  dateRange,
  homeCO2,
  updateElecUse,
  updateGasUse,
  homeUse,
  toggleViewHome,
  refreshHome,
  elecUnits,
  gasUnits,
  changeElecUnits,
  changeGasUnits,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid(postcode)) return alert('Valid UK postcode required');
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
    if (homeUse.elec === undefined)
      return alert('Home electricity consumption required. If none set as 0');
    if (homeUse.gas === undefined)
      return alert('Home gas consumption required. If none set as 0');
    if (+homeUse.gas === 0 && +homeUse.elec === 0)
      return alert('Need either electrical or gas input to calculate');
    homeCO2();
  }

  return (
    <div>
      <center className="homeContainer">
        <form className="homeForm" onSubmit={handleSubmit}>
          <CloseSharp
            className="button"
            style={{
              position: 'relative',
              left: '50%',
              top: '0',
            }}
            onClick={toggleViewHome}
          />
          <RefreshSharp
            className="button"
            style={{
              position: 'relative',
              right: '50%',
              top: '0',
            }}
            onClick={refreshHome}
          />
          <p></p>
          <HomeSharp
            color="primary"
            style={{ fontSize: 60, position: 'relative', right: 0 }}
          />
          <h3>How much Electricity did you use?</h3>
          <TextField
            variant="outlined"
            type="number"
            label="Home Electricity"
            className="homeForms"
            min="0"
            value={homeUse.elec}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {
                    <Select value={elecUnits} onChange={changeElecUnits}>
                      <MenuItem key="kWh" value="kWh">
                        kWh
                      </MenuItem>
                      <MenuItem key="MJ" value="MJ">
                        MJ
                      </MenuItem>
                    </Select>
                  }
                </InputAdornment>
              ),
              inputProps: { min: 0 },
            }}
            onChange={(event) => {
              updateElecUse(event.target.value);
            }}
          />

          <h3>How much Gas did you use?</h3>
          <TextField
            variant="outlined"
            type="number"
            label="Home Gas"
            className="homeForms"
            min="0"
            value={homeUse.gas}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {
                    <Select value={gasUnits} onChange={changeGasUnits}>
                      <MenuItem key="kWh" value="kWh">
                        kWh
                      </MenuItem>
                      <MenuItem key="m3" value="m3">
                        m<sup>3</sup>
                      </MenuItem>
                      <MenuItem key="ft3" value="ft3">
                        ft<sup>3</sup>
                      </MenuItem>
                    </Select>
                  }
                </InputAdornment>
              ),
              inputProps: { min: 0 },
            }}
            onChange={(event) => {
              updateGasUse(event.target.value);
            }}
          />
          <h3>Over what period?</h3>

          <TextField
            variant="outlined"
            id="from"
            label="From"
            type="datetime-local"
            className="homeForms"
            value={dateRange.from}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) =>
              updateRange(event.target.value, event.target.id)
            }
          />
          <p></p>
          <TextField
            variant="outlined"
            id="to"
            label="To"
            type="datetime-local"
            className="homeForms"
            value={dateRange.to}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) =>
              updateRange(event.target.value, event.target.id)
            }
          />
          <p></p>
          <h3>What is your postcode?</h3>
          <TextField
            variant="outlined"
            label="Postcode"
            value={postcode}
            className="homeForms"
            placeholder="format: AB10 6RG"
            onChange={(event) => {
              updatePostcode(event.target.value);
            }}
          />

          <p></p>
          <Button
            className="homeForms"
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
