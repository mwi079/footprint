import React, {useEffect, useState} from 'react';
import {getMakes, getYears, getModels} from './ApiService'
import Forms from './carForms/forms'


function App() {

  const [car,setCar] =useState ({})

  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  useEffect (()=>{
    getYears()
      .then(({data})=>{
        setYears(data.menuItem.map(item=>item.value))
      })
  },[])

  const makesOfYear = (year) =>{
    setCar({year,make:'',model:'', option:'', id:''})
    getMakes(year)
    .then(({ data }) => {
      setMakes(data.menuItem.map((item) => item.value));
    });
  }

  const modelsOfMakes = (make) =>{
    getModels(make,car)
    .then(({ data }) => {
      setModels(data.menuItem.map((item) => item.value));
    });
  }

    return (
      <Forms years={years} makes={makes} models={models} makesOfYear={makesOfYear} modelsOfMakes={modelsOfMakes}/>
    )
  }

export default App;
