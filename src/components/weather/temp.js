import React, { useEffect, useState } from 'react';
import Weathercard from  './weathercard';
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Delhi");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=32316d74384aeec32d0f56d29b52be8b`

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure} = data.main;
      const { main: weathermood } = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;

        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset,
        };

        setTempInfo(myNewWeatherInfo);
    } catch(error){
      alert("City not Found 😔😔😓");
      //console.log(error);
    }
   };

  useEffect(() => {
    getWeatherInfo();
    document.title = "Weather App";
    // eslint-disable-next-line
  },[]);
  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search"
            placeholder='search...' autoFocus
            id='search'
            className='searchTerm' 
            value={ searchValue} onChange={(e)=>setSearchValue(e.target.value)}  />
          <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
    </div>
   
      <Weathercard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp
