import { useState, useEffect, useRef } from "react";
import { numpay_m, mock } from "../../assets";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { gsap } from "gsap";

const tabData = [
  {
    id: 1,
    title: "Payment",
    heading: "Move money across europe",
    description: "Jeton is seamlessly connected with more than 25 countries, and 50 payment methods.",
    video: mock,
    textPosition: "right", 
    duration: 4 
  },
  {
    id: 2,
    title: "Send",
    heading: "Add or send in few taps",
    description: "Transfer funds quickly and securely to friends and family worldwide.",
    video: mock,
    textPosition: "left", 
    duration: 4
  },
  {
    id: 3,
    title: "Method",
    heading: "50+ payment methods across Europe",
    description: "From bank transfers to digital wallets, we've got you covered.",
    video: mock,
    textPosition: "right", 
    duration: 4
  },
  {
    id: 4,
    title: "Security",
    heading: "Fast & Safe transactions",
    description: "Your transactions and data are protected with the highest security standards.",
    video: mock,
    textPosition: "left",
    duration: 4
  },
  {
    id: 5,
    title: "Done",
    headingLeft: "Simple",
    descriptionLeft: "Our team is always available to help you with any questions.",
    headingRight: "Fast & Safe",
    descriptionRight: "Experience quick and secure transactions every time.",
    video: mock,
    textPosition: "both", 
    duration: 4
  }
];

