import { forwardRef, useRef, useEffect, type Ref } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { finance_image1, finance_image2, finance_image3, finance_image4 } from '../../assets';

gsap.registerPlugin(ScrollTrigger);

const FinanceSection = forwardRef<HTMLDivElement>((props, ref: Ref<HTMLDivElement>) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const image3Ref = useRef<HTMLImageElement>(null);
  const image4Ref = useRef<HTMLImageElement>(null);
  console.log(props)

  useEffect(() => {
    if (!ref || typeof ref === 'function' || !ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial state for images
      gsap.set([image1Ref.current, image2Ref.current, image3Ref.current, image4Ref.current], { 
        opacity: 1,
        scale: 0.5,
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        zIndex: 1
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=1000',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1
        }
      });

      // Animate text to disappear
      tl.to(h1Ref.current, { 
        scale: 0, 
        opacity: 0, 
        ease: 'power2.out' 
      }, 0);

      // Calculate viewport-based distances
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const distanceX = Math.max(viewportWidth * 0.4, 400);
      const distanceY = Math.max(viewportHeight * 0.2, 200);

      // Animate images with faster timing
      tl.fromTo(image1Ref.current, 
        { xPercent: -distanceX, yPercent: -distanceY, opacity: 1, scale: 0.5 }, 
        { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, ease: 'power2.out' }, 0
      );

      tl.fromTo(image2Ref.current, 
        { xPercent: distanceX, yPercent: -distanceY, opacity: 1, scale: 0.5, zIndex: 3 }, 
        { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, ease: 'power2.out' }, 0
      );

      tl.fromTo(image3Ref.current, 
        { xPercent: -distanceX, yPercent: distanceY, opacity: 1, scale: 0.5, zIndex: 4 }, 
        { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, ease: 'power2.out' }, 0
      );

      tl.fromTo(image4Ref.current, 
        { xPercent: distanceX, yPercent: distanceY, opacity: 1, scale: 0.5, zIndex: 5 }, 
        { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, ease: 'power2.out' }, 0
      );

    }, ref);

    return () => ctx.revert();
  }, [ref]);

  return (
    <div ref={ref} className="relative bg-white h-screen overflow-hidden">
      {/* H1: Mobile-first size, desktop override */}
      <h1 ref={h1Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl leading-[60px] text-gradient font-extrabold z-50 w-full text-center md:text-[200px] md:leading-[200px]">Unify your <br /> finances</h1>

      {/* Images: Mobile-first width, desktop override */}
      <img ref={image1Ref} src={finance_image1} alt="" className="absolute w-[200px] md:w-[300px]" />
      <img ref={image2Ref} src={finance_image2} alt="" className="absolute w-[200px] md:w-[300px]" />
      <img ref={image3Ref} src={finance_image3} alt="" className="absolute w-[200px] md:w-[300px]" />
      <img ref={image4Ref} src={finance_image4} alt="" className="absolute w-[200px] md:w-[300px]" />
    </div>
  );
});

export default FinanceSection;