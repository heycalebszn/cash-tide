import { eu_flag, au_flag, sen_flag, is_flag, uk_flag } from "../assets";

export const testimonialsData = [
    {
        brief: "Recommended",
        desc: "Very happy with the app. Does what it says, simple payments and transactions. Quick account verification and withdrawals. 24/7 support available.",
        name: "Vamsi K.",
        avatar: "VK",
        avatarBgColor: "bg-green-500"
    },
    {
        brief: "Awesome app very user friendly",
        desc: "Would highly recommend Jeton to my friends.",
        name: "Leonie A.",
        avatar: "LA",
        avatarBgColor: "bg-purple-500"
    },
    {
        brief: "The best payment solution for German customers",
        desc: "I've been a Jeton user for a few years! The support was always great and I'm always able to make my payments to the websites I want with no problem.",
        name: "Karl R.",
        avatar: "KR",
        avatarBgColor: "bg-yellow-500"
    },
    {
        brief: "Great app for fast and easy transfers",
        desc: "I have been using Jeton for a while now without any problem. I have recommended it to my friends and family and I'm very happy with it!",
        name: "David P.",
        avatar: "DP",
        avatarBgColor: "bg-blue-500"
    },
]

// Fallback flags in case API fails
export const fallbackFlagsData = [
    { src: eu_flag, alt: "European Union flag", code: "EU" },
    { src: au_flag, alt: "Australian flag", code: "AU" },
    { src: sen_flag, alt: "Senegal flag", code: "SN" },
    { src: is_flag, alt: "Iceland flag", code: "IS" },
    { src: uk_flag, alt: "United Kingdom flag", code: "GB" }
];

// Popular currency codes for the exchange API
export const popularCurrencyCodes = [
    "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD", 
    "SEK", "KRW", "SGD", "NOK", "MXN", "INR", "RUB", "ZAR", "TRY", "BRL",
    "TWD", "DKK", "PLN", "THB", "IDR", "HUF", "CZK", "ILS", "CLP", "PHP",
    "AED", "COP", "SAR", "MYR", "RON"
];