import React, { useState, useEffect } from 'react';
import Header from './Header';
import CityWeatherCard from './CityWeather';
import DailySummary from './DailySummary';
import Alert from './Alert';
import Pos from "../config"



const WeatherDashboard = () => {
  const [cities, setCities] = useState([]);
  const [dailySummary, setDailySummary] = useState([]);
  const [alert, setAlert] = useState("");
  const [showDaily, setShowDaily] = useState(false);
  // const [historicalData, setHistoricalData] = useState([]);
  const [temp, setTemp] = useState(["C","C"]);

  const ToFahrenheit = (t) => {
    if(temp[0].toLowerCase() == 'c' ){
      return ((t * 9/5) + 32).toFixed(2);
    }else if(temp[0].toLowerCase() == 'k'){
      return ((t - 273.15) * 9/5 + 32).toFixed(2);
    }
    return t;
  };
  
  const ToKelvin = (t) => {
    if(temp[0].toLowerCase() == 'c'){
      return (t + 273.15).toFixed(2);
    }else if(temp[0].toLowerCase() == 'f'){
      return ((t - 32) * 5/9 + 273.15).toFixed(2);
    }
    return t;
  };
  
  const ToCelcius = (t) => {
    if(temp[0].toLowerCase() == 'f'){
      return ((t - 32) * 5/9).toFixed(2);
    }else if(temp[0].toLowerCase() == 'k'){
      return (t - 273.15).toFixed(2);
    }
    return t;
  };
  
  const changeTemp = () =>{
    if(temp[1].toLowerCase() == 'f'){ 
      const updatedDetails = cities.map(city => {
        return {
          ...city,
          weatherData: {
            ...city.weatherData,
            temp: ToFahrenheit(city.weatherData.temp),
            feels_like: ToFahrenheit(city.weatherData.feels_like)
          }
        };
      });
      const dai = dailySummary.map(d =>{
        return {
          ...d,
          avgTemp: ToFahrenheit(d.avgTemp),
          maxTemp: ToFahrenheit(d.maxTemp),
          minTemp: ToFahrenheit(d.minTemp),
        }
      })
      setDailySummary(dai)
      setCities(updatedDetails)
    }else if(temp[1].toLowerCase() == 'k'){
      const updatedDetails = cities.map(city => {
        return {
          ...city,
          weatherData: {
            ...city.weatherData,
            temp: ToKelvin(city.weatherData.temp),
            feels_like: ToKelvin(city.weatherData.feels_like)
          }
        };
      });
      const dai = dailySummary.map(d =>{
        return {
          ...d,
          avgTemp: ToKelvin(d.avgTemp),
          maxTemp: ToKelvin(d.maxTemp),
          minTemp: ToKelvin(d.minTemp),
        }
      })
      setDailySummary(dai)
      setCities(updatedDetails)
    }
    else if(temp[1].toLowerCase() == 'c'){
      const updatedDetails = cities.map(city => {
        return {
          ...city,
          weatherData: {
            ...city.weatherData,
            temp: ToCelcius(city.weatherData.temp),
            feels_like: ToCelcius(city.weatherData.feels_like)
          }
        };
      });
      const dai = dailySummary.map(d =>{
        return {
          ...d,
          avgTemp: ToCelcius(d.avgTemp),
          maxTemp: ToCelcius(d.maxTemp),
          minTemp: ToCelcius(d.minTemp),
        }
      })
      setDailySummary(dai)
      setCities(updatedDetails)
    }
  }

  useEffect(()=>{
    console.log(temp)
    changeTemp()
  },[temp])
  

  const fetchWeatherData = async () => {
    const details = []
    const daily = []

    try {
      for(const city of Pos().cities){
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        details.push({
          name: city.name,
          weatherData:{
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            main: data.weather[0].main,
            dt: data.dt,
          }
        });
        
        daily.push({
          name: city.name,
          avgTemp: data.main.temp,
          maxTemp: data.main.temp_max,
          minTemp: data.main.temp_min,
          dominantCondition: data.weather[0].main,
        })
      }

      setCities(details);
      setDailySummary(daily)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();

    const intervalId = setInterval(() => {
      fetchWeatherData();
    }, 300000); 
    
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="container mx-auto p-6">
      <Header />
        {alert.length > 0  && (
        <div className="mb-6">
          <Alert message={alert} />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-center">Real-Time Weather Monitoring Dashboard</h1>

      <input type="text" className='p-2 mb-3 rounded-md w-[400px]' placeholder='temperature units ( C, F, K )' 
      onChange={
        (e) => {
        if (e.target.value.toLowerCase() == 'c' || 
        e.target.value.toLowerCase() == 'f' || 
        e.target.value.toLowerCase() == 'k') {
          setTemp([temp[1],e.target.value])
          setAlert("");
        }else{
          setAlert("Wrong unit of temperature");
        }
      }}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {cities.map((city, index) => (
          <CityWeatherCard key={index} city={city.name} weatherData={city.weatherData} temp={temp} />
        ))}
      </div>

      <button className='mb-5' onClick={() => setShowDaily(!showDaily)}>Show Daily Summary</button>

      {/* Daily Summary */}
      {showDaily && dailySummary && (
        <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">Daily Summary</h2>
        {dailySummary.map((daily) =>(
          <DailySummary summary={daily} temp={temp}/>
        ))}
        </div>
      )}

    </div>
  );
};

export default WeatherDashboard;
