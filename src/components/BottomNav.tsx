import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { BiMenu } from 'react-icons/bi';
import { IoGlobeOutline } from 'react-icons/io5'; // For language icon
import { FiCreditCard } from 'react-icons/fi'; // Placeholder icons for Jeton Card, Fees
import { HiOutlineLightBulb, HiOutlineNewspaper, HiOutlineBriefcase, HiOutlineDocumentText } from 'react-icons/hi'; // Placeholder icons for Company section

const BottomNav = () => {
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [mobileMenuView, setMobileMenuView] = useState<boolean>(false);
  const [clickX, setClickX] = useState(0); // New state for click X coordinate
  const [clickY, setClickY] = useState(0); // New state for click Y coordinate

  const personalDropdownRef = useRef<HTMLDivElement>(null);
  const businessDropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Ref for mobile menu container

  const personalTimeoutRef = useRef<number | null>(null);
  const businessTimeoutRef = useRef<number | null>(null);
  const companyTimeoutRef = useRef<number | null>(null);

  // Derive if any dropdown is open
  const isAnyDropdownOpen = showPersonalDropdown || showBusinessDropdown || showCompanyDropdown;

  const handleMouseEnterDropdown = (setter: React.Dispatch<React.SetStateAction<boolean>>, timeoutRef: React.MutableRefObject<number | null>, name: string) => {
    console.log(`Mouse ENTERED ${name} area`);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setter(true);
  };

  const handleMouseLeaveDropdown = (setter: React.Dispatch<React.SetStateAction<boolean>>, timeoutRef: React.MutableRefObject<number | null>, name: string) => {
    console.log(`Mouse LEFT ${name} area`);
    timeoutRef.current = window.setTimeout(() => {
      setter(false);
    }, 600); // Increased delay for better clickability
  };

  // GSAP animation for Personal dropdown
  useEffect(() => {
    console.log('PersonalDropdown: isVisible changed to', showPersonalDropdown);
    if (personalDropdownRef.current) {
      if (showPersonalDropdown) {
        console.log('PersonalDropdown: Animating IN', personalDropdownRef.current);
        gsap.to(personalDropdownRef.current, { 
          y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', 
          pointerEvents: 'auto', // Enable pointer events when visible
          onComplete: () => {
            if (personalDropdownRef.current) {
              personalDropdownRef.current.style.visibility = 'visible';
            }
            console.log('PersonalDropdown: Animation IN complete');
          }
        });
      } else {
        console.log('PersonalDropdown: Animating OUT', personalDropdownRef.current);
        gsap.to(personalDropdownRef.current, { 
          y: 10, opacity: 0, duration: 0.2, ease: 'power2.in',
          pointerEvents: 'none', // Disable pointer events when hidden
          onComplete: () => {
            if (personalDropdownRef.current) {
              personalDropdownRef.current.style.visibility = 'hidden';
            }
            console.log('PersonalDropdown: Animation OUT complete');
          }
        });
      }
    }
  }, [showPersonalDropdown]);

  // GSAP animation for Business dropdown
  useEffect(() => {
    console.log('BusinessDropdown: isVisible changed to', showBusinessDropdown);
    if (businessDropdownRef.current) {
      if (showBusinessDropdown) {
        console.log('BusinessDropdown: Animating IN', businessDropdownRef.current);
        gsap.to(businessDropdownRef.current, { 
          y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', 
          pointerEvents: 'auto', // Enable pointer events when visible
          onComplete: () => {
            if (businessDropdownRef.current) {
              businessDropdownRef.current.style.visibility = 'visible';
            }
            console.log('BusinessDropdown: Animation IN complete');
          }
        });
      } else {
        console.log('BusinessDropdown: Animating OUT', businessDropdownRef.current);
        gsap.to(businessDropdownRef.current, { 
          y: 10, opacity: 0, duration: 0.2, ease: 'power2.in',
          pointerEvents: 'none', // Disable pointer events when hidden
          onComplete: () => {
            if (businessDropdownRef.current) {
              businessDropdownRef.current.style.visibility = 'hidden';
            }
            console.log('BusinessDropdown: Animation OUT complete');
          }
        });
      }
    }
  }, [showBusinessDropdown]);

  // GSAP animation for Company dropdown
  useEffect(() => {
    console.log('CompanyDropdown: isVisible changed to', showCompanyDropdown);
    if (companyDropdownRef.current) {
      if (showCompanyDropdown) {
        console.log('CompanyDropdown: Animating IN', companyDropdownRef.current);
        gsap.to(companyDropdownRef.current, { 
          y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', 
          pointerEvents: 'auto', // Enable pointer events when visible
          onComplete: () => {
            if (companyDropdownRef.current) {
              companyDropdownRef.current.style.visibility = 'visible';
            }
            console.log('CompanyDropdown: Animation IN complete');
          }
        });
      } else {
        console.log('CompanyDropdown: Animating OUT', companyDropdownRef.current);
        gsap.to(companyDropdownRef.current, { 
          y: 10, opacity: 0, duration: 0.2, ease: 'power2.in',
          pointerEvents: 'none', // Disable pointer events when hidden
          onComplete: () => {
            if (companyDropdownRef.current) {
              companyDropdownRef.current.style.visibility = 'hidden';
            }
            console.log('CompanyDropdown: Animation OUT complete');
          }
        });
      }
    }
  }, [showCompanyDropdown]);

  // Initialize dropdowns as hidden to prevent flicker
  useEffect(() => {
    if (personalDropdownRef.current) {
      gsap.set(personalDropdownRef.current, { y: 10, opacity: 0, pointerEvents: 'none', visibility: 'hidden' });
      console.log('PersonalDropdown: Initial GSAP set', personalDropdownRef.current);
    }
    if (businessDropdownRef.current) {
      gsap.set(businessDropdownRef.current, { y: 10, opacity: 0, pointerEvents: 'none', visibility: 'hidden' });
      console.log('BusinessDropdown: Initial GSAP set', businessDropdownRef.current);
    }
    if (companyDropdownRef.current) {
      gsap.set(companyDropdownRef.current, { y: 10, opacity: 0, pointerEvents: 'none', visibility: 'hidden' });
      console.log('CompanyDropdown: Initial GSAP set', companyDropdownRef.current);
    }
    // Initial state for mobile menu (hidden below viewport)
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { autoAlpha: 0, pointerEvents: 'none', clipPath: 'circle(0% at 50% 50%)' }); // Default hidden and clipped
    }
  }, []);

  // GSAP animation for Mobile Menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuView) {
        // Animate in from click point
        // 1. Set initial clipped state at click point and make visible
        gsap.set(mobileMenuRef.current, {
            clipPath: `circle(0% at ${clickX}px ${clickY}px)`,
            autoAlpha: 1, // Make it visible instantly, but clipped
            pointerEvents: 'auto'
        });
        // 2. Animate to full screen
        gsap.to(mobileMenuRef.current, {
            clipPath: 'circle(150% at 50% 50%)', // Animate to a large circle covering the screen
            duration: 0.8,
            ease: 'power2.out'
        });
      } else {
        // Animate out to click point
        gsap.to(mobileMenuRef.current, {
            clipPath: `circle(0% at ${clickX}px ${clickY}px)`, // Animate back to a tiny circle at click point
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power2.in',
            pointerEvents: 'none' // Disable pointer events when hidden
        });
      }
    }
  }, [mobileMenuView, clickX, clickY]); // Add clickX, clickY to dependencies

  const navClass = `fixed bottom-4 left-0 right-0 mx-auto max-w-lg bg-orange-600 text-white py-2 px-2 flex justify-around items-center z-[100] shadow-lg w-fit ${
    isAnyDropdownOpen
      ? 'rounded-b-full rounded-tl-none rounded-tr-none w-[50%]'
      : 'rounded-full'
  }`;

  return (
    <nav className={navClass}>
      <div className="flex items-center space-x-2">
        {/* Home Icon (Active State) */}
        <a href="#" className="p-2 bg-red-700 rounded-full md:flex items-center justify-center shadow-md hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75m-6 2.25h.008v.008H10.5v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </a>

        {/* Mobile view - Toggle button for the full-screen menu */}
        <div className='md:hidden flex gap-3 items-center'>
        <h1>Menu</h1>
        <BiMenu onClick={(e) => { // Capture click coordinates
            setClickX(e.clientX);
            setClickY(e.clientY);
            setMobileMenuView(true);
        }} />
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="md:flex space-x-1 hidden">
          <div 
            className="group relative flex items-center"
            onMouseEnter={() => handleMouseEnterDropdown(setShowPersonalDropdown, personalTimeoutRef, 'Personal')}
            onMouseLeave={() => handleMouseLeaveDropdown(setShowPersonalDropdown, personalTimeoutRef, 'Personal')}
          >
            <a href="#" className="flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors group-hover:bg-red-600">
              <span className='text-[0.8rem]'>Personal</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>

          <div 
            className="group relative flex items-center"
            onMouseEnter={() => handleMouseEnterDropdown(setShowBusinessDropdown, businessTimeoutRef, 'Business')}
            onMouseLeave={() => handleMouseLeaveDropdown(setShowBusinessDropdown, businessTimeoutRef, 'Business')}
          >
            <a href="#" className="flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors group-hover:bg-red-600">
              <span className='text-[0.8rem]'>Business</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>

          <div 
            className="group relative flex items-center"
            onMouseEnter={() => handleMouseEnterDropdown(setShowCompanyDropdown, companyTimeoutRef, 'Company')}
            onMouseLeave={() => handleMouseLeaveDropdown(setShowCompanyDropdown, companyTimeoutRef, 'Company')}
          >
            <a href="#" className="flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors group-hover:bg-red-600">
              <span className='text-[0.8rem]'>Company</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Personal Dropdown Content (Desktop) */}
      {showPersonalDropdown && (
        <div 
          ref={personalDropdownRef} 
          onMouseEnter={() => handleMouseEnterDropdown(setShowPersonalDropdown, personalTimeoutRef, 'Personal Dropdown')}
          onMouseLeave={() => handleMouseLeaveDropdown(setShowPersonalDropdown, personalTimeoutRef, 'Personal Dropdown')}
          className="absolute bottom-full left-0 w-full bg-orange-600 text-white rounded-t-3xl py-4 px-2 md:flex md:flex-col z-60 hidden"
        >
          <a href="#" className="block px-3 py-1.5 hover:bg-red-700 rounded-md text-sm">About</a>
          <a href="#" className="block px-3 py-1.5 hover:bg-red-700 rounded-md text-sm">Newsroom</a>
          <a href="#" className="block px-3 py-1.5 hover:bg-red-700 rounded-md text-sm">Partnerships</a>
          <a href="#" className="block px-3 py-1.5 hover:bg-red-700 rounded-md text-sm">Media Assets</a>
          <a href="#" className="block px-3 py-1.5 bg-red-700 font-semibold rounded-md text-sm">Release Notes</a>
          {/* Placeholder for the image on the right */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-red-800 rounded-md flex items-center justify-center text-xs">
            {/* Replace with actual image */}
            Icon
          </div>
        </div>
      )}

      {/* Business Dropdown Content (Desktop) */}
      {showBusinessDropdown && (
        <div 
          ref={businessDropdownRef} 
          onMouseEnter={() => handleMouseEnterDropdown(setShowBusinessDropdown, businessTimeoutRef, 'Business Dropdown')}
          onMouseLeave={() => handleMouseLeaveDropdown(setShowBusinessDropdown, businessTimeoutRef, 'Business Dropdown')}
          className="absolute bottom-full left-0 w-full bg-orange-600 text-white rounded-t-3xl py-4 px-2 md:flex md:flex-col z-60 hidden"
        >
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Option A</a>
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Option B</a>
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Option C</a>
        </div>
      )}

      {/* Company Dropdown Content (Desktop) */}
      {showCompanyDropdown && (
        <div 
          ref={companyDropdownRef} 
          onMouseEnter={() => handleMouseEnterDropdown(setShowCompanyDropdown, companyTimeoutRef, 'Company Dropdown')}
          onMouseLeave={() => handleMouseLeaveDropdown(setShowCompanyDropdown, companyTimeoutRef, 'Company Dropdown')}
          className="absolute bottom-full left-0 w-full bg-orange-600 text-white rounded-t-3xl py-4 px-2 md:flex md:flex-col z-60 hidden"
        >
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Item X</a>
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Item Y</a>
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Item Z</a>
        </div>
      )}

      {/* Mobile Menu Overlay - Conditional Rendering */}
      {mobileMenuView && (
        <div ref={mobileMenuRef} className="fixed inset-0 bg-red-600 text-white z-[9999] flex flex-col">
          {/* Top Bar: Language and Sign up */}
          <div className="flex justify-between items-center px-4 py-4 border-b border-red-500">
            {/* Language Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-white">
              <IoGlobeOutline className="text-xl" />
              <span>EN</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            {/* Sign up button */}
            <a href="#" className="px-4 py-2 bg-white text-red-600 rounded-full font-semibold">Sign up</a>
          </div>

          {/* Menu Items */}
          <div className="flex-grow overflow-y-auto py-4 px-4">
            {/* Homepage */}
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg bg-red-700 mb-4">
              {/* Placeholder Icon - Replaced with a styled div to mimic the image's icon */}
              <div className="w-8 h-8 rounded-lg bg-red-800 flex items-center justify-center">
                {/* For the real image, replace this div content with an actual image or SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 4.81l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M19.5 18V9.75a.75.75 0 00-.75-.75H15V5.25a.75.75 0 00-.75-.75H9.75a.75.75 0 00-.75.75V9h-3V18h12zm-4.5 1.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-semibold">Homepage</span>
            </a>

            {/* Personal Section */}
            <h2 className="text-sm text-gray-300 px-2 mt-6 mb-2">Personal</h2>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-red-700">
              {/* Jeton Card Icon */}
              <FiCreditCard className="text-2xl w-8 h-8 rounded-lg bg-red-800 p-1" /> 
              <span className="text-lg font-semibold">Jeton Card</span>
            </a>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-red-700">
              {/* Fees Icon - Using a placeholder div to mimic the image */}
              <div className="w-8 h-8 rounded-lg bg-red-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6.25l-2.222-2.222a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 00-1.06-1.06L12.75 12.25V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-semibold">Fees</span>
            </a>

            {/* Business Section */}
            <h2 className="text-sm text-gray-300 px-2 mt-6 mb-2">Business</h2>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-red-700">
              {/* Business Icon */}
              <HiOutlineBriefcase className="text-2xl w-8 h-8 rounded-lg bg-red-800 p-1" /> 
              <span className="text-lg font-semibold">Business</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            {/* Company Section */}
            <h2 className="text-sm text-gray-300 px-2 mt-6 mb-2">Company</h2>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-red-700">
              {/* About Icon */}
              <HiOutlineLightBulb className="text-2xl w-8 h-8 rounded-lg bg-red-800 p-1" /> 
              <span className="text-lg font-semibold">About</span>
            </a>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-red-700">
              {/* Newsroom Icon */}
              <HiOutlineNewspaper className="text-2xl w-8 h-8 rounded-lg bg-red-800 p-1" /> 
              <span className="text-lg font-semibold">Newsroom</span>
            </a>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-red-700">
              {/* Partnerships Icon */}
              <HiOutlineBriefcase className="text-2xl w-8 h-8 rounded-lg bg-red-800 p-1" /> 
              <span className="text-lg font-semibold">Partnerships</span>
            </a>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-red-700">
              {/* Media Assets Icon */}
              <HiOutlineDocumentText className="text-2xl w-8 h-8 rounded-lg bg-red-800 p-1" /> 
              <span className="text-lg font-semibold">Media Assets</span>
            </a>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-red-700">
              {/* Release Notes Icon */}
              <HiOutlineDocumentText className="text-2xl w-8 h-8 rounded-lg bg-red-800 p-1" /> 
              <span className="text-lg font-semibold">Release Notes</span>
            </a>
          </div>

          {/* Close Button */}
          <div className="flex justify-center pb-8 pt-4">
            <button onClick={() => setMobileMenuView(false)} className="px-6 py-3 bg-white text-red-600 rounded-full font-semibold flex items-center gap-2">
              <span>Menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default BottomNav; 