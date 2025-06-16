import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CallToActionSection = () => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const appLinksRef = useRef<HTMLDivElement>(null);
  const triangleBgRef = useRef<HTMLDivElement>(null);
  const sectionBgRef = useRef<HTMLElement>(null);
  const h1TopRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Set initial states
    gsap.set(sectionBgRef.current, { backgroundColor: 'white' }); // Background stays white
    gsap.set(h1TopRef.current, {
      color: '#FF4500', // Orange text
      webkitBackgroundClip: 'text',
      backgroundClip: 'text',
      backgroundImage: 'linear-gradient(to bottom, #FF4500 50%, #FFFFFF 50%)',
      backgroundSize: '100% 200%',
      backgroundPosition: '0% 0%'
    });
    
    // Set initial triangle state - start with no triangle
    gsap.set(triangleBgRef.current, { 
      clipPath: 'polygon(0% 0%, 100% 0%, 50% 0%)', // Triangle starts as a line at the top
      backgroundColor: '#FF4500', // Triangle is orange
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 1
    });

    // Animation for other elements
    gsap.set([pRef.current, appLinksRef.current], { opacity: 0, y: 50 });
    gsap.to(pRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(appLinksRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });

    // Create the main timeline for smooth animation
    const tl = gsap.timeline({ paused: true });
    
    // Add animations to the timeline - background stays white
    tl.to(h1TopRef.current, { 
      backgroundPosition: '0% 100%', 
      duration: 1,
      ease: "none"
    }, 0);
    
    // Triangle grows from top down
    tl.to(triangleBgRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', // Triangle grows downward from top
      duration: 1,
      ease: "none"
    }, 0);

    // Create the scroll trigger with scrub for smooth animation
    ScrollTrigger.create({
      trigger: pRef.current, // Trigger on the paragraph
      start: "bottom bottom", // Start when bottom of paragraph touches bottom of viewport
      end: "top top", // End when top of paragraph touches top of viewport
      scrub: 1, // Smooth scrubbing effect
      onUpdate: (self) => {
        // Only animate when scrolling up
        if (self.direction < 0) {
          tl.progress(self.progress);
        } else {
          // Smoothly reverse when scrolling down
          tl.progress(1 - self.progress);
        }
      }
    });

    return () => {
      // Cleanup
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionBgRef} className="flex flex-col w-full items-center justify-center text-center h-screen gap-16 relative">
      {/* Triangle animation container */}
      <div ref={triangleBgRef} className="absolute inset-0 z-0"></div>
      
      {/* Content wrapper with original positioning */}
      <div className="overflow-hidden relative z-10">
        <h1 ref={h1TopRef} className="text-[4rem] w-[400px] font-bold leading-[3.5rem] md:text-[8rem] md:w-[1000px] md:leading-[130px]">1 million users, plus you.</h1>
        <div className="relative">
        </div>
      </div>

      <p ref={pRef} className="text-[1rem] text-orange-500 md:text-[1.5rem]">It only takes few seconds to get started.</p>

      <div ref={appLinksRef} className="flex items-center gap-4">
        <a href="#" className="flex items-center space-x-2 bg-transparent border border-orange-500 text-orange-500 px-4 h-fit rounded-lg transition-colors" aria-label="Download on the App Store">
          <AiFillApple className="text-2xl md:text-3xl" />
          <div className="flex flex-col text-left">
            <span className="text-xs">Download on the</span>
            <span className="text-base font-semibold md:text-lg">App Store</span>
          </div>
        </a>
        <a href="#" className="flex items-center space-x-2 bg-transparent border border-orange-500 text-orange-500 px-4 h-fit rounded-lg transition-colors" aria-label="Get it on Google Play">
          <FaGooglePlay className="text-2xl md:text-3xl" />
          <div className="flex flex-col text-left">
            <span className="text-xs">GET IT ON</span>
            <span className="text-base font-semibold md:text-lg">Google Play</span>
          </div>
        </a>
      </div>
    </section>
  )
}

export default CallToActionSection;
