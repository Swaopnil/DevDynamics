import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherCharts from './components/WeatherCharts';
import SearchInput from './components/Search';
import useForecast from './hooks/useForecast';

const App = (): JSX.Element => {
  const { forecast, options, term, error, onOptionSelect, onSubmit, onInputChange } = useForecast();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
              {forecast ? (
                <WeatherCharts data={forecast} />
              ) : (
                <SearchInput
                  term={term}
                  options={options}
                  error={error}
                  onInputChange={onInputChange}
                  onOptionSelect={onOptionSelect}
                  onSubmit={onSubmit}
                />
              )}
            </main>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
