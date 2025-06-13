import { useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CurrencySelectDropdown, { currencies } from "./CurrencySelectDropdown";

const CurrencyExchange = () => {
  const [fromCurrency, setFromCurrency] = useState('AUD');
  const [toCurrency, setToCurrency] = useState('GBP');
  const [fromAmount, setFromAmount] = useState('10');
  const [toAmount, setToAmount] = useState('4.8');
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);

  const getSelectedCurrency = (code: any) => {
    return currencies.find(curr => curr.code === code) || currencies[0];
  };

  const handleFromSelect = (code: any) => {
    setFromCurrency(code);
    setIsFromDropdownOpen(false);
    // Add exchange rate calculation logic here
  };

  const handleToSelect = (code: any) => {
    setToCurrency(code);
    setIsToDropdownOpen(false);
    // Add exchange rate calculation logic here
  };

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    const tempAmount = fromAmount;
    
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const formatAmount = (amount: any, currencyCode: any) => {
    const currency = getSelectedCurrency(currencyCode);
    return `${currency.symbol} ${amount}`;
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br justify-center mt-[15px]">
      <div className="w-full max-w-md space-y-4">
        
        {/* From Currency Card */}
        <div className="relative">
          <div 
            className={`bg-pink-50 rounded-2xl p-5 transition-all border duration-200 cursor-pointer w-[450px] h-fit ${
              isFromDropdownOpen ? 'border-red-400 shadow-xl' : 'border-gray-100'
            }`}
            onClick={() => {
              setIsFromDropdownOpen(!isFromDropdownOpen);
              setIsToDropdownOpen(false);
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-blue-50">
                  {getSelectedCurrency(fromCurrency).flag}
                </div>
                <span className="font-semibold text-gray-800 text-lg">
                  {fromCurrency}
                </span>
              </div>
              {isFromDropdownOpen ? (
                <FaChevronUp className="text-red-500 text-lg transition-transform duration-200" />
              ) : (
                <FaChevronDown className="text-red-500 text-lg transition-transform duration-200" />
              )}
            </div>
            <input 
              type="text" 
              className="text-2xl font-bold text-gray-800 bg-transparent border-none outline-none w-full placeholder-gray-400"
              value={formatAmount(fromAmount, fromCurrency)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setFromAmount(value);
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="0.00"
            />
          </div>
          <CurrencySelectDropdown
            isOpen={isFromDropdownOpen}
            onSelect={handleFromSelect}
            selectedCurrencyCode={fromCurrency}
            onClose={() => setIsFromDropdownOpen(false)}
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
            className={`bg-pink-50 rounded-2xl p-5 transition-all border duration-200 cursor-pointer w-[450px] h-fit ${
              isToDropdownOpen ? 'border-red-400 shadow-xl' : 'border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => {
              setIsToDropdownOpen(!isToDropdownOpen);
              setIsFromDropdownOpen(false);
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-blue-50">
                  {getSelectedCurrency(toCurrency).flag}
                </div>
                <span className="font-semibold text-gray-800 text-lg">
                  {toCurrency}
                </span>
              </div>
              {isToDropdownOpen ? (
                <FaChevronUp className="text-red-500 text-lg transition-transform duration-200" />
              ) : (
                <FaChevronDown className="text-red-500 text-lg transition-transform duration-200" />
              )}
            </div>
            <input 
              type="text" 
              className="text-2xl font-bold text-gray-800 bg-transparent border-none outline-none w-full placeholder-gray-400"
              value={formatAmount(toAmount, toCurrency)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setToAmount(value);
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="0.00"
            />
          </div>
          <CurrencySelectDropdown
            isOpen={isToDropdownOpen}
            onSelect={handleToSelect}
            selectedCurrencyCode={toCurrency}
            onClose={() => setIsToDropdownOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;