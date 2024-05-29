import CityOverview from "./CityOverview";
import HourlyForecast from "./HourlyForecast";
import styles from "./Overview.module.css";
import Map from "./Map";
import DayForecast from "./DayForecast";

function Overview() {
  return (
    <div className={styles.main}>
      <div className={styles.leftSideContainer}>
        <div className={styles.mainForecast}>
          <CityOverview />
          <HourlyForecast />
        </div>
        <DayForecast />
      </div>
      <Map />
    </div>
  );
}

export default Overview;
