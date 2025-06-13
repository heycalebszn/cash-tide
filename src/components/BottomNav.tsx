import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const BottomNav = () => {
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  const personalDropdownRef = useRef<HTMLDivElement>(null);
  const businessDropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const navClass = `fixed bottom-4 left-1/2 -translate-x-1/2 max-w-lg bg-orange-600 text-white py-2 px-2 flex justify-around items-center z-50 shadow-lg ${
    isAnyDropdownOpen
      ? 'rounded-b-full rounded-tl-none rounded-tr-none w-[50%]' 
      : 'rounded-full' 
  }`;

  return (
    <nav className={navClass}>
      <div className="flex items-center space-x-2">
        {/* Home Icon (Active State) */}
        <a href="#" className="p-2 bg-red-700 rounded-full flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75m-6 2.25h.008v.008H10.5v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </a>
        
        {/* Navigation Links */}
        <div className="flex space-x-1">
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

      {/* Personal Dropdown Content */}
      {showPersonalDropdown && (
        <div 
          ref={personalDropdownRef} 
          onMouseEnter={() => handleMouseEnterDropdown(setShowPersonalDropdown, personalTimeoutRef, 'Personal Dropdown')}
          onMouseLeave={() => handleMouseLeaveDropdown(setShowPersonalDropdown, personalTimeoutRef, 'Personal Dropdown')}
          className="absolute bottom-full left-0 w-full bg-orange-600 text-white rounded-t-3xl py-4 px-2 flex flex-col z-60"
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

      {/* Business Dropdown Content */}
      {showBusinessDropdown && (
        <div 
          ref={businessDropdownRef} 
          onMouseEnter={() => handleMouseEnterDropdown(setShowBusinessDropdown, businessTimeoutRef, 'Business Dropdown')}
          onMouseLeave={() => handleMouseLeaveDropdown(setShowBusinessDropdown, businessTimeoutRef, 'Business Dropdown')}
          className="absolute bottom-full left-0 w-full bg-orange-600 text-white rounded-t-3xl py-4 px-2 flex flex-col z-60"
        >
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Option A</a>
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Option B</a>
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Option C</a>
        </div>
      )}

      {/* Company Dropdown Content */}
      {showCompanyDropdown && (
        <div 
          ref={companyDropdownRef} 
          onMouseEnter={() => handleMouseEnterDropdown(setShowCompanyDropdown, companyTimeoutRef, 'Company Dropdown')}
          onMouseLeave={() => handleMouseLeaveDropdown(setShowCompanyDropdown, companyTimeoutRef, 'Company Dropdown')}
          className="absolute bottom-full left-0 w-full bg-orange-600 text-white rounded-t-3xl py-4 px-2 flex flex-col z-60"
        >
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Item X</a>
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Item Y</a>
          <a href="#" className="block px-4 py-2 hover:bg-red-700 rounded-md">Item Z</a>
        </div>
      )}
    </nav>
  );
};

export default BottomNav; 