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
  const [showFlags, setShowFlags] = useState(false);
  
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
      // Set initial state - hide all flags
      gsap.set(flagsRefs.current, {
        y: -100,
        opacity: 0
      });
      
      // Function to calculate max Y position
      const calculateMaxY = () => {
        const sectionHeight = exchangeSectionRef.current?.offsetHeight || 800;
        const flagSize = window.innerWidth < 768 ? 30 : 80; // Mobile vs desktop flag size
        return sectionHeight - flagSize; // Ensure flags land at the bottom
      };
      
      // Create a timeline for the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: exchangeSectionRef.current,
          start: "top center",
          onEnter: () => {
            // Show flags first
            setShowFlags(true);
            
            // Small delay to ensure flags are rendered
            setTimeout(() => {
              // Reset flags to initial state
              gsap.set(flagsRefs.current, {
                y: -100,
                opacity: 0
              });
              
              // Calculate dynamic height based on section height
              const maxY = calculateMaxY();
              
              // Animate flags
              gsap.to(flagsRefs.current, {
                y: () => maxY - (Math.random() * 20),
                x: () => -800 + Math.random() * 1600,
                opacity: 1,
                duration: 1.2,
                ease: "bounce.out",
                stagger: 0.05
              });
            }, 50);
          },
          onLeave: () => {
            // Hide flags when leaving the section
            setShowFlags(false);
          },
          onEnterBack: () => {
            // Show flags again when scrolling back up
            setShowFlags(true);
          },
          onLeaveBack: () => {
            // Hide flags when scrolling back up past the trigger
            setShowFlags(false);
          }
        }
      });
      
      // Handle resize events to recalculate positions
      const handleResize = () => {
        if (tl.scrollTrigger?.isActive) {
          const maxY = calculateMaxY();
          gsap.set(flagsRefs.current, {
            y: () => maxY - (Math.random() * 20)
          });
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      console.log(tl)
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    return () => ctx.revert();
  }, [flags, isLoading]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 mt-[150px]">
      <div className="text-gradient border border-blue-500 rounded-full px-4 py-1 text-[0.9rem]">Request Feature</div>

      <div className="flex flex-col gap-[50px] md:gap-[100px] items-center justify-center">
        <h1 className="text-gradient md:text-[2.5rem] text-[1.8rem] md:w-[650px] w-[450px] text-center font-semibold md:leading-normal leading-[40px]">Need money? ask.<br/>Send a Request.<br/>They get a WhatsApp alert.</h1>

        <video autoPlay loop muted playsInline className="h-[400px] md:h-[500px] md:w-[700px] w-[350px] rounded-xl object-cover">
          <source src={jeton_card_video} />
        </video>

        <div className="flex flex-col gap-4 md:gap-8 items-center justify-center text-center">
          <h1 className="text-gradient md:text-[3.5rem] text-[1.8rem] md:w-[750px] w-[350px] text-center md:font-semibold font-bold md:leading-[55px] leading-[40px]">No wallet address needed. Just a number, and you're funded.
          </h1>
          <a href="#" className="p-4 bg-blue-500 text-white text-[1rem] rounded-[15px] w-[150px] text-center">Learn more</a>
          {/* <p className="text-blue-500 md:text-[1rem] text-[0.8rem] md:w-full w-[300px] text-center">Contract Address: 0x0000000000000000000000000000000000000000</p> */}
        </div>
      </div>

      <section ref={exchangeSectionRef} className="flex flex-col items-center justify-center relative h-[800px] pb-[150px]">
        {/* All flags container - behind form */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {!isLoading && showFlags && flags.map((flag, index) => (
            <img
              key={index}
              ref={el => {
                if (el) flagsRefs.current[index] = el;
              }}
              src={flag.src}
              alt={flag.alt}
              className="rounded-full w-[30px] h-[30px] md:w-[80px] md:h-[80px] object-cover absolute pointer-events-none"
              style={{ 
                left: `${Math.random() * 100}%`,
                top: '0px',
                borderRadius: '50%'
              }}
            />
          ))}
        </div>

        <div className="text-gradient border border-blue-500 rounded-full px-4 py-1 text-[0.9rem] mt-[200px] w-fit z-10">Buy USDC Instantly
        </div>

        <div className="flex flex-col gap-[30px] items-center justify-center mt-[10px] z-10">
          <h1 className="text-gradient md:text-[3.5rem] text-[2.5rem] md:w-[500px] w-[250px] text-center font-semibold md:leading-[70px] leading-[50px]">Convert fiat to USDC in seconds.</h1>
          <p className="text-blue-500 text-[0.8rem] md:w-[450px] w-[300px] text-center">*Conversion powered by MoonPay. Rates may vary based on provider fees and market conditions. at {new Date().toLocaleTimeString()} on {new Date().toLocaleDateString()}.</p>
        </div>

        <div className="z-10">
          <CurrencyExchange />
        </div>
      </section>
    </section>
  )
}

export default JettonCardSection;