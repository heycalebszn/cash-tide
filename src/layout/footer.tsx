import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay, FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const jetonH1Ref = useRef<HTMLHeadingElement>(null);

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
        }
      });
    }, jetonH1Ref);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-white py-16 px-8 sm:px-16 text-blue-600 overflow-visible">
      {/* Top Section - Links */}
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div>
          <h3 className="text-[15px] mb-2 text-blue-300">Get Started</h3>
          <ul>
            <li className="mb-2"><a href="#" className="link-underline">Sign up</a></li>
            <li><a href="#" className="link-underline">Login</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[15px] mb-2 text-blue-300">Discover</h3>
          <ul>
            <li className="mb-2"><a href="#" className="link-underline">Jeton Card</a></li>
            <li><a href="#" className="link-underline">Fees</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[15px] mb-2 text-blue-300">Company</h3>
          <ul>
            <li className="mb-2"><a href="#" className="link-underline">About</a></li>
          </ul>
        </div>
    <div>
          <h3 className="text-[15px] mb-2 text-blue-300">Help</h3>
          <ul>
            <li className="mb-2"><a href="#" className="link-underline">Developers</a></li>
            <li className="mb-2"><a href="#" className="link-underline">FAQ</a></li>
            <li className="mb-2"><a href="#" className="link-underline">Support</a></li>
            <li><a href="#" className="link-underline">Release Notes</a></li>
          </ul>
        </div>
      </div>

      {/* Middle Section - App Downloads, Logos, Social Media */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between border-b border-blue-200 py-8 mb-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-0">
            <a href="#" className="flex items-center space-x-2 border border-blue-300 rounded-lg px-4 py-2 hover:bg-blue-100 transition-colors">
            {/* Placeholder for Google Play Icon */}
            <FaGooglePlay className="text-3xl" />
            <div className="flex flex-col text-left text-sm">
              <span>GET IT ON</span>
              <span className="font-semibold text-base">Google Play</span>
            </div>
          </a>
          <a href="#" className="flex items-center space-x-2 border border-blue-300 rounded-lg px-4 py-2 hover:bg-blue-100 transition-colors">
            {/* Placeholder for Apple Icon */}
            <AiFillApple className="text-3xl" />
            <div className="flex flex-col text-left text-sm">
              <span>Download on the</span>
              <span className="font-semibold text-base">App Store</span>
            </div>
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-300 transition-colors"><FaInstagram className="text-2xl" /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-300 transition-colors"><FaFacebook className="text-2xl" /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-300 transition-colors"><FaXTwitter className="text-2xl" /></a>
        </div>
      </div>

      {/* Bottom Section - Copyright and Legal Text */}
      <div className="container mx-auto text-center relative overflow-visible">
        <h1 ref={jetonH1Ref} className="text-center md:text-[16rem] text-[5rem] sm:text-[17rem] text-gradient font-bold leading-none mb-8 relative z-10">CashTide</h1>
      </div>
    </footer>
  )
}

export default Footer;