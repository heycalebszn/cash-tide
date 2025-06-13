import Navbar from "./layout/navbar";
import BottomNav from "./components/BottomNav";
import ChatSupportButton from "./components/ChatSupportButton";
import HeroSection from "./components/sections/hero";
import { useRef } from 'react';
import FinanceSection from "./components/sections/finance";

const App = () => {
  const financeSectionRef = useRef<HTMLDivElement>(null);

  const scrollToFinance = () => {
    financeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-pink-500 to-orange-400 overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-r from-pink-500 to-orange-400 -z-10"></div>
      <Navbar />
      <HeroSection onScrollButtonClick={scrollToFinance} />
      <BottomNav />
      <ChatSupportButton />
      <FinanceSection ref={financeSectionRef} />
    </div>
  );
};

export default App;