import "./App.css";
import CurrencyDropdown from "./components/CurrencyDropdown";

const App = () => {
  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyDropdown name='some-random-name' />
    </>
  );
};

export default App;
