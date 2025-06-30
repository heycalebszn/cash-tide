import { useState, useEffect, useRef } from "react";
import { manage_bg, jeton_home, product_1, product_2, jeton_card_video, numpay_m } from "../../assets";
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
    title: "Done",
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
      <section className="bg-gradient h-screen relative flex flex-col items-center justify-center px-4 md:px-12 overflow-hidden">
        {/* Content layout based on textPosition */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center relative">
          {/* Phone mockup - always in center */}
          <div ref={phoneRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative w-[200px] md:w-[240px] h-[350px] md:h-[450px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-white">
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
            <div ref={leftTextRef} className="z-10 max-w-xs mr-auto pl-4 hidden md:block">
              <div className="h-[2px] w-full bg-white mb-8"></div>
              <h1 className="text-[1.5rem] font-bold text-white mb-6 leading-tight w-[250px]">
                {currentTab.heading}
              </h1>
              <p className="text-white/90 text-base mb-8">
                {currentTab.description}
              </p>
            </div>
          )}

          {/* Spacer for center phone */}
          <div className="w-[220px] md:w-[280px] mx-8 invisible">Spacer</div>

          {/* Right side text */}
          {(currentTab.textPosition === "right" || currentTab.textPosition === "both") && (
            <div ref={rightTextRef} className="z-10 max-w-xs ml-auto pr-4 hidden md:block">
              <div className="h-[2px] w-full bg-white mb-8"></div>
              <h1 className="text-[1.5rem] font-bold text-white mb-6 leading-tight w-[250px]">
                {currentTab.heading}
              </h1>
              <p className="text-white/90 text-base mb-8">
                {currentTab.description}
              </p>
            </div>
          )}
        </div>

        {/* Mobile text content - shown only on small screens */}
        <div className="md:hidden z-10 text-center px-4 absolute top-8 left-0 right-0">
          <div className="h-1 w-16 bg-white mb-4 mx-auto"></div>
          <h1 className="text-2xl font-bold text-white mb-4 leading-tight">
            {currentTab.heading}
          </h1>
          <p className="text-white/90 text-sm mb-4">
            {currentTab.description}
          </p>
        </div>

        {/* Tab navigation - at the bottom left with animated borders */}
        <div ref={tabsRef} className="absolute bottom-8 left-4 md:left-8 flex flex-wrap gap-3 md:gap-4 z-30 items-center">
          {tabData.map((tab) => {
            // Calculate border animation for active tab
            const isActive = activeTab === tab.id;
            
            return (
              <div key={`tab-${tab.id}`} className="flex items-center">
                <div className="relative">
                  {/* Tab button with static border for inactive tabs */}
                  <button 
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative z-10 flex items-center justify-center w-[30px] h-[30px] rounded-full cursor-pointer bg-transparent ${
                      isActive
                        ? "" 
                        : "border-[1.5px] border-white/50 text-white/50"
                    }`}
                  >
                    {/* Animated border for active tab */}
                    {isActive && (
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 30 30">
                        <circle 
                          cx="15" 
                          cy="15" 
                          r="14" 
                          fill="none" 
                          stroke="white" 
                          strokeWidth="1.5"
                          strokeDasharray={`${animationProgress * 88} 88`} 
                          style={{
                            transformOrigin: 'center',
                            transform: 'rotate(-90deg)',
                          }}
                        />
                      </svg>
                    )}
                    <span className="font-medium text-xs text-white">{tab.id < 10 ? `0${tab.id}` : tab.id}</span>
                  </button>
                </div>
                
                {/* Display title right after the active tab */}
                {isActive && (
                  <div className="text-white font-medium text-xs ml-2">
                    {tab.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Second section - add responsive styles */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Background Video */}
        <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
          <source src={numpay_m} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <div className="relative z-20 flex flex-col px-4 pt-[50px] w-full max-w-6xl mx-auto items-start justify-between">
          <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4 max-w-2xl text-left md:w-[500px] w-[300px]">All your finances, in one app.</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-left">Join 1M+ happy users today.</p>
          
          <a href="#" className="px-6 py-2 md:py-4 md:px-8 bg-white text-blue-500 rounded-xl md:text-[1rem] text-[0.9rem] font-medium hover:bg-gray-100 transition-colors mb-8">
            Get Started
          </a>

          <div className="flex flex-col sm:flex-row gap-4 justify-start mt-[30px] md:mt-[50px]">
            <a href="#" className="flex items-center space-x-2 border border-blue-500 rounded-lg px-4 md:px-6 py-2 hover:bg-blue-500/10 transition-colors">
              <FaGooglePlay className="text-xl md:text-2xl" />
              <div className="flex flex-col text-left text-xs md:text-sm">
                <span>GET IT ON</span>
                <span className="font-semibold text-sm md:text-base">Google Play</span>
              </div>
            </a>
            <a href="#" className="flex items-center space-x-2 border border-white rounded-lg px-4 md:px-6 py-2 hover:bg-white/10 transition-colors">
              <FaApple className="text-xl md:text-2xl" />
              <div className="flex flex-col text-left text-xs md:text-sm">
                <span>Download on the</span>
                <span className="font-semibold text-sm md:text-base">App Store</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManageSection;