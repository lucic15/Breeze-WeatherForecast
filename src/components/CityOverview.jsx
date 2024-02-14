import { useWeather } from "../context/WeatherContext";
import styles from "./CityOverview.module.css";
function CityOverview() {
  const { temp, cityName, humidity, status, imgCode, cloudiness, isLoading } =
    useWeather();

  return (
    <div className={styles.cityOverview}>
      <div className={styles.city}>
        <img src={`https://flagsapi.com/${imgCode}/flat/64.png`} alt="" />{" "}
        <h1 className={styles.cityName}>{cityName}</h1>
      </div>
      <div className={styles.text}>
        <h1>{temp}&deg;</h1>
        <h3>Temperature</h3>
      </div>
      <div className={styles.text}>
        <h1>{humidity}%</h1>
        <h3>Humidity</h3>
      </div>
      <div className={styles.text}>
        <h1>{cloudiness}%</h1>
        <h3>Cloudiness</h3>
      </div>
    </div>
  );
}

export default CityOverview;