const ManageSection = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [completedTabs, setCompletedTabs] = useState<number[]>([]); // Track completed tabs
  const videoRef = useRef<HTMLVideoElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
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
      // Mark all previous tabs as completed
      setCompletedTabs((prev) => {
        const maxId = Math.max(activeTab, ...prev);
        return tabData.filter(tab => tab.id <= maxId).map(tab => tab.id);
      });
      if (activeTab < tabData.length) {
        setActiveTab(activeTab + 1);
      }
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

    // Special animation for fifth tab text
    if (currentTab.textPosition === "both" && currentTab.id === 5) {
      if (leftTextRef.current) {
        gsap.fromTo(
          leftTextRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      }
      if (rightTextRef.current) {
        gsap.fromTo(
          rightTextRef.current,
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      }
    } else {
      // Animate left line
      if (leftLineRef.current && (currentTab.textPosition === "left" || currentTab.textPosition === "both") && !(currentTab.textPosition === "both" && currentTab.id === 5)) {
        gsap.fromTo(
          leftLineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.7, ease: "power2.out" }
        );
      }

      // Animate right line
      if (rightLineRef.current && (currentTab.textPosition === "right" || currentTab.textPosition === "both") && !(currentTab.textPosition === "both" && currentTab.id === 5)) {
        gsap.fromTo(
          rightLineRef.current,
          { scaleX: 0, transformOrigin: "right" },
          { scaleX: 1, duration: 0.7, ease: "power2.out" }
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
          {currentTab.textPosition === "both" && currentTab.id === 5 ? (
            <div className="flex w-full items-center justify-between gap-8">
              <div
                ref={leftTextRef}
                className="z-10 hidden md:flex flex-col items-end min-w-[180px] max-w-xs"
              >
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight w-auto" style={{lineHeight: 1.1}}>
                  {currentTab.headingLeft}
                </h1>
              </div>
              {/* Phone mockup - always in center */}
              <div ref={phoneRef} className="relative z-10">
              <div className="relative w-fit md:w-fit h-[350px] md:h-[450px] bg-white rounded-[15px] shadow-2xl overflow-hidden border-4 border-blue-200">
                  <video 
                    ref={videoRef}
                    key={currentTab.id}
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop={false} 
                    muted 
                    playsInline
                  >
                    <source src={currentTab.video} type="video/mp4" />
                  </video>
                </div>
              </div>
              <div
                ref={rightTextRef}
                className="z-10 hidden md:flex flex-col items-start min-w-[180px] max-w-xs"
              >
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight w-auto" style={{lineHeight: 1.1}}>
                  {currentTab.headingRight}
                </h1>
              </div>
            </div>
          ) : (
            <>
              {(currentTab.textPosition === "left") && (
                <div ref={leftTextRef} className="z-10 max-w-xs mr-auto pl-4 hidden md:block">
                  <div ref={leftLineRef} className="h-[2px] w-full bg-white mb-8" style={{transform: 'scaleX(0)'}}></div>
                  <h1 className="text-[1.8rem] font-bold text-white mb-6 leading-tight w-[250px]">
                    {currentTab.heading}
                  </h1>
                  <p className="text-white/100 text-[0.9rem] mb-8 w-[250px]">
                    {currentTab.description}
                  </p>
                </div>
              )}
              {/* Phone mockup - always in center */}
              <div ref={phoneRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative w-fit md:w-fit h-[350px] md:h-[450px] bg-white rounded-[15px] shadow-2xl overflow-hidden border-4 border-blue-200">
                  <video 
                    ref={videoRef}
                    key={currentTab.id}
                    className="w-full h-full" 
                    autoPlay 
                    loop={false} 
                    muted 
                    playsInline
                  >
                    <source src={currentTab.video} type="video/mp4" />
                  </video>
                </div>
              </div>
              {(currentTab.textPosition === "right") && (
                <div ref={rightTextRef} className="z-10 max-w-xs ml-auto pr-4 hidden md:block">
                  <div ref={rightLineRef} className="h-[2px] w-full bg-white mb-8" style={{transform: 'scaleX(0)'}}></div>
                  <h1 className="text-[1.8rem] font-bold text-white mb-6 leading-tight w-[250px]">
                    {currentTab.heading}
                  </h1>
                  <p className="text-white/100 text-[0.9rem] mb-8 w-[250px]">
                    {currentTab.description}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile text content - shown only on small screens */}
        <div className="md:hidden z-10 px-4 absolute bottom-8 left-0 right-0 text-left">
          {currentTab.textPosition === "both" && currentTab.id === 5 ? (
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {currentTab.headingLeft}
                </h1>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {currentTab.headingRight}
                </h1>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white mb-4 leading-tight">
                {currentTab.heading}
              </h1>
              <p className="text-white/100 text-[0.9rem] mb-4">
                {currentTab.description}
              </p>
            </>
          )}
        </div>

        {/* Tab navigation - at the bottom left with animated borders(Desktop) */}
        <div ref={tabsRef} className="absolute bottom-8 left-4 md:left-8 md:flex hidden flex-wrap gap-3 md:gap-4 z-30 items-center">
          {tabData.map((tab) => {
            // Calculate border animation for active tab
            const isActive = activeTab === tab.id;
            const isCompleted = completedTabs.includes(tab.id);
            return (
              <div key={`tab-${tab.id}`} className="flex items-center">
                <div className="relative">
                  {/* Tab button with static border for inactive tabs */}
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      // If revisiting, remove all completed tabs with id > selected
                      setCompletedTabs((prev) => prev.filter((id) => id < tab.id));
                    }}
                    className={`relative z-10 flex items-center justify-center w-[30px] h-[30px] rounded-full cursor-pointer bg-transparent ${
                      isCompleted
                        ? "border-[1.5px] border-white text-white"
                        : "border-[1.5px] border-white/50 text-white"
                    }`}
                  >
                    {/* Animated border for active tab */}
                    {isActive && !isCompleted && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 30 30">
                        <circle
                          cx="15"
                          cy="15"
                          r="14"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2.5"
                          strokeDasharray={88}
                          strokeDashoffset={88 - animationProgress * 88}
                          style={{
                            transition: 'stroke-dashoffset 0.1s linear',
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
                  <div className="text-white font-medium text-[1rem] ml-2">
                    {tab.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tab navigation - at the bottom left with animated borders (Mobile) */}
        <div ref={tabsRef} className="absolute top-8 left-0 right-0 mx-auto md:hidden flex flex-wrap gap-3 z-30 items-center justify-center">
          {tabData.map((tab) => {
            // Calculate border animation for active tab
            const isActive = activeTab === tab.id;
            const isCompleted = completedTabs.includes(tab.id);
            
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
                    {isActive && !isCompleted && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 30 30">
                        <circle
                          cx="15"
                          cy="15"
                          r="14"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2.5"
                          strokeDasharray={88}
                          strokeDashoffset={88 - animationProgress * 88}
                          style={{
                            transition: 'stroke-dashoffset 0.1s linear',
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

        {/* Content - Mobile */}
        <div className="absolute z-20 md:hidden flex flex-col px-4 pt-[50px] w-full max-w-6xl mx-auto items-start justify-between top-0 left-0 bottom-[30px] pb-6">
          
          <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4 max-w-2xl text-left md:w-[500px] w-[300px]">Move money like your message.</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-left">Send or request USDC on Base from anyone, anywhere, using just a phone number.
          </p>
          
          <a href="#" className="px-6 py-2 md:py-4 md:px-8 bg-white text-blue-500 rounded-xl md:text-[1rem] text-[0.9rem] font-medium hover:bg-gray-100 transition-colors mb-8">
            Get Started
          </a>

          <div className="flex flex-row gap-4 justify-center mt-auto w-full">
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

        {/* Content - Desktop */}
        <div className="relative z-20 md:flex flex-col px-4 pt-[50px] w-full max-w-6xl mx-auto items-start justify-between hidden">
          <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4 max-w-2xl text-left md:w-[500px] w-[300px]">Move money like your message.</h1>
          <p className="text-lg md:text-xl mb-8 w-[450px] text-left">Send or request USDC on Base from anyone, anywhere, using just a phone number.</p>
          
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