import { useState, useEffect, useRef } from "react";
import { manage_bg, jeton_home, product_1, product_2, jeton_card_video } from "../../assets";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { gsap } from "gsap";

// Define tab content data
const tabData = [
  {
    id: 1,
    title: "Payment",
    heading: "50+ payment methods across Europe",
    description: "Jeton is seamlessly connected with more than 25 countries, and 50 payment methods.",
    video: jeton_home,
    textPosition: "right", // Text on the right
    duration: 8 // Duration in seconds
  },
  {
    id: 2,
    title: "Send",
    heading: "Send money instantly to anyone",
    description: "Transfer funds quickly and securely to friends and family worldwide.",
    video: product_1,
    textPosition: "left", // Text on the left
    duration: 8 // Duration in seconds
  },
  {
    id: 3,
    title: "Method",
    heading: "Choose your preferred payment method",
    description: "From bank transfers to digital wallets, we've got you covered.",
    video: product_2,
    textPosition: "right", // Text on the right
    duration: 8 // Duration in seconds
  },
  {
    id: 4,
    title: "Security",
    heading: "Bank-grade security for your peace of mind",
    description: "Your transactions and data are protected with the highest security standards.",
    video: jeton_card_video,
    textPosition: "left", // Text on the left
    duration: 8 // Duration in seconds
  },
  {
    id: 5,
    title: "Support",
    heading: "24/7 customer support",
    description: "Our team is always available to help you with any questions.",
    video: manage_bg,
    textPosition: "both", // Text on both sides
    duration: 8 // Duration in seconds
  }
];

