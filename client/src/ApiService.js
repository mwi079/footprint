const axios=require('axios');

const base_carUrl='https://www.fueleconomy.gov/ws/rest/vehicle/menu/'

export function getYears() {
  return get(base_carUrl+'year')
}

export function getMakes(year) {
  return get(`${base_carUrl}make?year=${year}`)
}

export function getModels(make,{year}) {
  return get(`${base_carUrl}model?year=${year}&make=${make}`)
}

function get(url) {
  return axios.get(url)
    .then(result=>result.status<400? result:Promise.reject(result))
}