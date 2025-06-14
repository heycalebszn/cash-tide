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
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(flagsRefs.current, {
        y: -100,
        opacity: 0
      });

      // Simple bounce animation with varying final positions
      gsap.to(flagsRefs.current, {
        y: (index) => index % 2 === 0 ? 720 : 370, // Adjusted middle position to land exactly at top edge of first form
        opacity: 1,
        duration: 2,
        ease: "bounce.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: exchangeSectionRef.current,
          start: "top center",
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 mt-[150px]">
      <div className="text-orange-500 border border-orange-500 rounded-full px-4 py-1 text-[0.9rem]">Jeton Card</div>

      <div className="flex flex-col gap-[100px] items-center justify-center">
        <h1 className="text-orange-600 md:text-[2.5rem] text-[1.8rem] md:w-[550px] w-[400px] text-center font-semibold md:leading-normal leading-[50px]">Contactless payments? Sure.<br/>Spending limits? Check.<br/>Card freezing? Also check.</h1>

        <video autoPlay loop muted playsInline className="h-[800px] md:w-[800px] w-[350px] rounded-xl">
          <source src={jeton_card_video} />
        </video>

        <div className="flex flex-col gap-8 items-center justify-center">
          <h1 className="text-orange-600 md:text-[4.5rem] text-[3rem] md:w-[500px] w-[250px] text-center md:font-semibold font-bold md:leading-[80px] leading-[50px]">Jeton Card: Your Go-To for Every Purchase</h1>
          <a href="#" className="p-4 bg-orange-500 text-white text-[1rem] rounded-[15px] w-[150px] text-center">Learn more</a>
        </div>
      </div>

      <section ref={exchangeSectionRef} className="flex flex-col items-center justify-center relative overflow-hidden h-[800px] pb-[20px]">
        {/* Bottom flags container - behind form */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {flagsData.filter((_, index) => index % 2 === 0).map((flag, index) => (
            <img
              key={index}
              ref={el => {
                if (el) flagsRefs.current[index * 2] = el;
              }}
              src={flag.src}
              alt={flag.alt}
              className="rounded-full w-[80px] h-[80px] object-cover absolute pointer-events-none"
              style={{ 
                left: `${Math.random() * 80}%`,
                top: '0px',
                borderRadius: '50%'
              }}
            />
          ))}
        </div>

        {/* Middle flags container - in front of form */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {flagsData.filter((_, index) => index % 2 === 1).map((flag, index) => (
            <img
              key={index}
              ref={el => {
                if (el) flagsRefs.current[index * 2 + 1] = el;
              }}
              src={flag.src}
              alt={flag.alt}
              className="rounded-full w-[80px] h-[80px] object-cover absolute pointer-events-none"
              style={{ 
                left: `${Math.random() * 80}%`,
                top: '0px',
                borderRadius: '50%'
              }}
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