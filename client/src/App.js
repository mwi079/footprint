import React, { useEffect, useState } from 'react';
//import { Store } from './reducer';
import { DriveEtaSharp, HomeSharp, PublicSharp } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import {
  getMakes,
  getYears,
  getModels,
  getOptions,
  getGPM,
  getIntensity,
  getCharge,
  getCO2Trend,
  getTempTrend,
} from './ApiService';
import { homeUnits, carUnits, compareCO2 } from './helper';
import Car from './car/car';
import Footprint from './footprint/footprint';
import Home from './houseForms/home';
import Trend from './trends/trend';
import { ReactComponent as Foot } from './footprint.svg';
import moment from 'moment';
import './index.css';

function App() {
  // const [state, dispatch] = Store();
  // const {
  //   carView,
  //   homeView,
  //   resultsView,
  //   worldView,
  //   car,
  //   journey,
  //   distanceUnits,
  //   carCompare,
  //   elec,
  //   years,
  //   makes,
  //   models,
  //   options,
  //   postcode,
  //   dateRange,
  //   homeUse,
  //   genMix,
  //   gasUnits,
  //   elecUnits,
  //   CO2Trend,
  //   CO2timeTrend,
  //   tempTrend,
  //   tempTimeTrend,
  // }=state

  const [carView, setCarView] = useState(false);
  const [homeView, setHomeView] = useState(false);
  const [resultsView, setResultView] = useState(false);
  const [worldView, setWorldView] = useState(false);

  const [car, setCar] = useState({});
  const [journey, setJourney] = useState({ distance: 0, CO2: 0 });
  const [distanceUnits, setDistanceUnits] = useState('Miles');
  const [carCompare, setCarCompare] = useState({});
  const [elec, setElec] = useState(false);

  const [years, setYears] = useState(['years']);
  const [makes, setMakes] = useState(['makes']);
  const [models, setModels] = useState(['models']);
  const [options, setOptions] = useState(['options']);

  const [postcode, setPostcode] = useState('');
  const [dateRange, setdateRange] = useState({
    from: moment().subtract(1, 'd').format('YYYY-MM-DDTHH:MM'),
    to: moment().format('YYYY-MM-DDTHH:MM'),
  });
  const [homeUse, setHomeUse] = useState({ elec: 0, gas: 0, CO2: 0 });
  const [genMix, setGenMix] = useState([]);
  const [gasUnits, setGasUnits] = useState('kWh');
  const [elecUnits, setElecUnits] = useState('kWh');

  const [CO2Trend, setCO2Trend] = useState([]);
  const [CO2timeTrend, setCO2TimeTrend] = useState([]);
  const [tempTrend, setTempTrend] = useState([]);
  const [tempTimeTrend, setTempTimeTrend] = useState([]);

  const generationMix = Array(9).fill(0);
  const erange = 0.3; //kWh per mile

  useEffect(() => {
    getYears().then(({ data }) => {
      setYears(data.menuItem.map((item) => item.value));
    });
    getCharge().then(({ data }) => {
      setCarCompare({
        intensity: data.data[0].intensity.forecast,
        compare: (data.data[0].intensity.forecast * erange) / 1000,
        CO2: 0,
      });
    });
    getCO2Trend().then(({ data }) => {
      data.co2.map((entry, i) => {
        if (i % 30 === 0) {
          let time = `${entry.year}-${entry.month}-${entry.day}`;
          time = moment(time).format('YYYY-MM');
          setCO2TimeTrend((timeTrend) => [...timeTrend, time]);
          return setCO2Trend((CO2Trend) => [...CO2Trend, entry.trend]);
        } else return null;
      });
    });
    getTempTrend().then(({ data }) => {
      data.result.map((entry) => {
        if (+entry.time > 2011) {
          let month = Math.round(365 * (entry.time.slice(5, 7) / 100 / 30));
          if (month === 0) {
            month = 1;
          }
          let year = entry.time.slice(0, 4);
          let time = `${year}-${month}`;
          time = moment(time).format('YYYY-MM');
          setTempTimeTrend((tempTimeTrend) => [...tempTimeTrend, time]);
          return setTempTrend((tempTrend) => [...tempTrend, +entry.station]);
        } else return null;
      });
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
      em: '',
    });
    setJourney({ distance: 0, CO2: 0 });
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
      em: '',
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
      em: '',
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
      em: '',
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
        em: '',
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
        gpm: +data.co2TailpipeGpm,
        em: +data.cityE,
      });
      if (+data.co2TailpipeGpm !== 0) setElec(false);
      else setElec(true);

      let CO2 = carUnits(data, journey, distanceUnits, carCompare);
      let carCompareCO2 = compareCO2(carCompare, journey, distanceUnits);

      setJourney({
        distance: journey.distance,
        CO2,
      });
      setCarCompare({
        intensity: carCompare.intensity,
        compare: carCompare.compare,
        CO2: carCompareCO2,
      });
    });
  };
  const toggleViewHome = () => {
    setHomeView(!homeView);
  };

  const refreshHome = () => {
    setPostcode('');
    setHomeUse({ elec: 0, gas: 0, CO2: 0 });
    setdateRange({
      from: moment().subtract(1, 'd').format('YYYY-MM-DDTHH:MM'),
      to: moment().format('YYYY-MM-DDTHH:MM'),
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

  const changeElecUnits = (event) => {
    event.preventDefault();
    setElecUnits(event.target.value);
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
          (Math.round(entry / entries) * 100) / 100).toFixed(2);
      });

      CO2 = homeUnits(intensity, gasUnits, elecUnits, homeUse);

      setHomeUse({ intensity, elec: homeUse.elec, gas: homeUse.gas, CO2 });

      setGenMix(generationMix);
    });
  };

  const toggleResultsView = () => {
    setResultView(!resultsView);
  };

  const toggleWorldView = () => {
    setWorldView(!worldView);
  };

  return (
    <div className="overallContainer">
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
      {resultsView ? (
        <Footprint
          journey={journey}
          homeUse={homeUse}
          genMix={genMix}
          elec={elec}
          carCompare={carCompare}
          toggleResultsView={toggleResultsView}
        />
      ) : null}

      <center>
        {carView && homeView ? null : <h1>What energy do I use?</h1>}
        {carView ? null : (
          <Tooltip title="My Car" placement="right-start">
            <DriveEtaSharp
              className="button"
              color="primary"
              style={{ fontSize: 200 }}
              onClick={toggleViewCar}
              title="My Car"
            />
          </Tooltip>
        )}
        {homeView ? null : (
          <Tooltip title="My Home" placement="right-start">
            <HomeSharp
              className="button"
              color="primary"
              style={{ fontSize: 200 }}
              onClick={toggleViewHome}
            />
          </Tooltip>
        )}

        {resultsView ? null : (
          <>
            <h1>What's my footprint?</h1>
            <p></p>
            <Tooltip title="My Footprint" placement="right-start">
              <Foot className="button" id="foot" onClick={toggleResultsView} />
            </Tooltip>
            <p></p>
          </>
        )}
      </center>
      <center>
        {worldView ? null : (
          <>
            <h1>Why does it matter?</h1>
            <Tooltip title="Our Home" placement="right-start">
              <PublicSharp
                className="button"
                color="primary"
                style={{ fontSize: 200 }}
                onClick={toggleWorldView}
              />
            </Tooltip>
          </>
        )}
      </center>
      {worldView ? (
        <Trend
          CO2Trend={CO2Trend}
          CO2timeTrend={CO2timeTrend}
          tempTrend={tempTrend}
          tempTimeTrend={tempTimeTrend}
          toggleWorldView={toggleWorldView}
        />
      ) : null}
    </div>
  );
}

export default App;
