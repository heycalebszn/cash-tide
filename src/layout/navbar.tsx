import { main2 } from "../assets";
import { FaTwitter, FaTelegram } from "react-icons/fa";

const Navbar = () => {

  return (
    <nav className="absolute top-0 flex justify-center bg-transparent w-full z-50">
      <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-10 lg:px-[50px] py-6">
        <div className="flex items-center gap-2">
          <img src={main2} alt="CashTide" className="w-10 h-10" />
          <p className="text-white text-2xl font-semibold">Numpay</p>
        </div>

        <ul className="flex items-center gap-4">
          <li className="relative z-10">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white p-2 hover:text-gray-200 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
          </li>
          <li className="relative z-10">
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white p-2 hover:text-gray-200 transition-colors"
              aria-label="Telegram"
            >
              <FaTelegram className="w-5 h-5" />
            </a>
          </li>
          <li className="relative z-10">
            <a 
              href="https://portal.jeton.com/login" 
              target="_blank" 
              className="px-7 py-3 border border-white text-white rounded-xl navbar-hover-animation"
            >
              Log in
            </a>
          </li>
          <li className="relative z-10 md:flex hidden">
            <a 
              href="https://portal.jeton.com/signup" 
              target="_blank" 
              className="px-7 py-3 bg-white text-blue-500 rounded-xl hover:bg-gray-100 navbar-hover-animation"
            >
              Whitepaper
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;