const ManageSection = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [animationProgress, setAnimationProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<number | null>(null);
  
  // Get current tab data
  const currentTab = tabData.find(tab => tab.id === activeTab) || tabData[0];

  // Clear any existing interval
  const clearProgressInterval = () => {
    if (progressIntervalRef.current !== null) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Sync tab animation with video playback
  useEffect(() => {
    const videoElement = videoRef.current;
    clearProgressInterval(); // Clear any existing interval
    
    // Reset animation progress when tab changes
    setAnimationProgress(0);
    
    const handleVideoEnded = () => {
      // Move to the next tab, or back to the first if we're at the last one
      setActiveTab(prev => {
        const nextTab = prev + 1;
        return nextTab <= tabData.length ? nextTab : 1;
      });
    };
    
    if (videoElement) {
      // Get the duration for the current tab
      const duration = currentTab.duration * 1000; // Convert to milliseconds
      const steps = 100; // Number of steps for the animation
      const stepTime = duration / steps;
      
      // Start the video
      videoElement.currentTime = 0;
      videoElement.play();
      
      // Start the animation progress in sync with video
      progressIntervalRef.current = window.setInterval(() => {
        setAnimationProgress(prev => {
          const newProgress = prev + (1 / steps);
          return newProgress >= 1 ? 1 : newProgress;
        });
      }, stepTime);
      
      // Set timeout to move to next tab when video should end
      const videoTimeout = setTimeout(() => {
        clearProgressInterval();
        handleVideoEnded();
      }, duration);
      
      return () => {
        clearTimeout(videoTimeout);
        clearProgressInterval();
      };
    }
  }, [activeTab, currentTab.duration]);

  // GSAP animations when tab changes
  useEffect(() => {
    // Animate phone
    if (phoneRef.current) {
      gsap.fromTo(
        phoneRef.current,
        { 
          scale: 0.9,
          opacity: 0.7
        },
        { 
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }

    // Animate left text if it exists and should be shown
    if (leftTextRef.current && (currentTab.textPosition === "left" || currentTab.textPosition === "both")) {
      gsap.fromTo(
        leftTextRef.current,
        { 
          x: -50,
          opacity: 0
        },
        { 
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }

    // Animate right text if it exists and should be shown
    if (rightTextRef.current && (currentTab.textPosition === "right" || currentTab.textPosition === "both")) {
      gsap.fromTo(
        rightTextRef.current,
        { 
          x: 50,
          opacity: 0
        },
        { 
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }

    // Animate tab buttons
    if (tabsRef.current) {
      const buttons = tabsRef.current.querySelectorAll('button');
      gsap.fromTo(
        buttons,
        { 
          y: 20,
          opacity: 0.5
        },
        { 
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [activeTab, currentTab.textPosition]);
  
  return(
    <main className="flex flex-col">
      {/* First section with dynamic tabs - styled like the screenshot */}
      <section className="bg-gradient h-screen relative flex flex-col items-center justify-center px-12 overflow-hidden">
        {/* Content layout based on textPosition */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center relative">
          {/* Phone mockup - always in center */}
          <div ref={phoneRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative w-[280px] h-[550px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-white">
              <div className="absolute top-0 left-0 right-0 h-6 bg-[#f8f8f8] flex items-center justify-center">
                <div className="w-20 h-4 bg-[#e0e0e0] rounded-full"></div>
              </div>
              <video 
                ref={videoRef}
                key={currentTab.id}
                className="w-full h-full object-cover" 
                autoPlay 
                loop={false} // Don't loop so we can detect when it ends
                muted 
                playsInline
              >
                <source src={currentTab.video} type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 h-1 flex justify-center">
                <div className="w-32 h-1 bg-[#e0e0e0] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Text content - positioned based on currentTab.textPosition */}
          {(currentTab.textPosition === "left" || currentTab.textPosition === "both") && (
            <div ref={leftTextRef} className="z-10 max-w-xs mr-auto pl-4">
              <div className="h-1 w-16 bg-white mb-8"></div>
              <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                {currentTab.heading}
              </h1>
              <p className="text-white/90 text-base mb-8">
                {currentTab.description}
              </p>
            </div>
          )}

          {/* Spacer for center phone */}
          <div className="w-[280px] mx-8 invisible">Spacer</div>

          {/* Right side text */}
          {(currentTab.textPosition === "right" || currentTab.textPosition === "both") && (
            <div ref={rightTextRef} className="z-10 max-w-xs ml-auto pr-4">
              <div className="h-1 w-16 bg-white mb-8"></div>
              <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                {currentTab.heading}
              </h1>
              <p className="text-white/90 text-base mb-8">
                {currentTab.description}
              </p>
            </div>
          )}
        </div>

        {/* Tab navigation - at the bottom left with animated borders */}
        <div ref={tabsRef} className="absolute bottom-8 left-8 flex gap-4 z-30">
          {tabData.map((tab) => {
            // Calculate border animation for active tab
            const isActive = activeTab === tab.id;
            const borderStyle = isActive 
              ? {
                  borderColor: 'white',
                  background: `conic-gradient(white ${animationProgress * 360}deg, transparent ${animationProgress * 360}deg)`,
                }
              : {};
              
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  isActive
                    ? "border-white bg-white text-gradient" 
                    : "border-white text-white"
                }`}
                style={isActive ? borderStyle : {}}
              >
                <span className="font-bold">{tab.id < 10 ? `0${tab.id}` : tab.id}</span>
              </button>
            );
          })}
          <div className="flex items-center ml-4 text-white font-medium">
            {activeTab === 3 ? "Method" : tabData.find(tab => tab.id === activeTab)?.title}
          </div>
        </div>
      </section>

      {/* Second section - unchanged */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Background Video */}
        <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
          <source src={manage_bg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <div className="relative z-20 flex flex-col px-4 pt-[50px] w-full max-w-6xl mx-auto items-start justify-between">
          <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4 max-w-2xl text-left md:w-[500px] w-[300px]">All your finances, in one app.</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-left">Join 1M+ happy users today.</p>
          
          <a href="#" className="px-6 py-2 md:py-4 md:px-8 bg-white text-blue-500 rounded-xl md:text-[1rem] text-[0.9rem] font-medium hover:bg-gray-100 transition-colors mb-8">
            Get Started
          </a>

          <div className="flex flex-col sm:flex-row gap-4 justify-start mt-[50px]">
            <a href="#" className="flex items-center space-x-2 border border-blue-500 rounded-lg px-6 py-2 hover:bg-blue-500/10 transition-colors">
              <FaGooglePlay className="text-2xl" />
              <div className="flex flex-col text-left text-sm">
                <span>GET IT ON</span>
                <span className="font-semibold text-base">Google Play</span>
              </div>
            </a>
            <a href="#" className="flex items-center space-x-2 border border-white rounded-lg px-6 py-2 hover:bg-white/10 transition-colors">
              <FaApple className="text-2xl" />
              <div className="flex flex-col text-left text-sm">
                <span>Download on the</span>
                <span className="font-semibold text-base">App Store</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManageSection;