import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CallToActionSection = () => {
  const pRef = useRef(null);
  const appLinksRef = useRef(null);
  const triangleBgRef = useRef(null);
  const sectionBgRef = useRef(null);
  const h1TopRef = useRef(null);
  const h1BottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the animation, paused initially
      const tl = gsap.timeline({ paused: true });

      // Set initial states:
      gsap.set(sectionBgRef.current, { backgroundColor: 'white' });
      gsap.set(h1TopRef.current, { color: '#FF4500' });
      gsap.set(h1BottomRef.current, { color: '#FF4500' });
      gsap.set(triangleBgRef.current, { 
        clipPath: 'polygon(0% 0%, 100% 0%, 50% 0%)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      });

      // Animation for other elements
      gsap.set([pRef.current, appLinksRef.current], { opacity: 0, y: 50 });
      gsap.to(pRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: pRef.current, start: "top bottom", toggleActions: "play none none reverse" } });
      gsap.to(appLinksRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: appLinksRef.current, start: "top bottom", toggleActions: "play none none reverse" } });

      // Define the main animation timeline
      tl.to(sectionBgRef.current, { backgroundColor: '#FF4500', duration: 0.8 }, 0);
      tl.to(h1TopRef.current, { color: '#FFFFFF', duration: 0.8 }, 0);
      tl.to(triangleBgRef.current, { 
        clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', 
        duration: 0.8,
        ease: "power2.inOut"
      }, 0);

      // Attach the timeline to a ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionBgRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: self => {
          if (self.direction === -1) {
            if (self.progress < 1) {
              tl.play();
            }
          } else {
            if (self.progress > 0) {
              tl.reverse();
            }
          }
        },
      });

    });

    return () => ctx.revert();
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
