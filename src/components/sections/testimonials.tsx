import { testimonials_bg } from "../../assets";
import { testimonialsData } from "../../static/constants";
import TestimonialCard from "../TestimonialCard";
import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = forwardRef<HTMLDivElement>((props, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state - cards in normal position
      gsap.set(cardsRef.current, {
        opacity: 1,
        y: 0
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom', // Start when section hits bottom of viewport
          end: 'top',        // End when section hits top of viewport
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onEnter: () => {
            // Reset cards to normal position when entering from top
            gsap.set(cardsRef.current, { y: 0 });
          }
        }
      });

      // Get the last card (David P.)
      const lastCard = cardsRef.current[cardsRef.current.length - 1];
      if (lastCard) {
        const bottomNavHeight = 56;
        const bottomMargin = 16;
        const stopPosition = window.innerHeight - bottomNavHeight - bottomMargin;

        // First, move the last card to stop at bottom nav
        tl.to(lastCard, {
          y: stopPosition,
          ease: "none"
        });

        // Then, one by one, stack the other cards above it
        for (let i = cardsRef.current.length - 2; i >= 0; i--) {
          const card = cardsRef.current[i];
          if (card) {
            tl.to(card, {
              y: stopPosition - ((cardsRef.current.length - 1 - i) * 100),
              ease: "none"
            }, "<+=0.1"); // Slight delay between each card
          }
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={ref}
      className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-16 relative overflow-hidden"
      style={{ backgroundImage: `url(${testimonials_bg})` }}
    >
      <h1 className="text-[5rem] text-white mb-10 text-center relative z-20">Hear from our clients</h1>

      <div className="flex flex-col gap-2 relative z-30 items-center"> 
        {testimonialsData.map((testimonial, index) => (
          <div 
            key={index} 
            ref={el => {
              cardsRef.current[index] = el;
            }} 
            className={`relative`}
            style={{
              marginTop: index === 0 ? '0px' : '0px',
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
      </div>
    </div>
  )
});

export default TestimonialsSection;