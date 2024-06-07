import React from 'react';
// import Tile from './Tile';
// import Degree from './Degree';
import { forecastType } from './../types';

type Props = {
  data: forecastType;
};

const Forecast: React.FC<Props> = ({ data }) => {
  const today = data.list[0];

  const getWindDirection = (deg: number) => {
    if (deg > 337.5) return 'N';
    if (deg > 292.5) return 'NW';
    if (deg > 247.5) return 'W';
    if (deg > 202.5) return 'SW';
    if (deg > 157.5) return 'S';
    if (deg > 122.5) return 'SE';
    if (deg > 67.5) return 'E';
    if (deg > 22.5) return 'NE';
    return 'N';
  };

  const getHumidityValue = (humidity: number) => {
    if (humidity >= 90) return 'High humidity';
    if (humidity >= 60) return 'Moderate humidity';
    return 'Low humidity';
  };

  const getPop = (pop: number) => {
    if (pop >= 0.5) return 'High probability';
    if (pop >= 0.2) return 'Moderate probability';
    return 'Low probability';
  };

  const getVisibilityValue = (visibility: number) => {
    if (visibility >= 10000) return 'Excellent visibility';
    if (visibility >= 5000) return 'Good visibility';
    if (visibility >= 1000) return 'Moderate visibility';
    return 'Poor visibility';
  };

  return (
    <div className="forecast">
      {/* <Tile
        icon="wind"
        title="Wind"
        info={`${Math.round(today.wind.speed)} km/h`}
        description={`${getWindDirection(today.wind.deg)} direction`}
      />
      <Tile
        icon="feels"
        title="Feels like"
        info={<Degree temp={Math.round(today.main.feels_like)} />}
        description={`Feels ${Math.round(today.main.feels_like)}`}
      />
      <Tile
        icon="humidity"
        title="Humidity"
        info={`${today.main.humidity} %`}
        description={getHumidityValue(today.main.humidity)}
      />
      <Tile
        icon="pop"
        title="Precipitation"
        info={`${Math.round(today.pop * 100)}%`}
        description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
      />
      <Tile
        icon="pressure"
        title="Pressure"
        info={`${today.main.pressure} hPa`}
        description={`Pressure at ${today.main.pressure} hPa`}
      />
      <Tile
        icon="visibility"
        title="Visibility"
        info={`${(today.visibility / 1000).toFixed()} km`}
        description={getVisibilityValue(today.visibility)}
      /> */}
    </div>
  );
};

export default Forecast;
