import Navbar from "./layout/navbar";
import BottomNav from "./components/BottomNav";
import ChatSupportButton from "./components/ChatSupportButton";
import HeroSection from "./components/sections/hero";
import { useRef } from 'react';
import FinanceSection from "./components/sections/finance";
import JettonCardSection from "./components/sections/jetton-card";
import ExchangeSection from "./components/sections/exchange";
import TestimonialsSection from "./components/sections/testimonials";
import CallToActionSection from "./components/sections/call-to-action";

const App = () => {
  const financeSectionRef = useRef<HTMLDivElement>(null);
  const exchangeSectionRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToFinance = () => {
    financeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection onScrollButtonClick={scrollToFinance} />
      <BottomNav />
      <ChatSupportButton />
      <FinanceSection ref={financeSectionRef} />
      <ExchangeSection ref={exchangeSectionRef} />
      <JettonCardSection />
      <TestimonialsSection ref={testimonialsSectionRef} />
      <CallToActionSection />
    </div>
  );
};

export default App;