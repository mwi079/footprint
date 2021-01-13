import React, { useEffect, useState } from 'react';
import {
  getMakes,
  getYears,
  getModels,
  getOptions,
  getGPM,
} from './ApiService';
import CarForms from './carForms/forms';
import Footprint from './footprint/footprint';
//import Distance from './distanceForms/distance';

function App() {
  const [car, setCar] = useState({});
  const [journey, setJourney] = useState({});

  const [years, setYears] = useState(['years']);
  const [makes, setMakes] = useState(['makes']);
  const [models, setModels] = useState(['models']);
  const [options, setOptions] = useState(['options']);

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
      <Footprint journey={journey} />
    </div>
  );
}

export default App;
