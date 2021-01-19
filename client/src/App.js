import React, { useEffect } from 'react';
import { Store } from './reducer';
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
  const [state, dispatch] = Store();
  const {
    carView,
    homeView,
    resultsView,
    worldView,
    car,
    journey,
    distanceUnits,
    carCompare,
    elec,
    years,
    makes,
    models,
    options,
    postcode,
    dateRange,
    homeUse,
    genMix,
    gasUnits,
    elecUnits,
    CO2Trend,
    CO2timeTrend,
    tempTrend,
    tempTimeTrend,
  } = state;

  const generationMix = Array(9).fill(0);
  const erange = 0.3; //kWh per mile

  useEffect(() => {
    getYears().then(({ data }) => {
      let array = [];
      data.menuItem.map((item) => array.push(item.value));
      dispatch({ type: 'years', payload: array });
    });

    getCharge().then(({ data }) => {
      dispatch({
        type: 'carCompare',
        payload: {
          intensity: data.data[0].intensity.forecast,
          compare: (data.data[0].intensity.forecast * erange) / 1000,
          CO2: 0,
        },
      });
    });
    getCO2Trend().then(({ data }) => {
      let array = [];
      let arrayt = [];
      data.co2.map((entry, i) => {
        if (i % 30 === 0) {
          let time = `${entry.year}-${entry.month}-${entry.day}`;
          time = moment(time).format('YYYY-MM');
          arrayt.push(time);
          array.push(entry.trend);
          return true;
        }
        return false;
      });
      dispatch({
        type: 'CO2Trend',
        payload: array,
      });
      dispatch({
        type: 'CO2timeTrend',
        payload: arrayt,
      });
    });
    getTempTrend().then(({ data }) => {
      let array = [];
      let arrayt = [];
      data.result.map((entry) => {
        if (+entry.time > 2011) {
          let month = Math.round(365 * (entry.time.slice(5, 7) / 100 / 30));
          if (month === 0) {
            month = 1;
          }
          let year = entry.time.slice(0, 4);
          let time = `${year}-${month}`;
          time = moment(time).format('YYYY-MM');
          arrayt.push(time);
          array.push(entry.station);

          return true;
        } else return false;
      });
      dispatch({
        type: 'tempTrend',
        payload: array,
      });
      dispatch({
        type: 'tempTimeTrend',
        payload: arrayt,
      });
    });
  }, []);

  const toggleViewCar = () => {
    dispatch({ type: 'carView', payload: !carView });
  };

  const refreshCar = () => {
    dispatch({ type: 'makes', payload: ['makes'] });
    dispatch({ type: 'models', payload: ['models'] });
    dispatch({ type: 'options', payload: ['options'] });
    dispatch({
      type: 'car',
      payload: {
        year: '',
        make: '',
        model: '',
        option: '',
        id: '',
        gpm: '',
        em: '',
      },
    });
    dispatch({ type: 'journey', payload: { distance: 0, CO2: 0 } });
  };

  const makesOfYear = (year) => {
    dispatch({ type: 'makes', payload: ['makes'] });
    dispatch({ type: 'models', payload: ['models'] });
    dispatch({ type: 'options', payload: ['options'] });
    dispatch({
      type: 'car',
      payload: {
        year,
        make: '',
        model: '',
        option: '',
        id: '',
        gpm: '',
        em: '',
      },
    });
    dispatch({
      type: 'journey',
      payload: { distance: journey.distance, CO2: 0 },
    });

    if (year !== null) {
      getMakes(year).then(({ data }) => {
        let array = [];
        data.menuItem.map((item) => array.push(item.value));
        dispatch({ type: 'makes', payload: array });
      });
    }
  };

  const modelsOfMakes = (make) => {
    dispatch({ type: 'models', payload: ['models'] });
    dispatch({ type: 'options', payload: ['options'] });
    dispatch({
      type: 'car',
      payload: {
        year: car.year,
        make,
        model: '',
        option: '',
        id: '',
        gpm: '',
        em: '',
      },
    });
    dispatch({
      type: 'journey',
      payload: { distance: journey.distance, CO2: 0 },
    });

    if (make !== null) {
      getModels(make, car).then(({ data }) => {
        let array = [];
        data.menuItem.map((item) => array.push(item.value));
        dispatch({ type: 'models', payload: array });
      });
    }
  };

  const optionsOfModels = (model) => {
    dispatch({ type: 'options', payload: ['options'] });
    dispatch({
      type: 'car',
      payload: {
        year: car.year,
        make: car.make,
        model,
        option: '',
        id: '',
        gpm: '',
        em: '',
      },
    });

    dispatch({
      type: 'journey',
      payload: { distance: journey.distance, CO2: 0 },
    });
    if (model !== null) {
      getOptions(model, car).then(({ data }) => {
        let array = [];
        if (data.menuItem.length) {
          data.menuItem.map((item) => array.push(item));
          dispatch({ type: 'options', payload: array });
        } else {
          dispatch({ type: 'options', payload: [data.menuItem] });
        }
      });
    }
  };

  const getCarID = (option) => {
    console.log('hello');
    if (option !== null) {
      dispatch({
        type: 'car',
        payload: {
          year: car.year,
          make: car.make,
          model: car.model,
          option: option.text,
          id: option.value,
          gpm: '',
          em: '',
        },
      });
    } else {
      dispatch({
        type: 'car',
        payload: {
          year: car.year,
          make: car.make,
          model: car.model,
          option: '',
          id: '',
          gpm: '',
          em: '',
        },
      });

      dispatch({
        type: 'journey',
        payload: { distance: journey.distance, CO2: 0 },
      });
    }
  };

  const toggleDistanceUnits = (event) => {
    event.preventDefault();
    dispatch({ type: 'distanceUnits', payload: event.target.value });
    dispatch({
      type: 'journey',
      payload: { distance: journey.distance, CO2: 0 },
    });
  };

  const journeyDistance = (distance) => {
    dispatch({
      type: 'journey',
      payload: { distance, CO2: 0 },
    });
  };

  const journeyCO2 = () => {
    getGPM(car.id).then(({ data }) => {
      dispatch({
        type: 'car',
        payload: {
          year: car.year,
          make: car.make,
          model: car.model,
          option: car.option,
          id: car.id,
          gpm: +data.co2TailpipeGpm,
          em: +data.cityE,
        },
      });

      if (+data.co2TailpipeGpm !== 0)
        dispatch({ type: 'elec', payload: false });
      else dispatch({ type: 'elec', payload: true });

      let CO2 = carUnits(data, journey, distanceUnits, carCompare);
      let carCompareCO2 = compareCO2(carCompare, journey, distanceUnits);

      dispatch({
        type: 'journey',
        payload: { distance: journey.distance, CO2 },
      });
      dispatch({
        type: 'carCompare',
        payload: {
          intensity: carCompare.intensity,
          compare: carCompare.compare,
          CO2: carCompareCO2,
        },
      });
    });
  };
  const toggleViewHome = () => {
    dispatch({ type: 'homeView', payload: !homeView });
  };

  const refreshHome = () => {
    dispatch({ type: 'postcode', payload: '' });
    dispatch({ type: 'homeUse', payload: { elec: 0, gas: 0, CO2: 0 } });
    dispatch({
      type: 'dateRange',
      payload: {
        from: moment().subtract(1, 'd').format('YYYY-MM-DDTHH:MM'),
        to: moment().format('YYYY-MM-DDTHH:MM'),
      },
    });
  };

  const updatePostcode = (postcode) => {
    dispatch({ type: 'postcode', payload: postcode });
  };

  const updateRange = (date, option) => {
    if (option === 'from') {
      dispatch({
        type: 'dateRange',
        payload: { from: date, to: dateRange.to },
      });
    } else
      dispatch({
        type: 'dateRange',
        payload: { from: dateRange.from, to: date },
      });
  };

  const changeElecUnits = (event) => {
    event.preventDefault();
    dispatch({ type: 'elecUnits', payload: event.target.value });
  };

  const updateElecUse = (elec) => {
    dispatch({
      type: 'homeUse',
      payload: {
        intensity: homeUse.intensity,
        elec,
        gas: homeUse.gas,
        CO2: 0,
      },
    });
  };

  const changeGasUnits = (event) => {
    event.preventDefault();
    dispatch({ type: 'gasUnits', payload: event.target.value });
  };

  const updateGasUse = (gas) => {
    dispatch({
      type: 'homeUse',
      payload: {
        intensity: homeUse.intensity,
        elec: homeUse.elec,
        gas,
        CO2: 0,
      },
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

      dispatch({
        type: 'homeUse',
        payload: {
          intensity,
          elec: homeUse.elec,
          gas: homeUse.gas,
          CO2,
        },
      });
      dispatch({ type: 'genMix', payload: generationMix });
    });
  };

  const toggleResultsView = () => {
    dispatch({ type: 'resultsView', payload: !resultsView });
  };

  const toggleWorldView = () => {
    dispatch({ type: 'worldView', payload: !worldView });
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
          <Tooltip title="My Car" placement="left-start">
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
