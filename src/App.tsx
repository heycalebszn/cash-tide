import Navbar from "./layout/navbar";
import BottomNav from "./components/BottomNav";
import ChatSupportButton from "./components/ChatSupportButton";
import HeroSection from "./components/sections/hero";
import { useRef, useEffect } from 'react';
import FinanceSection from "./components/sections/finance";
import JettonCardSection from "./components/sections/jetton-card";
import ExchangeSection from "./components/sections/exchange";
import TestimonialsSection from "./components/sections/testimonials";
import CallToActionSection from "./components/sections/call-to-action";
import Footer from "./layout/footer";
import ManageSection from "./components/sections/manage";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const financeSectionRef = useRef<HTMLDivElement>(null);
  const exchangeSectionRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement>(null);
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: smoothContentRef.current,
      smooth: 1.5, // Adjust smoothness (higher = smoother)
      effects: true, // Enable effects for data-speed attributes
      normalizeScroll: true, // Normalize scroll across devices
      ignoreMobileResize: true, // Prevent recalculation on mobile resize
    });

    return () => {
      // Clean up
      smoother.kill();
    };
  }, []);

  const scrollToFinance = () => {
    financeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={smoothWrapperRef} className="smooth-wrapper">
      <div ref={smoothContentRef} className="smooth-content">
        <div className="relative min-h-screen bg-transparent overflow-x-hidden">
          <Navbar />
          <HeroSection onScrollButtonClick={scrollToFinance} />
          <BottomNav />
          <ChatSupportButton />
          <FinanceSection ref={financeSectionRef} />
          <ExchangeSection ref={exchangeSectionRef} />
          <ManageSection />
          <JettonCardSection />
          <TestimonialsSection ref={testimonialsSectionRef} />
          <CallToActionSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;