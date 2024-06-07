import { useState, useEffect, ChangeEvent } from 'react';
import { optionType, forecastType } from './../types/index';

const BASE_URL = 'http://api.openweathermap.org';

const useForecast = () => {
  const [city, setCity] = useState<optionType | null>(null);
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<optionType[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getSearchOptions = async (term: string) => {
    try {
      const res = await fetch(
        `${BASE_URL}/geo/1.0/direct?q=${term.trim()}&limit=5&lang=en&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setOptions(data);
        setError(null);
      } else {
        setError(data.message);
        setOptions([]);
      }
    } catch (e) {
      setError('Failed to fetch options');
      setOptions([]);
    }
  };

  const getForecast = async (data: optionType) => {
    try {
      const res = await fetch(
        `${BASE_URL}/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
      );
      const forecastData = await res.json();
      if (res.ok) {
        const formattedData = {
          ...forecastData.city,
          list: forecastData.list.slice(0, 16),
        };
        setForecast(formattedData);
        setError(null);
      } else {
        setError(forecastData.message);
        setForecast(null);
      }
    } catch (e) {
      setError('Failed to fetch forecast');
      setForecast(null);
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

  const onSubmit = () => {
    if (city) {
      getForecast(city);
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
    error,
    onOptionSelect,
    onSubmit,
    onInputChange,
  };
};

export default useForecast;
