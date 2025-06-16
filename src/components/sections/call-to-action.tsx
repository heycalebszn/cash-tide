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
    let lastScrollTop = 0;
    let scrollDirection = 0;
    
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      scrollDirection = st > lastScrollTop ? 1 : -1; // 1 for down, -1 for up
      lastScrollTop = st;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(sectionBgRef.current, { backgroundColor: 'white' });
      gsap.set(h1TopRef.current, {
        color: '#FF4500', // Make text orange so it's visible when covered by triangle
        webkitBackgroundClip: 'text',
        backgroundClip: 'text',
        backgroundImage: 'linear-gradient(to bottom, #FF4500 50%, #FFFFFF 50%)',
        backgroundSize: '100% 200%',
        backgroundPosition: '0% 0%'
      });
      
      // Hide triangle initially
      gsap.set(triangleBgRef.current, { 
        clipPath: 'polygon(50% 0%, 50% 0%, 50% 0%)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        backgroundColor: 'white' // Make sure triangle background is white
      });

      // Animation for other elements
      gsap.set([pRef.current, appLinksRef.current], { opacity: 0, y: 50 });
      gsap.to(pRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      gsap.to(appLinksRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });

      // Create a separate timeline for the triangle animation with smoother transition
      const triangleTl = gsap.timeline({ paused: true });
      triangleTl.to(triangleBgRef.current, {
        clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)',
        opacity: 1,
        duration: 1.5, // Longer duration for smoother animation
        ease: "power1.inOut" // Smoother easing
      });
      
      // Create a timeline for the background and text
      const bgTl = gsap.timeline({ paused: true });
      bgTl.to(sectionBgRef.current, { backgroundColor: '#FF4500', duration: 1.5, ease: "power1.inOut" });
      bgTl.to(h1TopRef.current, { backgroundPosition: '0% 100%', duration: 1.5, ease: "power1.inOut" }, 0);

      // Create scroll trigger specifically for the paragraph
      ScrollTrigger.create({
        trigger: pRef.current,
        start: "bottom bottom", // Start when bottom of paragraph touches bottom of viewport
        end: "top -100%", // End when paragraph is well past the top of viewport
        scrub: 0.5, // Make animation follow scroll position smoothly
        onUpdate: (self) => {
          // Only animate when scrolling up
          if (scrollDirection === -1 && self.progress > 0) {
            // Use the progress value directly for smooth animation
            triangleTl.progress(self.progress);
            bgTl.progress(self.progress);
          } else {
            // When scrolling down or not past start point, keep animation at 0
            triangleTl.progress(0);
            bgTl.progress(0);
          }
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionBgRef} className="flex flex-col w-full items-center justify-center text-center h-screen gap-16 relative">
      {/* Triangle animation container */}
      <div ref={triangleBgRef} className="absolute inset-0 bg-white z-0"></div>
      
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
