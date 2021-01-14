const axios = require('axios');

const base_carUrl = 'https://www.fueleconomy.gov/ws/rest/vehicle/';
const base_elecUrl = 'https://api.carbonintensity.org.uk/regional/intensity/';

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
  return get(`${base_elecUrl}${from}/${to}/postcode/${postcode}`);
}

function get(url) {
  return axios
    .get(url)
    .then((result) => (result.status < 400 ? result : Promise.reject(result)));
}
