import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CallToActionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial states
    gsap.set(headingRef.current, { color: '#3182ce' }); // Orange text initially
    
    // Set initial triangle state - hidden at first
    gsap.set(triangleRef.current, { 
      clipPath: 'polygon(0% 0%, 100% 0%, 50% 0%)', // Triangle starts as a line at the top
      backgroundColor: '#3182ce', // Triangle is orange
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0
    });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Start when top of section hits bottom of viewport
        end: "top top", // End when top of section hits top of viewport
        scrub: 1, // Smooth scrubbing effect
        toggleActions: "play none none reverse"
      }
    });

    // Triangle animation - grows from top
    tl.to(triangleRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', // Triangle expands downward
      duration: 1,
      ease: "power1.inOut"
    }, 0);

    // Text color animation - changes from orange to white
    tl.to(headingRef.current, {
      color: '#FFFFFF', // Text becomes white
      duration: 1,
      ease: "power1.inOut"
    }, 0);

    // Content color animation - paragraph and buttons
    if (contentRef.current) {
      tl.to(contentRef.current.querySelectorAll('p, a'), {
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        duration: 1,
        ease: "power1.inOut"
      }, 0);
    }

    return () => {
      // Cleanup
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col w-full items-center justify-center text-center h-screen gap-16 relative bg-white">
      {/* Triangle background */}
      <div ref={triangleRef} className="absolute inset-0 z-0"></div>
      
      {/* Content with z-index to stay above triangle */}
      <div ref={contentRef} className="flex flex-col items-center justify-center gap-16 z-10 relative">
        <div className="relative z-10">
          <h1 ref={headingRef} className="text-[4rem] w-[400px] font-bold leading-[3.5rem] md:text-[8rem] md:w-[1000px] md:leading-[130px]">
            1 million users, plus you.
          </h1>
        </div>

        <p className="text-[1rem] text-blue-500 md:text-[1.5rem]">
          It only takes few seconds to get started.
        </p>

        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-blue-500 text-gradient px-4 h-fit rounded-lg transition-colors" aria-label="Download on the App Store">
            <AiFillApple className="text-2xl md:text-3xl" />
            <div className="flex flex-col text-left">
              <span className="text-xs">Download on the</span>
              <span className="text-base font-semibold md:text-lg">App Store</span>
            </div>
          </a>
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-blue-500 text-gradient px-4 h-fit rounded-lg transition-colors" aria-label="Get it on Google Play">
            <FaGooglePlay className="text-2xl md:text-3xl" />
            <div className="flex flex-col text-left">
              <span className="text-xs">GET IT ON</span>
              <span className="text-base font-semibold md:text-lg">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;