import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CallToActionSection = () => {
  const pRef = useRef(null);
  const appLinksRef = useRef(null);
  const triangleBgRef = useRef(null); // Ref for the animating white background triangle
  const sectionBgRef = useRef(null); // Ref for the animating section background
  const h1TopRef = useRef(null); // Ref for "1 million users," part
  const h1BottomRef = useRef(null); // Ref for "plus you." part

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the animation, paused initially
      const tl = gsap.timeline({ paused: true });

      // Set initial states:
      gsap.set(sectionBgRef.current, { backgroundColor: 'white' });
      gsap.set(h1TopRef.current, { color: '#FF4500' }); // Initial red/orange for top text
      gsap.set(h1BottomRef.current, { color: '#FF4500' }); // Initial red/orange for bottom text
      gsap.set(triangleBgRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 50% 0%)' }); // White triangle hidden at top

      // Animation for other elements (these will still slide up/fade in as before)
      gsap.set([pRef.current, appLinksRef.current], { opacity: 0, y: 50 });
      gsap.to(pRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: pRef.current, start: "top bottom", toggleActions: "play none none reverse" } });
      gsap.to(appLinksRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: appLinksRef.current, start: "top bottom", toggleActions: "play none none reverse" } });

      // Define the main animation timeline (all start at the same time: 0)
      tl.to(sectionBgRef.current, { backgroundColor: '#FF4500', duration: 0.8 }, 0); // Section background turns red/orange
      tl.to(h1TopRef.current, { color: '#FFFFFF', duration: 0.8 }, 0); // Top text turns white
      tl.to(triangleBgRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', duration: 0.8 }, 0); // White triangle sweeps down

      // Attach the timeline to a ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionBgRef.current,
        start: "top bottom", // Start when the top of the section enters the bottom of the viewport
        end: "center center", // End when the center of the section reaches the center of the viewport
        scrub: true, // Link animation to scroll position
        onUpdate: self => {
          if (self.direction === -1) { // If scrolling up
            if (self.progress < 1) { // If animation is not fully played
              tl.play();
            }
          } else { // If scrolling down
            if (self.progress > 0) { // If animation is not fully reversed
              tl.reverse();
            }
          }
        },
      });

    });

    return () => ctx.revert(); // Clean up GSAP context on unmount
  }, []);

  return (
    <section className="flex flex-col w-full items-center justify-center text-center h-screen gap-16 relative"> {/* Section is relative, background animated */}
      <div ref={sectionBgRef} className="absolute inset-0 z-0"></div> {/* Animating section background */}
      <div className="overflow-hidden relative z-10"> {/* Wrapper for h1 parts and animating triangle */}
        <h1 ref={h1TopRef} className="text-[8rem] w-[1000px] font-bold leading-[130px]">1 million users,</h1> {/* Top part of h1 */}
        <div ref={triangleBgRef} className="absolute inset-0 bg-white z-0"> {/* Animating white triangle background */}
          <h1 ref={h1BottomRef} className="text-[8rem] w-[1000px] font-bold leading-[130px] relative">plus you.</h1> {/* Bottom part of h1 */}
        </div>
      </div>
      <p ref={pRef} className="text-[1.5rem] text-orange-500">It only takes few seconds to get started.</p>

      <div ref={appLinksRef} className="flex items-center gap-4">
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-orange-500 text-orange-500 px-4 h-fit rounded-lg transition-colors" aria-label="Download on the App Store">
            <AiFillApple className="text-3xl" />
            <div className="flex flex-col text-left">
              <span className="text-xs">Download on the</span>
              <span className="text-lg font-semibold">App Store</span>
            </div>
          </a>
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-orange-500 text-orange-500 px-4 h-fit rounded-lg transition-colors" aria-label="Get it on Google Play">
            <FaGooglePlay className="text-3xl" />
            <div className="flex flex-col text-left">
              <span className="text-xs">GET IT ON</span>
              <span className="text-lg font-semibold">Google Play</span>
            </div>
          </a>
          </div>
    </section>
  )
}

export default CallToActionSection;
