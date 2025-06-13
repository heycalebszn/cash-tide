import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import CurrencySelectDropdown from './CurrencySelectDropdown';

// Placeholder for flag imports (you will need to replace these with actual image imports)
// import audFlag from '../assets/flags/aud.png';
// import gbpFlag from '../assets/flags/gbp.png';

const CurrencyExchange = () => {
  const [fromCurrency, setFromCurrency] = useState('AUD');
  const [toCurrency, setToCurrency] = useState('GBP');
  const [fromAmount, setFromAmount] = useState('10');
  const [toAmount, setToAmount] = useState('4.8');

  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);

  const handleFromSelect = (code: string) => {
    setFromCurrency(code);
    setIsFromDropdownOpen(false);
  };

  const handleToSelect = (code: string) => {
    setToCurrency(code);
    setIsToDropdownOpen(false);
  };

  const handleExchange = () => {
    // Implement actual exchange logic here
    alert('Exchange initiated!');
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* From Currency Card */}
      <div className="relative bg-pink-100/50 rounded-xl p-4 flex flex-col justify-between w-[550px] max-w-sm cursor-pointer mt-[30px]" onClick={() => setIsFromDropdownOpen(!isFromDropdownOpen)}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {/* Placeholder for From Flag */}
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">{fromCurrency.substring(0, 3)}</div>
            <span className="font-semibold text-black text-lg">{fromCurrency}</span>
          </div>
          <FaChevronDown className="text-red-500 text-lg" />
        </div>
        <input 
          type="text" 
          className="text-xl font-bold text-black bg-transparent border-none outline-none w-full"
          value={`$${fromAmount}`}
          onChange={(e) => setFromAmount(e.target.value.replace('$', ''))}
          onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing when input is clicked
        />
        <CurrencySelectDropdown
          isOpen={isFromDropdownOpen}
          onSelect={handleFromSelect}
          selectedCurrencyCode={fromCurrency}
          onClose={() => setIsFromDropdownOpen(false)}
        />
      </div>

      {/* Exchange Icon */}
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-200 cursor-pointer" onClick={handleExchange}>
        <BiTransfer className="text-blue-500 text-2xl rotate-90" />
      </div>

      {/* To Currency Card */}
      <div className="relative bg-pink-100/50 rounded-xl p-4 flex flex-col justify-between w-full max-w-sm cursor-pointer" onClick={() => setIsToDropdownOpen(!isToDropdownOpen)}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {/* Placeholder for To Flag */}
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">{toCurrency.substring(0, 3)}</div>
            <span className="font-semibold text-black text-lg">{toCurrency}</span>
          </div>
          <FaChevronDown className="text-red-500 text-lg" />
        </div>
        <input 
          type="text" 
          className="text-xl font-bold text-black bg-transparent border-none outline-none w-full"
          value={`£ ${toAmount}`}
          onChange={(e) => setToAmount(e.target.value.replace('£ ', ''))}
          onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing when input is clicked
        />
        <CurrencySelectDropdown
          isOpen={isToDropdownOpen}
          onSelect={handleToSelect}
          selectedCurrencyCode={toCurrency}
          onClose={() => setIsToDropdownOpen(false)}
        />
      </div>
    </div>
  );
};

export default CurrencyExchange; 