import { useEffect, useState } from "react";

const CurrencyConverter = ({ fromCurrency, toCurrency }) => {
  const [amount, setAmount] = useState("");
  const [output, setOutput] = useState(0);

  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/7c29334b3f3c6cfdac8421b470/pair/${fromCurrency}/${toCurrency}/${amount}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setOutput(data.conversion_result))
      .catch((err) => console.log(err));
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <div className='container'>
        <input
          value={amount}
          placeholder='Enter amount'
          className='converter-input'
          onChange={handleAmountChange}
        ></input>

        <p>{fromCurrency}</p>

        <p className='equal-sign'>=</p>

        <p className='converter-result'>{amount === "" ? "0" : output}</p>

        <p>{toCurrency}</p>
      </div>
    </>
  );
};

export default CurrencyConverter;
