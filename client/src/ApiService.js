const axios=require('axios');

const base_carUrl='https://www.fueleconomy.gov/ws/rest/vehicle/menu/'

export function getYears() {
  return get(base_carUrl+'year')
}

function get(url) {
  return axios.get(url)
    .then(result=>result.status<400? result:Promise.reject(result))
    //.then(result=>result.status!==204? result.json(): result)})
}