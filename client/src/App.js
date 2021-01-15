import React, { useEffect, useState } from 'react';
//import moment from 'moment';
import {
  getMakes,
  getYears,
  getModels,
  getOptions,
  getGPM,
  getIntensity,
} from './ApiService';
import CarForms from './carForms/forms';
import Footprint from './footprint/footprint';
import Home from './houseForms/home';

function App() {
  const [car, setCar] = useState({});
  const [journey, setJourney] = useState({ CO2: 0 });

  const [years, setYears] = useState(['years']);
  const [makes, setMakes] = useState(['makes']);
  const [models, setModels] = useState(['models']);
  const [options, setOptions] = useState(['options']);

  const [postcode, setPostcode] = useState('');
  const [dateRange, setdateRange] = useState({});
  const [homeUse, setHomeUse] = useState({ gas: 0, CO2: 0 });

  useEffect(() => {
    getYears().then(({ data }) => {
      setYears(data.menuItem.map((item) => item.value));
    });
  }, []);

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
    }
  };

  const journeyDistance = (distance) => {
    setJourney({ distance, CO2: 0 });
  };

  const journeyCO2 = () => {
    getGPM(car.id).then(({ data }) => {
      console.log(data.co2TailpipeGpm);
      setCar({
        year: car.year,
        make: car.make,
        model: car.model,
        option: car.option,
        id: car.id,
        gpm: data.co2TailpipeGpm,
      });
      setJourney({
        distance: journey.distance,
        CO2: (+journey.distance * +data.co2TailpipeGpm) / 1000,
      });
    });
  };

  const updatePostcode = (postcode) => {
    setPostcode(postcode);
  };

  const updateRange = (date, option) => {
    if (option === 'from') {
      setdateRange({ from: date, to: dateRange.to });
    } else setdateRange({ from: dateRange.from, to: date });
  };

  const updateElecUse = (elec) => {
    setHomeUse({
      intensity: homeUse.intensity,
      elec,
      gas: homeUse.gas,
      CO2: 0,
    });
  };

  const updateGasUse = (gas) => {
    if (gas) {
      setHomeUse({
        intensity: homeUse.intensity,
        elec: homeUse.elec,
        gas,
        CO2: 0,
      });
    }
  };

  const homeCO2 = () => {
    let sum = 0;
    let entries = 0;
    let intensity = 0;
    const gasCO2 = 0.185; //kg per kWh- varies with efficiency of boiler

    getIntensity(dateRange.from, dateRange.to, postcode).then(({ data }) => {
      entries += data.data.data.length;
      data.data.data.map((entry) => {
        //console.log(entry);
        return (sum += entry.intensity.forecast);
      });
      intensity = sum / entries;
      console.log(homeUse);
      let CO2 = (+homeUse.elec * +intensity + homeUse.gas * gasCO2) / 1000;
      setHomeUse({ intensity, elec: homeUse.elec, gas: homeUse.gas, CO2 });
    });
  };

  return (
    <div className="overallContainer">
      <center>
        <h1>What's my footprint?</h1>
      </center>
      <CarForms
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
      />
      <Home
        homeCO2={homeCO2}
        updatePostcode={updatePostcode}
        updateRange={updateRange}
        postcode={postcode}
        dateRange={dateRange}
        updateElecUse={updateElecUse}
        updateGasUse={updateGasUse}
        homeUse={homeUse}
      />
      <Footprint journey={journey} homeUse={homeUse} />
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
