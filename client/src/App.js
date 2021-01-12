import React, {useEffect, useState} from 'react';
import {getYears} from './ApiService'



function App() {

const [years, setYears] = useState([]);

useEffect (()=>{
  getYears()
    .then(({data})=>{
      setYears(data.menuItem.map(item=>item.value))
    })
})

  return (
    years.map(year=>{
      return <div>{year}</div>
    }
  ))
}

export default App;
