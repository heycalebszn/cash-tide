import Navbar from "./layout/navbar";
import BottomNav from "./components/BottomNav";
import ChatSupportButton from "./components/ChatSupportButton";
import HeroSection from "./components/sections/hero";
import { useRef } from 'react';
import FinanceSection from "./components/sections/finance";
import ExchangeSection from "./components/sections/exchange";

const App = () => {
  const financeSectionRef = useRef<HTMLDivElement>(null);
  const exchangeSectionRef = useRef<HTMLDivElement>(null);

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
    </div>
  );
};

export default App;