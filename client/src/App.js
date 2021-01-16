import React, { useEffect, useState } from 'react';
import { DriveEtaSharp, HomeSharp } from '@material-ui/icons';
import {
  getMakes,
  getYears,
  getModels,
  getOptions,
  getGPM,
  getIntensity,
} from './ApiService';
import Car from './car/car';
import Footprint from './footprint/footprint';
import Home from './houseForms/home';
import './index.css';

function App() {
  const [carView, setCarView] = useState(false);
  const [homeView, setHomeView] = useState(false);

  const [car, setCar] = useState({});
  const [journey, setJourney] = useState({ CO2: 0 });
  const [distanceUnits, setDistanceUnits] = useState('Miles');

  const [years, setYears] = useState(['years']);
  const [makes, setMakes] = useState(['makes']);
  const [models, setModels] = useState(['models']);
  const [options, setOptions] = useState(['options']);

  const [postcode, setPostcode] = useState('');
  const [dateRange, setdateRange] = useState({});
  const [homeUse, setHomeUse] = useState({ CO2: 0 });
  const [genMix, setGenMix] = useState([]);
  const [gasUnits, setGasUnits] = useState('kWh');
  const [elecUnits, setElecUnits] = useState('kWh');

  const generationMix = Array(9).fill(0);

  useEffect(() => {
    getYears().then(({ data }) => {
      setYears(data.menuItem.map((item) => item.value));
    });
  }, []);

  const toggleViewCar = () => {
    setCarView(!carView);
  };

  const refreshCar = () => {
    setMakes(['makes']);
    setModels(['models']);
    setOptions(['options']);
    setCar({
      year: '',
      make: '',
      model: '',
      option: '',
      id: '',
      gpm: '',
    });
  };

  const makesOfYear = (year) => {
    setMakes(['makes']);
    setModels(['models']);
    setOptions(['options']);
    setCar({
      year,
      make: '',
      model: '',
      option: '',
      id: '',
      gpm: '',
    });
    setJourney({ distance: journey.distance, CO2: 0 });

    if (year !== null) {
      getMakes(year).then(({ data }) => {
        setMakes(data.menuItem.map((item) => item.value));
      });
    }
  };

  const modelsOfMakes = (make) => {
    setModels(['models']);
    setOptions(['options']);
    setCar({
      year: car.year,
      make,
      model: '',
      option: '',
      id: '',
      gpm: '',
    });
    setJourney({ distance: journey.distance, CO2: 0 });

    if (make !== null) {
      getModels(make, car).then(({ data }) => {
        setModels(data.menuItem.map((item) => item.value));
      });
    }
  };

  const optionsOfModels = (model) => {
    setOptions(['options']);
    setCar({
      year: car.year,
      make: car.make,
      model,
      option: '',
      id: '',
      gpm: '',
    });
    setJourney({ distance: journey.distance, CO2: 0 });
    if (model !== null) {
      getOptions(model, car).then(({ data }) => {
        if (data.menuItem.length) setOptions(data.menuItem.map((item) => item));
        else {
          setOptions([data.menuItem]);
        }
      });
    }
  };

  const getCarID = (option) => {
    if (option !== null) {
      setCar({
        year: car.year,
        make: car.make,
        model: car.model,
        option: option.text,
        id: option.value,
        gpm: '',
      });
    } else {
      setCar({
        year: car.year,
        make: car.make,
        model: car.model,
        option: '',
        id: '',
        gpm: '',
      });
      setJourney({ distance: journey.distance, CO2: 0 });
    }
  };

  const toggleDistanceUnits = (event) => {
    event.preventDefault();
    setDistanceUnits(event.target.value);
    setJourney({ distance: journey.distance, CO2: 0 });
  };

  const journeyDistance = (distance) => {
    setJourney({ distance, CO2: 0 });
  };

  const journeyCO2 = () => {
    getGPM(car.id).then(({ data }) => {
      setCar({
        year: car.year,
        make: car.make,
        model: car.model,
        option: car.option,
        id: car.id,
        gpm: data.co2TailpipeGpm,
      });
      const milestokm = 1.60934;
      if (distanceUnits === 'km') {
        console.log('km');
        setJourney({
          distance: journey.distance,
          CO2: (+journey.distance * +data.co2TailpipeGpm) / milestokm / 1000,
        });
      } else {
        setJourney({
          distance: journey.distance,
          CO2: (+journey.distance * +data.co2TailpipeGpm) / 1000,
        });
      }
    });
  };

  const toggleViewHome = () => {
    setHomeView(!homeView);
  };

  const refreshHome = () => {
    setPostcode('');
    updateGasUse('0');
    updateElecUse('0');
    //TODO
  };

  const updatePostcode = (postcode) => {
    setPostcode(postcode);
  };

  const updateRange = (date, option) => {
    if (option === 'from') {
      setdateRange({ from: date, to: dateRange.to });
    } else setdateRange({ from: dateRange.from, to: date });
  };

  const changeElecUnits = (event) => {
    event.preventDefault();
    setElecUnits(event.target.value);
    //TODO
  };

  const updateElecUse = (elec) => {
    setHomeUse({
      intensity: homeUse.intensity,
      elec,
      gas: homeUse.gas,
      CO2: 0,
    });
  };

  const changeGasUnits = (event) => {
    event.preventDefault();
    setGasUnits(event.target.value);
    //TODO
  };

  const updateGasUse = (gas) => {
    setHomeUse({
      intensity: homeUse.intensity,
      elec: homeUse.elec,
      gas,
      CO2: 0,
    });
  };

  const homeCO2 = () => {
    let sum = 0;
    let entries = 0;
    let intensity = 0;
    const gasCO2kw = 185; //g per kWh- varies with efficiency of boiler
    const kWhtoft3 = 31.7; // 31.7kW per 100 cubic ft
    const kWhtom3 = 11.2; // 11.2 kWh per cubic meter
    const kWhtoMJ = 3.6; // 3.6 MJ  per kWh
    let CO2;

    getIntensity(dateRange.from, dateRange.to, postcode).then(({ data }) => {
      entries += data.data.data.length;
      data.data.data.map((entry) => {
        entry.generationmix.map((subEntry, i) => {
          return (generationMix[i] += subEntry.perc);
        });
        return (sum += entry.intensity.forecast);
      });
      intensity = sum / entries;
      generationMix.map((entry, i) => {
        return (generationMix[i] =
          (Math.round(entry / entries) * 100) / 100).toFixed(2); //(Math.round(journey.CO2 * 100) / 100).toFixed(2);
      });

      if (gasUnits === 'kWh' && elecUnits === 'kWh') {
        CO2 = (+homeUse.elec * +intensity + homeUse.gas * gasCO2kw) / 1000;
      } else if (gasUnits === 'kWh' && elecUnits === 'MJ') {
        CO2 =
          ((+homeUse.elec / kWhtoMJ) * +intensity + homeUse.gas * gasCO2kw) /
          1000;
      } else if (gasUnits === 'm3' && elecUnits === 'kWh') {
        CO2 =
          (+homeUse.elec * +intensity + homeUse.gas * kWhtom3 * gasCO2kw) /
          1000;
      } else if (gasUnits === 'm3' && elecUnits === 'MJ') {
        CO2 =
          ((+homeUse.elec / kWhtoMJ) * +intensity +
            homeUse.gas * kWhtom3 * gasCO2kw) /
          1000;
      } else if (gasUnits === 'ft3' && elecUnits === 'kWh') {
        CO2 =
          (+homeUse.elec * +intensity + homeUse.gas * kWhtoft3 * gasCO2kw) /
          1000;
      } else if (gasUnits === 'ft3' && elecUnits === 'MJ') {
        CO2 =
          ((+homeUse.elec / kWhtoMJ) * +intensity +
            homeUse.gas * kWhtoft3 * gasCO2kw) /
          1000;
      }
      setHomeUse({ intensity, elec: homeUse.elec, gas: homeUse.gas, CO2 });
      console.log(homeUse);
      setGenMix(generationMix);
    });
  };

  return (
    <div className="overallContainer">
      <center>
        <h1>What's my footprint?</h1>
      </center>
      <center>
        {carView ? null : (
          <DriveEtaSharp
            color="primary"
            className="button"
            style={{ fontSize: 200 }}
            onClick={toggleViewCar}
          />
        )}
      </center>
      {carView ? (
        <Car
          years={years}
          makes={makes}
          models={models}
          options={options}
          makesOfYear={makesOfYear}
          modelsOfMakes={modelsOfMakes}
          optionsOfModels={optionsOfModels}
          getCarID={getCarID}
          journeyDistance={journeyDistance}
          journey={journey}
          car={car}
          journeyCO2={journeyCO2}
          toggleDistanceUnits={toggleDistanceUnits}
          distanceUnits={distanceUnits}
          toggleViewCar={toggleViewCar}
          refreshCar={refreshCar}
        />
      ) : null}
      <center>
        {homeView ? null : (
          <HomeSharp
            className="button"
            color="primary"
            style={{ fontSize: 200 }}
            onClick={toggleViewHome}
          />
        )}
      </center>
      {homeView ? (
        <Home
          homeCO2={homeCO2}
          updatePostcode={updatePostcode}
          updateRange={updateRange}
          postcode={postcode}
          dateRange={dateRange}
          updateElecUse={updateElecUse}
          updateGasUse={updateGasUse}
          homeUse={homeUse}
          toggleViewHome={toggleViewHome}
          refreshHome={refreshHome}
          elecUnits={elecUnits}
          gasUnits={gasUnits}
          changeElecUnits={changeElecUnits}
          changeGasUnits={changeGasUnits}
        />
      ) : null}
      {journey.CO2 || homeUse.CO2 ? (
        <Footprint journey={journey} homeUse={homeUse} genMix={genMix} />
      ) : null}
    </div>
  );
}

export default App;

//! multiple API calls for range >2 weeks
// let from = moment(dateRange.from);
// let to = moment(dateRange.to);
// let range = moment.duration(to.diff(from)).asDays();
// let maxRange = moment.duration(14, 'days').asDays();
// console.log(maxRange);
// console.log(range);

// if (range > maxRange) {
//   let end = to;
//   to = from.clone().add(13, 'days');
// }

// from = from.toISOString();
// to = to.toISOString();
