import React, { useState, useEffect } from 'react';
import axios from 'axios';

// CurrencyConverter component definition
const CurrencyConverter = () => {
  // State for storing the list of currencies
  const [currencies, setCurrencies] = useState([]);
  // State for the selected currencies and amount to convert
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  // State for handling any API errors
  const [error, setError] = useState('');

  // Fetch the list of available currencies on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        // API endpoint for listing all available currencies
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/codes`);
        setCurrencies(response.data.supported_codes);
      } catch (error) {
        // Handle any errors during the API call
        setError('Failed to fetch currencies');
      }
    };
    fetchCurrencies();
  }, []);

  // Function to convert currency
  const convertCurrency = async () => {
    try {
      // API endpoint for converting currency
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/pair/${fromCurrency}/${toCurrency}/${amount}`);
      // Update the result state with the conversion result
      setResult(response.data.conversion_result);
    } catch (error) {
      // Handle any errors during the conversion process
      setError('Conversion failed');
    }
  };

  // Effect to perform currency conversion when inputs change
  useEffect(() => {
    if (amount > 0) {
      convertCurrency();
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div>
      {/* Input for the amount to convert */}
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      {/* Dropdown for selecting the currency to convert from */}
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map(([code, name]) => (
          <option key={code} value={code}>{`${code} - ${name}`}</option>
        ))}
      </select>
      {/* Dropdown for selecting the currency to convert to */}
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map(([code, name]) => (
          <option key={code} value={code}>{`${code} - ${name}`}</option>
        ))}
      </select>
      {/* Button to trigger conversion explicitly if needed */}
      <button onClick={convertCurrency}>Convert</button>
      {/* Display the conversion result or any error message */}
      {result && <p>Result: {result}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CurrencyConverter;
