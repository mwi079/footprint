import React, {useEffect, useState} from 'react';
import {getMakes, getYears} from './ApiService'
import Forms from './carForms/forms'


function App() {

const [years, setYears] = useState([]);
const [makes, setMakes] = useState([]);

useEffect (()=>{
  getYears()
    .then(({data})=>{
      setYears(data.menuItem.map(item=>item.value))
    })
})

const makesOfYear = (year) =>{
  getMakes(year)
  .then(({ data }) => {
    setMakes(data.menuItem.map((item) => item.value));
  });
}

  return (
    <Forms years={years} makes={makes} makesOfYear={makesOfYear}/>
  )
}

export default App;
