//api.openweathermap.org/data/2.5/weather?q=nagpur&appid=1b51349b0e467a3b46158e8aeeb82ae9

import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from './weathercard'

const Temp = () => {

    //state variable
    const [searchValue, setSearchValue] = useState("Nagpur")

    const [tempInfo, setTempInfo]= useState({})

    const getWeatherInfo = async () =>
    {
        try {
            //weather api 
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric
            &appid=${process.env.REACT_APP_API_KEY}`
         
            let res= await fetch(url) // response variable jisme data fetch ho raha hai url(api) se
            let data =await res.json() // converting the response data into readable form i.e. json

          //object destructuring
          const  {temp, humidity, pressure} = data.main // temperature  ka data temp variable mai liya humidity ka humidity and pressure ka pressure ke andar api ke andar jo values hai wo dekhke
          const {main: weathermood}= data.weather[0]
           const {name}= data
           const {speed}= data.wind
           const {country, sunset}= data.sys

           const myNewWeatherInfo = { temp, humidity, pressure, weathermood,name,speed,country,sunset,}
            
           setTempInfo(myNewWeatherInfo)

        } catch (error) {
            console.log(error)
        }
    }
     useEffect(() => {
        getWeatherInfo();
     },[])

  return (
    <>
    <div className='wrap'>
        <div className='search'>
            <input type='search' placeholder='search...' 
            autoFocus id='search' className='searchTerm'
            value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            
            <button className='searchButton'
            type='button' 
            onClick={getWeatherInfo}>
            Search
            </button>
        </div> 
    </div>
 {/*  passing tempInfo as a props in tempInfo attribute inside Weathercard component*/}
    <Weathercard tempInfo={tempInfo} /> {/* calling the Weathercard component inside Temp component (nested component) */}

<div className='copyright'>
© 2023 Sakshi Gatkine. All Rights Reserved | Terms And Conditions
</div>

</>
  )
}

export default Temp;
