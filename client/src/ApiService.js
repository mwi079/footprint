import { toOutcode } from 'postcode';
const axios = require('axios');
const base_carUrl = 'https://www.fueleconomy.gov/ws/rest/vehicle/';
const base_elecUrl = 'https://api.carbonintensity.org.uk/regional/intensity/';
const charge_Url = 'https://api.carbonintensity.org.uk/intensity';
const CO2_Url = 'https://global-warming.org/api/co2-api';
const temp_Url = 'https://global-warming.org/api/temperature-api';

export function getYears() {
  return get(base_carUrl + 'menu/year');
}

export function getMakes(year) {
  return get(`${base_carUrl}menu/make?year=${year}`);
}

export function getModels(make, { year }) {
  return get(`${base_carUrl}menu/model?year=${year}&make=${make}`);
}

export function getOptions(model, { year, make }) {
  return get(
    `${base_carUrl}menu/options?year=${year}&make=${make}&model=${model}`
  );
}

export function getGPM(id) {
  return get(`${base_carUrl}${id}`);
}

export function getIntensity(from, to, postcode) {
  return get(`${base_elecUrl}${from}/${to}/postcode/${toOutcode(postcode)}`);
}

export function getCharge() {
  return get(charge_Url);
}

export function getCO2Trend() {
  return get(CO2_Url);
}

export function getTempTrend() {
  return get(temp_Url);
}

function get(url) {
  return axios
    .get(url)
    .then((result) => (result.status < 400 ? result : Promise.reject(result)));
}
