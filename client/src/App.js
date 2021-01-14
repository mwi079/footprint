import React, { useEffect, useState } from 'react';
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
  const [journey, setJourney] = useState({});

  const [years, setYears] = useState(['years']);
  const [makes, setMakes] = useState(['makes']);
  const [models, setModels] = useState(['models']);
  const [options, setOptions] = useState(['options']);

  const [postcode, setPostcode] = useState('');
  const [dateRange, setdateRange] = useState({});
  const [homeUse, setHomeUse] = useState({});

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
    setJourney({ distance, CO2: '' });
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
    console.log('date', date);
    console.log('option', option);
    if (option === 'from') {
      setdateRange({ from: date, to: dateRange.to });
    } else setdateRange({ from: dateRange.from, to: date });
  };

  const intensity = () => {
    let sum = 0;
    let entries = 0;
    let average = 0;
    getIntensity(dateRange.from, dateRange.to, postcode).then(({ data }) => {
      entries = data.data.data.length;
      data.data.data.map((entry) => (sum += entry.intensity.forecast));
      average = sum / entries;
    });
    setHomeUse({ intensity: average, usage: homeUse.usage, CO2: '' });
  };

  const homeUsage = () => {};

  const homeCO2 = () => {
    //todo
  };

  return (
    <div className="overallContainer">
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
        intensity={intensity}
        updatePostcode={updatePostcode}
        updateRange={updateRange}
        postcode={postcode}
        dateRange={dateRange}
      />
      <Footprint journey={journey} />
    </div>
  );
}

export default App;
