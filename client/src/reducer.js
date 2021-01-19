import { useReducer } from 'react';
import moment from 'moment';

const initialState = {
  carView: false,
  homeView: false,
  resultsView: false,
  worldView: false,
  car: {},
  journey: { distance: 0, CO2: 0 },
  distanceUnits: 'Miles',
  carCompare: {},
  elec: false,
  years: ['years'],
  makes: ['makes'],
  models: ['models'],
  options: ['options'],
  postcode: '',
  dateRange: {
    from: moment().subtract(1, 'd').format('YYYY-MM-DDTHH:MM'),
    to: moment().format('YYYY-MM-DDTHH:MM'),
  },
  homeUse: { elec: 0, gas: 0, CO2: 0 },
  genMix: [],
  gasUnits: 'kWh',
  elecUnits: 'kWh',
  CO2Trend: [],
  CO2timeTrend: [],
  tempTrend: [],
  tempTimeTrend: [],
};
function reducer(state, action) {
  switch (action.type) {
    case 'carView':
      return {
        ...state,
        carView: action.payload,
      };
    case 'homeView':
      return {
        ...state,
        howeView: action.payload,
      };
    case 'resultsView':
      return {
        ...state,
        resultsView: action.payload,
      };
    case 'worldView':
      return {
        ...state,
        worldView: action.payload,
      };
    case 'car':
      return {
        ...state,
        car: action.payload,
      };
    case 'journey':
      return {
        ...state,
        journey: action.payload,
      };
    case 'distanceUnits':
      return {
        ...state,
        distanceUnits: action.payload,
      };
    case 'carCompare':
      return {
        ...state,
        carCompare: action.payload,
      };
    case 'elec':
      return {
        ...state,
        elec: action.payload,
      };
    case 'years':
      return {
        ...state,
        years: action.payload,
      };
    case 'makes':
      return {
        ...state,
        makes: action.payload,
      };
    case 'models':
      return {
        ...state,
        models: action.payload,
      };
    case 'options':
      return {
        ...state,
        options: action.payload,
      };
    case 'postcode':
      return {
        ...state,
        postcode: action.payload,
      };
    case 'dateRange':
      return {
        ...state,
        dateRande: action.payload,
      };
    case 'homeUse':
      return {
        ...state,
        homeUse: action.payload,
      };
    case 'genMix':
      return {
        ...state,
        genMix: action.payload,
      };
    case 'gasUnits':
      return {
        ...state,
        gasUnits: action.payload,
      };
    case 'elecUnits':
      return {
        ...state,
        elecUnits: action.payload,
      };
    case 'CO2Trend':
      return {
        ...state,
        CO2Trend: action.payload,
      };
    case 'CO2timeTrend':
      return {
        ...state,
        CO2timeTrend: action.payload,
      };
    case 'tempTrend':
      return {
        ...state,
        tempTrend: action.payload,
      };
    case 'tempTimeTrend':
      return {
        ...state,
        tempTimeTrend: action.payload,
      };
    default:
      throw new Error();
  }
}
const Store = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};
export { Store };
