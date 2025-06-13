import { forwardRef, useRef, useEffect, type Ref } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BiSend } from "react-icons/bi";
import { PiPlus } from "react-icons/pi";
import { SiExpertsexchange } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const ExchangeSection = forwardRef<HTMLDivElement>((props, ref: Ref<HTMLDivElement>) => {
  const addRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLDivElement>(null);
  const exchangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref || typeof ref === 'function' || !ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(addRef.current, {
        opacity: 0,
        yPercent: -100, // Start from above
      });

      gsap.set([sendRef.current, exchangeRef.current], {
        opacity: 0,
        yPercent: 100, // Start from below
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top',
          end: '+=1500',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // First animate "Add" in
      tl.to(addRef.current, { 
        opacity: 1, 
        yPercent: 0, 
        ease: 'power2.out',
        duration: 0.5
      }, 0);
      
      // Then animate "Send" in from bottom
      tl.to(sendRef.current, { 
        opacity: 1, 
        yPercent: 0, 
        ease: 'power2.out',
        duration: 0.5
      }, 0.5);
      
      // Finally animate "Exchange" in from bottom
      tl.to(exchangeRef.current, { 
        opacity: 1, 
        yPercent: 0, 
        ease: 'power2.out',
        duration: 0.5
      }, 1);

    }, ref);

    return () => ctx.revert();
  }, [ref]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col bg-white items-center justify-center overflow-hidden">
      <div ref={addRef} className="flex gap-3 items-center">
        <PiPlus className="bg-green-400 rounded-[15px] text-[4rem] p-1 text-white" />
        <span className="text-green-400 text-[7rem] font-semibold">Add</span>
      </div>
      <div ref={sendRef} className="flex gap-3 items-center">
        <BiSend className="bg-blue-400 rounded-[15px] text-[4rem] p-1 text-white" />
        <span className="text-blue-400 text-[7rem] font-semibold">Send</span>
      </div>
      <div ref={exchangeRef} className="flex gap-3 items-center">
        <SiExpertsexchange className="bg-red-400 rounded-[15px] text-[4rem] p-1 text-white" />
        <span className="text-red-400 text-[7rem] font-semibold">Exchange</span>
      </div>
    </div>
  )
});

export default ExchangeSection;