import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay, FaInstagram, FaFacebook, FaXTwitter, FaGlobe, FaChevronDown } from "react-icons/fa6";
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { westham, lyon, liverpool, logo1, logo2, logo3, logo4, logo5, logo6, lyon_logo, westham_logo } from "../assets";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const jetonH1Ref = useRef<HTMLHeadingElement>(null);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'TR', name: 'Türkçe' },
  ];

  useEffect(() => {
    if (!jetonH1Ref.current) return;

    const ctx = gsap.context(() => {
      gsap.set(jetonH1Ref.current, {
        yPercent: 0,
        opacity: 1,
      });

      gsap.to(jetonH1Ref.current, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: jetonH1Ref.current,
          start: "bottom center",
          end: "top top",
          scrub: 1,
          // markers: true, // Re-enable if needed for further debugging
        }
      });
    }, jetonH1Ref);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-white py-16 px-8 sm:px-16 text-orange-600 overflow-visible">
      {/* Top Section - Links */}
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div>
          <h3 className="text-[15px] mb-2 text-orange-300">Get Started</h3>
          <ul>
            <li className="mb-2"><a href="#" className="link-underline">Sign up</a></li>
            <li><a href="#" className="link-underline">Login</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[15px] mb-2 text-orange-300">Discover</h3>
          <ul>
            <li className="mb-2"><a href="#" className="link-underline">Jeton Card</a></li>
            <li><a href="#" className="link-underline">Fees</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[15px] mb-2 text-orange-300">Company</h3>
          <ul>
            <li className="mb-2"><a href="#" className="link-underline">About</a></li>
            <li className="mb-2"><a href="#" className="link-underline">Newsroom</a></li>
            <li className="mb-2"><a href="#" className="link-underline">Partnerships</a></li>
            <li><a href="#" className="link-underline">Media Assets</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[15px] mb-2 text-orange-300">Legal</h3>
          <ul>
            <li className="mb-2"><a href="#" className="link-underline">Cookie Policy</a></li>
            <li className="mb-2"><a href="#" className="link-underline">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="link-underline">Terms and Conditions</a></li>
            <li className="mb-2"><a href="#" className="link-underline">Disclaimers</a></li>
            <li><a href="#" className="link-underline">AML Policy</a></li>
          </ul>
        </div>
    <div>
          <h3 className="text-[15px] mb-2 text-orange-300">Help</h3>
          <ul>
            <li className="mb-2"><a href="#" className="link-underline">Developers</a></li>
            <li className="mb-2"><a href="#" className="link-underline">FAQ</a></li>
            <li className="mb-2"><a href="#" className="link-underline">Support</a></li>
            <li><a href="#" className="link-underline">Release Notes</a></li>
          </ul>
        </div>
      </div>

      {/* Middle Section - App Downloads, Logos, Social Media */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between border-b border-orange-200 py-8 mb-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-0">
          <a href="#" className="flex items-center space-x-2 border border-orange-300 rounded-lg px-4 py-2 hover:bg-orange-100 transition-colors">
            {/* Placeholder for Google Play Icon */}
            <FaGooglePlay className="text-3xl" />
            <div className="flex flex-col text-left text-sm">
              <span>GET IT ON</span>
              <span className="font-semibold text-base">Google Play</span>
            </div>
          </a>
          <a href="#" className="flex items-center space-x-2 border border-orange-300 rounded-lg px-4 py-2 hover:bg-orange-100 transition-colors">
            {/* Placeholder for Apple Icon */}
            <AiFillApple className="text-3xl" />
            <div className="flex flex-col text-left text-sm">
              <span>Download on the</span>
              <span className="font-semibold text-base">App Store</span>
            </div>
          </a>
        </div>
        
        {/* Logos/Badges */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 md:mb-0">
            <img src={logo1} alt="Partner Logo" className="w-10 h-10 object-contain" />
            <img src={logo2} alt="Partner Logo" className="w-10 h-10 object-contain" />
            <img src={logo3} alt="Partner Logo" className="w-10 h-10 object-contain" />
            <img src={logo4} alt="Partner Logo" className="w-10 h-10 object-contain" />
            <img src={logo5} alt="Partner Logo" className="w-10 h-10 object-contain" />
            <img src={logo6} alt="Partner Logo" className="w-10 h-10 object-contain" />
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-300 transition-colors"><FaInstagram className="text-2xl" /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-300 transition-colors"><FaFacebook className="text-2xl" /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-300 transition-colors"><FaXTwitter className="text-2xl" /></a>
        </div>
      </div>

      {/* Bottom Section - Copyright and Legal Text */}
      <div className="container mx-auto text-center relative overflow-visible">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-100 transition-colors cursor-pointer"
            >
              <FaGlobe className="text-lg" />
              <span>{selectedLanguage}</span>
              <FaChevronDown className={`text-xs transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {isLangDropdownOpen && (
              <ul className="absolute top-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {lang.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <p className="text-orange-600 text-sm">Made by Büro</p>
        </div>
        <h1 ref={jetonH1Ref} className="text-center md:text-[30rem] text-[9rem] sm:text-[25rem] text-orange-500 font-bold leading-none mb-8 relative z-10">Jeton</h1>
        <p className="mb-4 text-xs text-orange-500 text-left">© 2023 | www.jeton.com is owned and operated by LA Orange CY Limited (Gladstonos, 116 M. Kyprianou House, 3-4th Floor, 3032, Limassol, Cyprus.) LA Orange CY Limited trading as Jeton, is authorised by the Central Bank of Cyprus under the Electronic Money Law of 2012 and 2018 (Law 81(I)/2012) for distributing or redeeming electronic money (e-money), with Licence No: 115.1.3.66. LA Orange CY Limited has been incorporated in the Republic of Cyprus under the provisions of the Companies Law (Cap 113) with registration number HE 424807, with its registered office address at Gladstonos, 116 M. Kyprianou House, 3&4th Floor, 3032, Limassol, Cyprus.</p>
        <p className="text-xs text-orange-500 text-left">LA Orange Limited, trading as Jeton, is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011 for distributing or redeeming electronic money (e-money) and providing certain payment services on behalf of an e-money institution, with FCA registration number 902088. Company Name: LA ORANGE LIMITED, LEI code: 8945009G46MP0DAD211, BIC Value: ORAGGB22 (Swift Code). LA Orange Limited is registered in England and Wales, Company Number 11535714, with its registered office address at The Shard Floor 24/25, 32 London Bridge Street, London, SE1 9SG, United Kingdom.</p>
      </div>

      {/* Partner/Ambassador Cards */}
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-6 mt-12">
        {/* West Ham United Card */}
        <div className="text-white rounded-xl w-full md:w-1/3 max-w-sm h-[250px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${westham})` }}></div>
          <div className="absolute bottom-0 left-0 w-full h-2/5 bg-[rgba(139,0,0,0.9)] z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-2/5 z-20 flex flex-col items-center justify-end p-4 text-center">
            <img src={westham_logo} alt="West Ham Logo" className="h-16 mb-2" />
          </div>
        </div>

        {/* Legia Warsaw Card */}
        <div className="text-white rounded-xl w-full md:w-1/3 max-w-sm h-[250px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${lyon})` }}></div>
          <div className="absolute bottom-0 left-0 w-full h-2/5 bg-[rgba(0,100,0,0.9)] z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-2/5 z-20 flex flex-col items-center justify-end p-4 text-center">
            <img src={lyon_logo} alt="Legia Logo" className="h-16 mb-2" />
          </div>
        </div>

        {/* Brand Ambassadors Card */}
        <div className="text-white rounded-xl w-full md:w-1/3 max-w-sm h-[250px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${liverpool})` }}></div>
          <div className="absolute bottom-0 left-0 w-full h-2/5 bg-[rgba(249,115,22,0.9)] z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-2/5 z-20 flex flex-col items-center justify-end p-4 text-center">
            <p className="text-sm font-semibold">Online Payments Brand Ambassadors</p>
            <p className="text-lg font-bold">Alexis Mac Allister & Kou Itakura</p>
          </div>
        </div>
    </div>
    </footer>
  )
}

export default Footer;