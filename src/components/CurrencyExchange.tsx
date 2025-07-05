import { useState, useEffect } from "react";
import { BiTransfer } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CurrencySelectDropdown, { currencies, fallbackCurrencies } from "./CurrencySelectDropdown";

interface ExchangeRates {
  [key: string]: number;
}

const CurrencyExchange = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('10');
  const [toAmount, setToAmount] = useState('');
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  console.log(lastUpdated)

  // Fetch exchange rates from API
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        
        const data = await response.json();
        
        if (data && data.rates) {
          setExchangeRates(data.rates);
          setLastUpdated(new Date(data.time_last_update_utc));
          
          // Calculate initial conversion
          if (fromAmount) {
            convertCurrency(fromAmount, fromCurrency, toCurrency, data.rates);
          }
        }
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // Set some fallback rates if API fails
        setExchangeRates({
          USD: 1,
          EUR: 0.85,
          GBP: 0.75,
          AUD: 1.35
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  // Convert currency whenever amount or currencies change
  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0 && fromAmount) {
      convertCurrency(fromAmount, fromCurrency, toCurrency, exchangeRates);
    }
  }, [fromCurrency, toCurrency, fromAmount, exchangeRates]);

  const convertCurrency = (amount: string, from: string, to: string, rates: ExchangeRates) => {
    if (!rates[from] || !rates[to]) {
      return;
    }
    
    // Convert to USD first (base currency), then to target currency
    const amountInUSD = parseFloat(amount) / rates[from];
    const convertedAmount = amountInUSD * rates[to];
    
    // Format to 2 decimal places
    setToAmount(convertedAmount.toFixed(2));
  };

  const getSelectedCurrency = (code: string) => {
    const currencyList = currencies.length > 0 ? currencies : fallbackCurrencies;
    return currencyList.find(curr => curr.code === code) || currencyList[0];
  };

  const handleFromSelect = (code: string) => {
    setFromCurrency(code);
    setIsFromDropdownOpen(false);
  };

  const handleToSelect = (code: string) => {
    setToCurrency(code);
    setIsToDropdownOpen(false);
  };

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    const tempAmount = fromAmount;
    
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setFromAmount(value);
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setToAmount(value);
    
    // Reverse calculation
    if (Object.keys(exchangeRates).length > 0) {
      const amountInUSD = parseFloat(value) / exchangeRates[toCurrency];
      const convertedAmount = amountInUSD * exchangeRates[fromCurrency];
      setFromAmount(convertedAmount.toFixed(2));
    }
  };

  // const formatAmount = (amount: string, currencyCode: string) => {
  //   const currency = getSelectedCurrency(currencyCode);
  //   return `${currency.symbol || currencyCode} ${amount}`;
  // };

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br justify-center mt-[15px]">
      <div className="w-full max-w-md space-y-4">
        
        {/* From Currency Card */}
        <div className="relative">
          <div 
            className={`bg-blue-50 rounded-2xl p-5 transition-all border duration-200 cursor-pointer md:w-[450px] w-[250px] h-fit ${
              isFromDropdownOpen ? 'border-blue-400 shadow-xl' : 'border-gray-100'
            }`}
            onClick={() => {
              setIsFromDropdownOpen(!isFromDropdownOpen);
              setIsToDropdownOpen(false);
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-blue-50">
                  {getSelectedCurrency(fromCurrency).flag ? (
                    <img src={getSelectedCurrency(fromCurrency).flag} alt="" className="md:w-full md:h-full w-[30px] h-[30px] rounded-full object-cover" />
                  ) : (
                    <span>{fromCurrency.substring(0, 2)}</span>
                  )}
                </div>
                <span className="font-medium text-gray-800 md:text-lg text-[0.8rem]">
                  {fromCurrency}
                </span>
              </div>
              {isFromDropdownOpen ? (
                <FaChevronUp className="text-blue-500 text-lg transition-transform duration-200" />
              ) : (
                <FaChevronDown className="text-blue-500 text-[30px] transition-transform duration-200 bg-blue-200 rounded-full p-2" />
              )}
            </div>
            <input 
              type="text" 
              className="md:text-2xl text-[1.3rem] font-bold text-gray-800 bg-transparent border-none outline-none w-full placeholder-gray-400"
              value={fromAmount}
              onChange={handleFromAmountChange}
              onClick={(e) => e.stopPropagation()}
              placeholder="0.00"
            />
          </div>
          <CurrencySelectDropdown
            isOpen={isFromDropdownOpen}
            onSelect={handleFromSelect}
            selectedCurrencyCode={fromCurrency}
            onClose={() => setIsFromDropdownOpen(false)}
            className="z-50"
          />
        </div>

        {/* Exchange Icon */}
        <div className="flex justify-center">
          <button
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            onClick={handleSwapCurrencies}
          >
            <BiTransfer className="text-blue-500 text-[1rem] rotate-90" />
          </button>
        </div>

        {/* To Currency Card */}
        <div className="relative">
          <div 
            className={`bg-blue-50 rounded-2xl p-5 transition-all border duration-200 cursor-pointer md:w-[450px] w-[250px] h-fit ${
              isToDropdownOpen ? 'border-blue-400 shadow-xl' : 'border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => {
              setIsToDropdownOpen(!isToDropdownOpen);
              setIsFromDropdownOpen(false);
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-blue-50">
                {getSelectedCurrency(toCurrency).flag ? (
                  <img src={getSelectedCurrency(toCurrency).flag} alt="" className="md:w-full md:h-full w-[30px] h-[30px] rounded-full object-cover" />
                ) : (
                  <span>{toCurrency.substring(0, 2)}</span>
                )}
                </div>
                <span className="font-medium text-gray-800 md:text-lg text-[0.8rem]">
                  {toCurrency}
                </span>
              </div>
              {isToDropdownOpen ? (
                <FaChevronUp className="text-blue-500 text-lg transition-transform duration-200" />
              ) : (
                <FaChevronDown className="text-blue-500 text-[30px] transition-transform duration-200 bg-blue-200 rounded-full p-2" />
              )}
            </div>
            <input 
              type="text" 
              className="md:text-2xl text-[1.3rem] font-bold text-gray-800 bg-transparent border-none outline-none w-full placeholder-gray-400"
              value={toAmount}
              onChange={handleToAmountChange}
              onClick={(e) => e.stopPropagation()}
              placeholder="0.00"
            />
          </div>
          <CurrencySelectDropdown
            isOpen={isToDropdownOpen}
            onSelect={handleToSelect}
            selectedCurrencyCode={toCurrency}
            onClose={() => setIsToDropdownOpen(false)}
            className="z-50"
          />
        </div>
        
        {/* Exchange rate info */}
        {/* {!isLoading && fromAmount && toAmount && (
          <div className="text-center text-sm text-blue-500 mt-2">
            <p>1 {fromCurrency} = {exchangeRates[toCurrency] / exchangeRates[fromCurrency]} {toCurrency}</p>
            {lastUpdated && (
              <p className="text-xs mt-1">
                Rates updated: {lastUpdated.toLocaleString()}
              </p>
            )}
          </div>
        )} */}
        
        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyExchange;