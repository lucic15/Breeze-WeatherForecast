import Map from "../components/Map";
import Overview from "../components/Overview";
import styles from "./Main.module.css";
function Main() {
  return (
    <div className={styles.main}>
      <Overview />
      <Map />
    </div>
  );
}

export default Main;
