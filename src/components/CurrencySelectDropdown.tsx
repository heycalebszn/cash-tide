import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { au_flag, eu_flag, is_flag, uk_flag } from '../assets';

interface CurrencyOption {
  code: string;
  name: string;
  symbol?: string;
  flag?: string;
}

// Fallback currencies in case API fails
export const fallbackCurrencies: CurrencyOption[] = [
  { code: 'AUD', name: 'Australian Dollar', flag: au_flag, symbol: 'A$' },
  { code: 'EUR', name: 'Euro', flag: eu_flag, symbol: '€' },
  { code: 'BHD', name: 'Bahraini Dinar', flag: is_flag, symbol: '.د.ب' },
  { code: 'GBP', name: 'British Pound', flag: uk_flag, symbol: '£' },
];

// Export an empty array that will be populated by the API
export let currencies: CurrencyOption[] = [];

interface CurrencySelectDropdownProps {
  isOpen: boolean;
  onSelect: (currencyCode: string) => void;
  selectedCurrencyCode: string;
  onClose: () => void;
  className?: string;
}

const CurrencySelectDropdown: React.FC<CurrencySelectDropdownProps> = ({ isOpen, onSelect, selectedCurrencyCode, onClose, className }) => {
  const [availableCurrencies, setAvailableCurrencies] = useState<CurrencyOption[]>(fallbackCurrencies);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch currency data when component mounts
    const fetchCurrencies = async () => {
      try {
        setIsLoading(true);
        
        // Fetch currency data from Exchange Rate API
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        
        if (!response.ok) {
          throw new Error('Failed to fetch currency data');
        }
        
        const data = await response.json();
        
        if (data && data.rates) {
          // Get country data for flags
          const countriesResponse = await fetch('https://restcountries.com/v3.1/all?fields=currencies,flags,name,cca2');
          const countriesData = await countriesResponse.json();
          
          // Map currencies with their symbols and flags
          const currencyList: CurrencyOption[] = Object.keys(data.rates).map(code => {
            // Find matching country for this currency
            const country = countriesData.find((c: any) => 
              c.currencies && c.currencies[code]
            );
            
            // Get currency symbol and name if available
            let symbol = '';
            let name = code;
            
            if (country && country.currencies && country.currencies[code]) {
              symbol = country.currencies[code].symbol || '';
              name = country.currencies[code].name || code;
            }
            
            return {
              code,
              name: `${name}`,
              symbol: symbol || code,
              flag: country?.flags?.png || ''
            };
          }).filter(c => c.code && c.flag); // Only include currencies with flags
          
          if (currencyList.length > 0) {
            setAvailableCurrencies(currencyList);
            currencies = currencyList; // Update the exported currencies array
          }
        }
      } catch (error) {
        console.error('Error fetching currencies:', error);
        // Use fallback currencies if API fails
        setAvailableCurrencies(fallbackCurrencies);
        currencies = fallbackCurrencies;
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCurrencies();
  }, []);

  if (!isOpen) return null;

  return (
    <div className={`fixed z-[9999] w-full bg-white rounded-xl shadow-lg py-2 px-2 ${className || ''}`} style={{
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '450px',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      {isLoading ? (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        availableCurrencies.map((currency) => (
          <div
            key={currency.code}
            className={`flex items-center justify-between p-3 cursor-pointer rounded-md hover:bg-blue-100 ${selectedCurrencyCode === currency.code ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => {
              onSelect(currency.code);
              onClose();
            }}
          >
            <div className="flex items-center gap-3">
              {/* Flag */}
              {currency.flag ? (
                <img
                  src={currency.flag}
                  alt={`${currency.name} flag`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {currency.code.substring(0, 2)}
                </div>
              )}
              <div>
                <span className="font-semibold text-lg">{currency.code}</span>
                <p className="text-sm opacity-80">{currency.name}</p>
              </div>
            </div>
            {selectedCurrencyCode === currency.code && <FaCheck className={selectedCurrencyCode === currency.code ? "text-white" : "text-blue-500"} />}
          </div>
        ))
      )}
    </div>
  );
};

export default CurrencySelectDropdown; 