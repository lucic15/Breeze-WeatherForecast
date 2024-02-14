import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Overview from "./components/Overview";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <BrowserRouter>
      <WeatherProvider>
        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>{" "}
      </WeatherProvider>
    </BrowserRouter>
  );
}

export default App;
