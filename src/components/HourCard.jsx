import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import styles from "./HourCard.module.css";
function HourCard({ hour, index }) {
  const [timestamp, setTimestamp] = useState(hour.dt);
  const { convertTemp } = useWeather();
  const [humanReadableTime, setHumanReadableTime] = useState();
  useEffect(() => {
    const convertTimestampToHumanReadable = () => {
      const date = new Date(timestamp * 1000);

      const options = {
        hour: "numeric",
        timeZone: "CET",
      };

      setHumanReadableTime(date.toLocaleString("en-US", options));

      console.log("CET Time:", humanReadableTime);
    };

    convertTimestampToHumanReadable();
  }, [timestamp]);

  return (
    <div key={index} className={styles.card}>
      <p>{humanReadableTime}</p>
      {hour.weather && hour.weather[0] && (
        <img
          src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
          alt="Weather Icon"
        />
      )}
      <p>{convertTemp(hour.temp)}&deg;</p>
    </div>
  );
}

export default HourCard;
