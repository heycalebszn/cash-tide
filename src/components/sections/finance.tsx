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

  useEffect(() => {
    if (!ref || typeof ref === 'function' || !ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([image1Ref.current, image2Ref.current, image3Ref.current, image4Ref.current], { 
        opacity: 1,
        scale: 0.5,
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50, // Center horizontally
        yPercent: -50,  // Center vertically
        zIndex: 1 // Default z-index for images
      });
      // Initial state for h1 is handled by its CSS class and will be animated

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=1000',    // End after 1000 pixels of scrolling
          scrub: true,
          pin: true,       // Pin the section during the animation
        }
      });

      // Animate text to disappear
      tl.to(h1Ref.current, { scale: 0, opacity: 0, ease: 'power2.out' }, 0);

      // Animate image1 (top-left to center)
      tl.fromTo(image1Ref.current, 
        { xPercent: -300, yPercent: -150, opacity: 1, scale: 0.5 }, 
        { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, ease: 'power2.out' }, 0
      );

      // Animate image2 (top-right to center)
      tl.fromTo(image2Ref.current, 
        { xPercent: 300, yPercent: -150, opacity: 1, scale: 0.5, zIndex: 3 }, 
        { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, ease: 'power2.out' }, 0
      );

      // Animate image3 (bottom-left to center)
      tl.fromTo(image3Ref.current, 
        { xPercent: -300, yPercent: 50, opacity: 1, scale: 0.5, zIndex: 4 }, 
        { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, ease: 'power2.out' }, 0
      );

      // Animate image4 (bottom-right to center)
      tl.fromTo(image4Ref.current, 
        { xPercent: 300, yPercent: 50, opacity: 1, scale: 0.5, zIndex: 5 }, 
        { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, ease: 'power2.out' }, 0
      );

    }, ref);

    return () => ctx.revert();
  }, [ref]);

  return (
    <div ref={ref} className="relative bg-white h-screen overflow-hidden">
      <h1 ref={h1Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] text-center leading-[200px] text-orange-600 font-semibold whitespace-nowrap z-50">Unify your <br /> finances</h1>

      <img ref={image1Ref} src={finance_image1} alt="" className="absolute w-[300px]" />
      <img ref={image2Ref} src={finance_image2} alt="" className="absolute w-[300px]" />
      <img ref={image3Ref} src={finance_image3} alt="" className="absolute w-[300px]" />
      <img ref={image4Ref} src={finance_image4} alt="" className="absolute w-[300px]" />
    </div>
  );
});

export default FinanceSection;