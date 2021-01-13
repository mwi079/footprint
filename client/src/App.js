import React, { useEffect, useState } from 'react';
import { getMakes, getYears, getModels, getOptions } from './ApiService';
import Forms from './carForms/forms';
import Footprint from './footprint/footprint';

function App() {
  const [car, setCar] = useState({});

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
    setCar({
      year,
      make: '',
      model: '',
      option: '',
      id: '',
    });
    getMakes(year).then(({ data }) => {
      setMakes(data.menuItem.map((item) => item.value));
    });
  };

  const modelsOfMakes = (make) => {
    setCar({
      year: car.year,
      make,
      model: '',
      option: '',
      id: '',
    });
    getModels(make, car).then(({ data }) => {
      setModels(data.menuItem.map((item) => item.value));
    });
  };

  const optionsOfModels = (model) => {
    setCar({
      year: car.year,
      make: car.make,
      model,
      option: '',
      id: '',
    });
    getOptions(model, car).then(({ data }) => {
      if (data.menuItem.length) setOptions(data.menuItem.map((item) => item));
      else getCarID(data.menuItem);
    });
  };

  const getCarID = (option) => {
    setCar({
      year: car.year,
      make: car.make,
      model: car.model,
      option: option.text,
      id: option.value,
    });
    console.log(option);
  };

  return (
    <div>
      <Forms
        years={years}
        makes={makes}
        models={models}
        options={options}
        makesOfYear={makesOfYear}
        modelsOfMakes={modelsOfMakes}
        optionsOfModels={optionsOfModels}
        getCarID={getCarID}
      />
      <Footprint car={car} />
    </div>
  );
}

export default App;
