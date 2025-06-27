import {jeton_card_video} from "../../assets";
import CurrencyExchange from '../CurrencyExchange';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fallbackFlagsData } from "../../static/constants";

gsap.registerPlugin(ScrollTrigger);

interface CountryFlag {
  src: string;
  alt: string;
  code: string;
}

const JettonCardSection = () => {
  const flagsRefs = useRef<HTMLImageElement[]>([]);
  const exchangeSectionRef = useRef<HTMLElement>(null);
  const [flags, setFlags] = useState<CountryFlag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch country flags from REST Countries API
  useEffect(() => {
    const fetchCountryFlags = async () => {
      try {
        setIsLoading(true);
        // Get a subset of popular currencies to fetch flags for
        // const currencyCodes = popularCurrencyCodes.slice(0, 30);
        
        // Fetch countries data from REST Countries API
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags');
        
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        
        const countries = await response.json();
        
        // Filter and map countries to get flags
        const countryFlags: CountryFlag[] = countries
          .filter((country: any) => country.flags && country.flags.png)
          .slice(0, 50) // Limit to 50 flags for performance
          .map((country: any) => ({
            src: country.flags.png,
            alt: `${country.name.common} flag`,
            code: country.cca2
          }));
        
        if (countryFlags.length > 0) {
          setFlags(countryFlags);
        } else {
          // Use fallback flags if API returns empty
          setFlags(fallbackFlagsData);
        }
      } catch (error) {
        console.error('Error fetching country flags:', error);
        // Use fallback flags if API fails
        setFlags(fallbackFlagsData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryFlags();
  }, []);
  
  useEffect(() => {
    if (isLoading || flags.length === 0) return;
    
    const ctx = gsap.context(() => {
      // Create a timeline for the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: exchangeSectionRef.current,
          start: "top center",
          onEnter: () => {
            // Reset flags to initial state
            gsap.set(flagsRefs.current, {
              y: -100,
              opacity: 0
            });
            
            // Animate flags
            gsap.to(flagsRefs.current, {
              y: () => 720 - (Math.random() * 20),
              x: () => -800 + Math.random() * 1600,
              opacity: 1,
              duration: 1.2,
              ease: "bounce.out",
              stagger: 0.05
            });
          }
        }
      });
      console.log(tl)
    });

    return () => ctx.revert();
  }, [flags, isLoading]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 mt-[150px]">
      <div className="text-gradient border border-blue-500 rounded-full px-4 py-1 text-[0.9rem]">Jeton Card</div>

      <div className="flex flex-col gap-[50px] md:gap-[100px] items-center justify-center">
        <h1 className="text-gradient md:text-[2.5rem] text-[1.5rem] md:w-[650px] w-[450px] text-center font-semibold md:leading-normal leading-[40px]">Contactless payments? Sure.<br/>Spending limits? Check.<br/>Card freezing? Also check.</h1>

        <video autoPlay loop muted playsInline className="h-[400px] md:h-[800px] md:w-[800px] w-[350px] rounded-xl object-cover">
          <source src={jeton_card_video} />
        </video>

        <div className="flex flex-col gap-4 md:gap-8 items-center justify-center">
          <h1 className="text-gradient md:text-[4rem] text-[2rem] md:w-[750px] w-[380px] text-center md:font-semibold font-bold md:leading-[80px] leading-[40px]">Jeton Card: Your Go-To for Every Purchase</h1>
          <a href="#" className="p-4 bg-blue-500 text-white text-[1rem] rounded-[15px] w-[150px] text-center">Learn more</a>
        </div>
      </div>

      <section ref={exchangeSectionRef} className="flex flex-col items-center justify-center relative h-[800px] pb-[70px]">
        {/* All flags container - behind form */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {!isLoading && flags.map((flag, index) => (
            <img
              key={index}
              ref={el => {
                if (el) flagsRefs.current[index] = el;
              }}
              src={flag.src}
              alt={flag.alt}
              className="rounded-full w-[80px] h-[80px] object-cover absolute pointer-events-none"
              style={{ 
                left: `${Math.random() * 100}%`,
                top: '0px',
                borderRadius: '50%'
              }}
            />
          ))}
        </div>

        <div className="text-gradient border border-blue-500 rounded-full px-4 py-1 text-[0.9rem] mt-[200px] w-fit z-10">Exchange</div>

        <div className="flex flex-col gap-[30px] items-center justify-center mt-[10px] z-10">
          <h1 className="text-gradient md:text-[4.5rem] text-[2.5rem] md:w-[500px] w-[250px] text-center font-semibold md:leading-[70px] leading-[50px]">Convert fiat cash easily.</h1>
          <p className="text-blue-500 text-[0.8rem] md:w-[450px] w-[300px] text-center">*The displayed conversion rates and fees may vary during the currency exchange process, and the rates shown were last updated at {new Date().toLocaleTimeString()} on {new Date().toLocaleDateString()}.</p>
        </div>

        <div className="z-10">
          <CurrencyExchange />
        </div>
      </section>
    </section>
  )
}

export default JettonCardSection;