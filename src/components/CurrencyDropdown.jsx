import { useEffect, useState } from "react";
import "./CurrencyStyling.css";
import CurrencyConverter from "./CurrencyConverter";

const CurrencyDropdown = ({ name }) => {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState(null);
  const [defaultValueSelectOne, setDefaultValueSelectOne] = useState("Euro");
  const [defaultValueSelectTwo, setDefaultValueSelectTwo] = useState(
    "United States Dollar"
  );

  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/7c29334b3f3c6cfdac8421b470/codes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setCurrencies(data.supported_codes))
      .catch((err) => console.log(err));
  }, []);

  const handleSelectOneValue = (event) => {
    setDefaultValueSelectOne(event.target.value);
    setFromCurrency(currencies[event.target.selectedIndex][0]);
  };

  const handleSelectTwoValue = (event) => {
    setDefaultValueSelectTwo(event.target.value);
    setToCurrency(currencies[event.target.selectedIndex][0]);
  };

  return (
    <>
      <div className='container'>
        <p>I want to convert</p>

        <select
          className='from-select'
          value={defaultValueSelectOne}
          onChange={(event) => {
            handleSelectOneValue(event);
          }}
        >
          {currencies &&
            currencies.map((cur) => <option key={cur[0]}>{cur[1]}</option>)}
        </select>

        <p>to</p>

        <select
          className='to-select'
          value={defaultValueSelectTwo}
          onChange={(event) => {
            handleSelectTwoValue(event);
          }}
        >
          {currencies &&
            currencies.map((cur) => <option key={cur[0]}>{cur[1]}</option>)}
        </select>
      </div>

      <CurrencyConverter fromCurrency={fromCurrency} toCurrency={toCurrency} />
    </>
  );
};

export default CurrencyDropdown;
