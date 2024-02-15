import React, { createContext, useReducer, useEffect, useContext } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";

const initialState = {
  weatherData: null,
  dailyData: null,
  hourlyData: null,
  cityName: "",
  temp: 0,
  humidity: 0,
  imgCode: "",
  isLoading: true,
  cloudiness: 0,
};
//Current time
// const API_KEY = "appid=eaa3da3a6a72d6e09221b5f51b582cd6";
const API_KEY = "appid=07bc2c94b8a779be1f318d29753d0927";

// const NEW_API = `https://api.openweathermap.org/data/3.0/onecall?lat=${defaultLat}&lon=${defaultLot}&${API_KEY}`;
const WeatherContext = createContext();

const weatherReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SET_DATA":
      return {
        ...state,
        cityName: action.payload.name,
        imgCode: action.payload.sys.country,
      };
    case "SET_NEW_DATA":
      console.log("Received new data:", action.payload);
      return {
        ...state,
        weatherData: action.payload,
        hourlyData: action.payload.hourly,
        humidity: action.payload.current.humidity, // Potential source of the error
        isLoading: false,
        cloudiness: action.payload.current.clouds,
        temp: Math.round(action.payload.current?.temp - 273.15),
        dailyData: action.payload.daily,
      };

    case "SET_TEMP":
      return {
        ...state,
        temp: action.payload,
        isLoading: false,
      };
    case "SET_HOURLY":
      return {
        ...state,
        hourlyForecast: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const [lat, lon] = useUrlPosition();

  // Provide default values for lat and lon if they are undefined
  const defaultLat = lat || 42.7805;
  const defaultLon = lon || 18.9562;

  useEffect(() => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${defaultLat}&lon=${defaultLon}&${API_KEY}`;
    const NEW_API = `https://api.openweathermap.org/data/3.0/onecall?lat=${defaultLat}&lon=${defaultLon}&${API_KEY}`;

    async function fetchWeather() {
      try {
        const res = await fetch(`${API_URL}`);
        const data = await res.json();
        const res2 = await fetch(`${NEW_API}`);
        const newData = await res2.json();
        dispatch({ type: "SET_DATA", payload: data });
        dispatch({ type: "SET_NEW_DATA", payload: newData });

        console.log(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeather();
  }, [defaultLat, defaultLon]);

  // useEffect(() => {
  //   const API_HOURLY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${defaultLat}&lon=${defaultLon}&${API_KEY}`;
  //   async function fetchHourlyForecast() {
  //     try {
  //       const res = await fetch(`${API_HOURLY_URL}`);
  //       const data = await res.json();
  //       dispatch({ type: "SET_HOURLY", payload: data.list });
  //       console.log(data.list);
  //     } catch (error) {
  //       console.error("Error fetching weather data:", error);
  //     }
  //   }

  //   fetchHourlyForecast();
  // }, [defaultLat, defaultLon]);

  // console.log(data);
  // const Temp = () => {
  //   if (!state.weatherData) return;
  //   else
  //     dispatch({
  //       type: "SET_TEMP",
  //       payload: Math.round(state.data?.current?.temp - 273.15),
  //     });
  // };

  const convertTemp = (temp) => {
    return Math.round(temp - 273.15);
  };

  // useEffect(() => {
  //   Temp();
  // }, [state.weatherData]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData: state.weatherData,
        dailyData: state.dailyData,
        hourlyData: state.hourlyData,
        temp: state.temp,
        cityName: state.cityName,
        humidity: state.humidity,
        imgCode: state.imgCode,
        hourlyForecast: state.hourlyForecast,
        convertTemp,
        isLoading: state.isLoading,
        cloudiness: state.cloudiness,
        lat: defaultLat,
        lon: defaultLon,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function useWeather() {
  return useContext(WeatherContext);
}

export { WeatherProvider, useWeather };
