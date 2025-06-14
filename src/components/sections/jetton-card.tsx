import { au_flag, eu_flag, is_flag, jeton_card_video, pk_flag, sen_flag, uk_flag } from "../../assets";
import CurrencyExchange from '../CurrencyExchange';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JettonCardSection = () => {
  const flagsRefs = useRef<HTMLImageElement[]>([]); // Specify the type of elements in the array
  const exchangeSectionRef = useRef<HTMLElement>(null); // Ref for the exchange section

  // Data for flags
  const flagsData = [
    { src: eu_flag, alt: "European Union flag" },
    { src: au_flag, alt: "Australian flag" },
    { src: pk_flag, alt: "Pakistan flag" },
    { src: is_flag, alt: "Israel flag" },
    { src: uk_flag, alt: "United Kingdom flag" },
    { src: sen_flag, alt: "Senegal flag" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for all flags (off-screen top, slightly rotated, hidden)
      // Ensure flagsRefs.current contains actual DOM elements before animating
      if (flagsRefs.current.length === 0) return; // Prevent animation if refs are not yet assigned

      gsap.set(flagsRefs.current, {
        y: -200, // Start above the viewport top
        rotation: 0, // Initial rotation
        opacity: 0, // Start hidden
      });

      // Create a timeline for the flags animation
      const tl = gsap.timeline({ defaults: { ease: "bounce.out", duration: 1.5 } });

      // Animate flags falling and rolling dynamically
      flagsRefs.current.forEach((flagRef) => {
        // Each flag is animated with a slight stagger applied implicitly by forEach and the timeline's default duration.
        // If explicit staggering is needed, it can be added to the .to() call, or a more advanced GSAP stagger method.
        tl.to(flagRef, { y: 250, opacity: 1, rotation: 720 }, "<0.1"); // Stagger each animation 0.1s after the previous one completes
      });

      // ScrollTrigger to play the animation once when the exchange section enters view
      ScrollTrigger.create({
        trigger: exchangeSectionRef.current,
        start: "top center", // When the top of the section is in the middle of the viewport
        once: true, // Only play once
        onEnter: () => tl.play(),
        markers: true, // For debugging
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 mt-[150px]">
      <div className="text-orange-500 border border-orange-500 rounded-full px-4 py-1 text-[0.8rem]">Jeton Card</div>

      <div className="flex flex-col gap-[100px] items-center justify-center">
        <h1 className="text-orange-600 text-[2.5rem] w-[550px] text-center font-semibold">Contactless payments? Sure.<br/>Spending limits? Check.<br/>Card freezing? Also check.</h1>

    <video autoPlay loop muted playsInline className="h-[500px] w- rounded-xl">
    <source src={jeton_card_video} />
    </video>

    <div className="flex flex-col gap-8 items-center justify-center">
    <h1 className="text-orange-600 text-[4.5rem] w-[800px] text-center font-semibold leading-[80px]">Jeton Card: Your Go-To for Every Purchase</h1>
    <a href="#" className="p-4 bg-orange-500 text-white text-[0.9rem] rounded-[15px] w-[150px] text-center">Learn more</a>
    </div>
      </div>

      <section ref={exchangeSectionRef} className="flex flex-col items-center justify-center relative overflow-hidden h-[800px]"> {/* Added ref, overflow-hidden, and fixed height for clearer positioning */}
        {/* Flags positioned absolutely within this section */}
        <div className="absolute inset-0 flex flex-wrap justify-around items-end z-20"> {/* inset-0 makes it fill parent. z-20 puts it on top. items-end aligns to bottom, but we animate y */}
          {flagsData.map((flag, index) => (
            <img
              key={index}
              ref={el => {
                // Ensure el is not null and assign to the current index
                if (el) {
                  flagsRefs.current[index] = el;
                }
              }}
              src={flag.src}
              alt={flag.alt}
              className="rounded-full w-[70px]"
            />
          ))}
        </div>
      <div className="text-orange-500 border border-orange-500 rounded-full px-4 py-1 text-[0.8rem] mt-[200px] w-fit">Exchange</div>

      <div className="flex flex-col gap-[30px] items-center justify-center mt-[10px]">
      <h1 className="text-orange-600 text-[4.5rem] w-[500px] text-center font-semibold leading-[70px]">Convert fiat cash easily.</h1>
      <p className="text-orange-500 text-[0.8rem] w-[450px] text-center">*The displayed conversion rates and fees may vary during the currency exchange process, d the rates shown were last updated at 00:59 on 05:06.2025.</p>
      </div>

      <CurrencyExchange />

      </section>
    </section>
  )
}

export default JettonCardSection;