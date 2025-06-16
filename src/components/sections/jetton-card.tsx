import { au_flag, eu_flag, is_flag, jeton_card_video, sen_flag, uk_flag } from "../../assets";
import CurrencyExchange from '../CurrencyExchange';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JettonCardSection = () => {
  const flagsRefs = useRef<HTMLImageElement[]>([]);
  const exchangeSectionRef = useRef<HTMLElement>(null);

  const flagsData = [
    { src: eu_flag, alt: "European Union flag" },
    { src: au_flag, alt: "Australian flag" },
    { src: sen_flag, alt: "Pakistan flag" },
    { src: is_flag, alt: "Israel flag" },
    { src: uk_flag, alt: "United Kingdom flag" },
    { src: sen_flag, alt: "Senegal flag" },
    { src: eu_flag, alt: "European Union flag" },
    { src: au_flag, alt: "Australian flag" },
    { src: eu_flag, alt: "Pakistan flag" },
    { src: is_flag, alt: "Israel flag" },
    { src: uk_flag, alt: "United Kingdom flag" },
    { src: sen_flag, alt: "Senegal flag" },
    { src: eu_flag, alt: "European Union flag" },
    { src: au_flag, alt: "Australian flag" },
    { src: sen_flag, alt: "Pakistan flag" },
    { src: is_flag, alt: "Israel flag" },
    { src: uk_flag, alt: "United Kingdom flag" },
    { src: sen_flag, alt: "Senegal flag" },
    { src: eu_flag, alt: "European Union flag" },
    { src: au_flag, alt: "Australian flag" },
    { src: eu_flag, alt: "Pakistan flag" },
    { src: is_flag, alt: "Israel flag" },
    { src: uk_flag, alt: "United Kingdom flag" },
    { src: sen_flag, alt: "Senegal flag" },
    { src: eu_flag, alt: "European Union flag" },
    { src: au_flag, alt: "Australian flag" },
    { src: sen_flag, alt: "Pakistan flag" },
    { src: is_flag, alt: "Israel flag" },
    { src: uk_flag, alt: "United Kingdom flag" },
    { src: sen_flag, alt: "Senegal flag" },
    { src: eu_flag, alt: "European Union flag" },
    { src: au_flag, alt: "Australian flag" },
    { src: eu_flag, alt: "Pakistan flag" },
    { src: is_flag, alt: "Israel flag" },
    { src: uk_flag, alt: "United Kingdom flag" },
    { src: sen_flag, alt: "Senegal flag" },
    { src: eu_flag, alt: "European Union flag" },
    { src: au_flag, alt: "Australian flag" },
    { src: sen_flag, alt: "Pakistan flag" },
    { src: is_flag, alt: "Israel flag" },
    { src: uk_flag, alt: "United Kingdom flag" },
    { src: sen_flag, alt: "Senegal flag" },
    { src: eu_flag, alt: "European Union flag" },
    { src: au_flag, alt: "Australian flag" },
    { src: eu_flag, alt: "Pakistan flag" },
    { src: is_flag, alt: "Israel flag" },
    { src: uk_flag, alt: "United Kingdom flag" },
    { src: sen_flag, alt: "Senegal flag" },
  ];

  // Duplicate flagsData to have enough items to fill the section with rows
  const extendedFlagsData = Array(2).fill(flagsData).flat(); // Creates 120 flags

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for all flags
      gsap.set(flagsRefs.current, {
        opacity: 0,
        top: -100, // Start off-screen above
        // Remove initial random 'left' from JSX, control it with GSAP
      });

      const flagsPerRow = 12; // Estimate: 12 flags per row for a typical width
      const flagSize = 80; // width and height of each flag
      const sectionHeight = 800; // From h-[800px] on the section
      const containerEffectiveWidth = 1000; // Estimated effective width for flags to spread

      // Animate flags to fill the section and stack in rows
      gsap.to(flagsRefs.current, {
        top: (index) => {
          const row = Math.floor(index / flagsPerRow);
          // Calculate target top so the bottom of the flag is at the section bottom, and then stacks up
          return (sectionHeight - ((row + 1) * flagSize)) + (Math.random() * 20 - 10); // Add small vertical jitter
        },
        left: (index) => {
          const col = index % flagsPerRow;
          // Calculate target left, centering the block of flags, adding small horizontal jitter
          const startingLeftOffset = (containerEffectiveWidth - (flagsPerRow * flagSize)) / 2;
          return startingLeftOffset + (col * flagSize) + (Math.random() * 20 - 10); // Add small horizontal jitter
        },
        opacity: 1,
        duration: 1.5, // Slightly longer duration for a more noticeable fall
        ease: "bounce.out", // Bounce easing for falling illusion and landing
        stagger: 0.03, // Small stagger for a distinct but rapid fill
        scrollTrigger: {
          trigger: exchangeSectionRef.current,
          start: "top center",
          // markers: true, // Uncomment for debugging scroll trigger
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 mt-[150px]">
      <div className="text-orange-500 border border-orange-500 rounded-full px-4 py-1 text-[0.9rem]">Jeton Card</div>

      <div className="flex flex-col gap-[50px] md:gap-[100px] items-center justify-center">
        <h1 className="text-orange-600 md:text-[2.5rem] text-[1.5rem] md:w-[650px] w-[450px] text-center font-semibold md:leading-normal leading-[40px]">Contactless payments? Sure.<br/>Spending limits? Check.<br/>Card freezing? Also check.</h1>

        <video autoPlay loop muted playsInline className="h-[400px] md:h-[800px] md:w-[800px] w-[350px] rounded-xl object-cover">
          <source src={jeton_card_video} />
        </video>

        <div className="flex flex-col gap-4 md:gap-8 items-center justify-center">
          <h1 className="text-orange-600 md:text-[4rem] text-[2rem] md:w-[750px] w-[380px] text-center md:font-semibold font-bold md:leading-[80px] leading-[40px]">Jeton Card: Your Go-To for Every Purchase</h1>
          <a href="#" className="p-4 bg-orange-500 text-white text-[1rem] rounded-[15px] w-[150px] text-center">Learn more</a>
        </div>
      </div>

      <section ref={exchangeSectionRef} className="flex flex-col items-center justify-center relative h-[800px] pb-[70px]">
        {/* All flags container - behind form */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {extendedFlagsData.map((flag, index) => (
            <img
              key={index}
              ref={el => {
                if (el) flagsRefs.current[index] = el;
              }}
              src={flag.src}
              alt={flag.alt}
              className="rounded-full w-[80px] h-[80px] object-cover absolute pointer-events-none"
              // REMOVED inline style: style={{ left: `${Math.random() * 80}%`, top: '0px', borderRadius: '50%' }}
            />
          ))}
        </div>

        <div className="text-orange-500 border border-orange-500 rounded-full px-4 py-1 text-[0.9rem] mt-[200px] w-fit z-10">Exchange</div>

        <div className="flex flex-col gap-[30px] items-center justify-center mt-[10px] z-10">
          <h1 className="text-orange-600 md:text-[4.5rem] text-[2.5rem] md:w-[500px] w-[250px] text-center font-semibold md:leading-[70px] leading-[50px]">Convert fiat cash easily.</h1>
          <p className="text-orange-500 text-[0.8rem] md:w-[450px] w-[300px] text-center">*The displayed conversion rates and fees may vary during the currency exchange process, d the rates shown were last updated at 00:59 on 05:06.2025.</p>
        </div>

        <div className="z-10">
          <CurrencyExchange />
        </div>
      </section>
    </section>
  )
}

export default JettonCardSection;