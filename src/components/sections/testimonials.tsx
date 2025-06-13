import { testimonials_bg } from "../../assets";
import { testimonialsData } from "../../static/constants";
import TestimonialCard from "../TestimonialCard";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Commenting out GSAP animation for debugging visibility
    // if (!sectionRef.current) return;

    // const ctx = gsap.context(() => {
    //   gsap.set(cardsRef.current, {
    //     opacity: 1,
    //     y: 0, 
    //     x: (i) => (i % 2 === 0 ? -100 : 100)
    //   });

    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: sectionRef.current,
    //       start: 'top center',
    //       end: 'bottom center',
    //       scrub: true,
    //       pin: true,
    //       markers: true,
    //     }
    //   });

    //   tl.to(cardsRef.current, {
    //     y: (i) => i * -40, 
    //     x: 0,             
    //     stagger: {
    //       each: 0.1,      
    //       from: "end",    
    //     },
    //     ease: 'power2.out'
    //   });

    // }, sectionRef);

    // return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center p-16 relative overflow-hidden"
      style={{ backgroundImage: `url(${testimonials_bg})` }}
    >
      {/* Overlay for background image */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div> */}

      <h1 className="text-[5rem] text-white mb-10 text-center relative z-20">Hear from our clients</h1>
      {/* Commenting out testimonial cards for debugging visibility */}
      {/* <div className="flex flex-col gap-4 relative z-10 items-center">
        {testimonialsData.map((testimonial, index) => (
          <div 
            key={index} 
            ref={el => {
              cardsRef.current[index] = el;
            }} 
            className={`relative`}
            style={{
              zIndex: testimonialsData.length - index,
            }}
          >
            <TestimonialCard 
              brief={testimonial.brief}
              desc={testimonial.desc}
              name={testimonial.name}
              avatar={testimonial.avatar}
              avatarBgColor={testimonial.avatarBgColor}
            />
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default TestimonialsSection;
