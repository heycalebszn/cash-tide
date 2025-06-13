import Navbar from "./layout/navbar";
import BottomNav from "./components/BottomNav";
import ChatSupportButton from "./components/ChatSupportButton";
import HeroSection from "./components/sections/hero";

const App = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-pink-500 to-orange-400 overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-r from-pink-500 to-orange-400 -z-10"></div>
      <Navbar />
      <HeroSection />
      <BottomNav />
      <ChatSupportButton />
    </div>
  );
};

export default App;