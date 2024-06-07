import { useState, useEffect, ChangeEvent } from 'react';
import { optionType, forecastType } from './../types/index';

const BASE_URL = 'http://api.openweathermap.org';

const useForecast = () => {
  const [city, setCity] = useState<optionType | null>(null);
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<optionType[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [error, setError] = useState<string | null>(null); // Add error state

  const getSearchOptions = async (term: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/geo/1.0/direct?q=${term.trim()}&limit=5&lang=en&appid=${process.env.REACT_APP_API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch search options');
      }
      const data = await response.json();
      setOptions(data);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch search options');
    }
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  const getForecast = async (selectedCity: optionType) => {
    try {
      const response = await fetch(
        `${BASE_URL}/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch forecast');
      }
      const forecastData = await response.json();
      const filteredForecast = {
        ...forecastData.city,
        list: forecastData.list.slice(0, 16),
      };
      setForecast(filteredForecast);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch forecast');
    }
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(e.target.value);
    if (value !== '') {
      getSearchOptions(value);
    }
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    forecast,
    options,
    term,
    error, // Return error state
    onOptionSelect,
    onSubmit,
    onInputChange,
  };
};

export default useForecast;