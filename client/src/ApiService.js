const axios=require('axios');

const base_carUrl='https://www.fueleconomy.gov/ws/rest/vehicle/menu/'

export function getYears() {
  return get(base_carUrl+'year')
}

export function getMakes(year) {
  return get(`${base_carUrl}make?year=${year}`)
}

function get(url) {
  return axios.get(url)
    .then(result=>result.status<400? result:Promise.reject(result))
}