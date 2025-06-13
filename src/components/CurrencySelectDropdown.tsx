import React, { type ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa';

// Placeholder for flag imports (you will need to replace these with actual image imports)
// import audFlag from '../assets/flags/aud.png';
// import eurFlag from '../assets/flags/eur.png';
// import bhdFlag from '../assets/flags/bhd.png';
// import gbpFlag from '../assets/flags/gbp.png';

interface CurrencyOption {
  symbol?: any;
  flag?: ReactNode;
  code: string;
  name: string;
  // flag: string; // Uncomment and use when you have actual flag image paths
}

export const currencies: CurrencyOption[] = [
  { code: 'AUD', name: 'Australian Dollar', flag: "", symbol: 'A$' },
  { code: 'EUR', name: 'Euro', flag: "", symbol: '€' },
  { code: 'BHD', name: 'Bahraini Dinar', flag: "", symbol: '.د.ب' },
  { code: 'GBP', name: 'British Pound', flag: "", symbol: '£' },
];

interface CurrencySelectDropdownProps {
  isOpen: boolean;
  onSelect: (currencyCode: string) => void;
  selectedCurrencyCode: string;
  onClose: () => void;
}

const CurrencySelectDropdown: React.FC<CurrencySelectDropdownProps> = ({ isOpen, onSelect, selectedCurrencyCode, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 z-10 w-full  bg-white rounded-xl shadow-lg mt-2 py-2 px-2">
      {currencies.map((currency) => (
        <div
          key={currency.code}
          className={`flex items-center justify-between p-3 cursor-pointer rounded-md hover:bg-red-100 ${selectedCurrencyCode === currency.code ? 'bg-orange-500 text-white' : ''}`}
          onClick={() => {
            onSelect(currency.code);
            onClose();
          }}
        >
          <div className="flex items-center gap-3">
            {/* Placeholder for Flag */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${selectedCurrencyCode === currency.code ? 'bg-white text-black' : 'bg-gray-300 text-black'}`}> {currency.code.substring(0, 3)}</div>
            <div>
              <span className="font-semibold text-lg">{currency.code}</span>
              <p className="text-sm opacity-80">{currency.name}</p>
            </div>
          </div>
          {selectedCurrencyCode === currency.code && <FaCheck className="text-white" />}
        </div>
      ))}
    </div>
  );
};

export default CurrencySelectDropdown; 