import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { au_flag, eu_flag, is_flag, uk_flag } from '../assets';

interface CurrencyOption {
  symbol?: any;
  flag?: string;
  code: string;
  name: string;
}

export const currencies: CurrencyOption[] = [
  { code: 'AUD', name: 'Australian Dollar', flag: au_flag, symbol: 'A$' },
  { code: 'EUR', name: 'Euro', flag: eu_flag, symbol: '€' },
  { code: 'BHD', name: 'Bahraini Dinar', flag: is_flag, symbol: '.د.ب' },
  { code: 'GBP', name: 'British Pound', flag: uk_flag, symbol: '£' },
];

interface CurrencySelectDropdownProps {
  isOpen: boolean;
  onSelect: (currencyCode: string) => void;
  selectedCurrencyCode: string;
  onClose: () => void;
  className?: string;
}

const CurrencySelectDropdown: React.FC<CurrencySelectDropdownProps> = ({ isOpen, onSelect, selectedCurrencyCode, onClose, className }) => {
  if (!isOpen) return null;

  return (
    <div className={`absolute top-full left-0 z-50 w-full bg-white rounded-xl shadow-lg -mt-16 py-2 px-2 ${className || ''}`}>
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
            {/* Flag */}
            <img
              src={currency.flag}
              alt={`${currency.name} flag`}
              className="w-8 h-8 rounded-full object-cover"
            />
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