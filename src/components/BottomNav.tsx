import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { BiMenu } from 'react-icons/bi';
import { IoGlobeOutline } from 'react-icons/io5'; 
import { FiCreditCard } from 'react-icons/fi';
import { HiOutlineLightBulb, HiOutlineNewspaper, HiOutlineBriefcase, HiOutlineDocumentText } from 'react-icons/hi'; 

const DROPDOWNS = [
  {
    key: 'personal',
    label: 'Personal',
    links: [
      { text: 'About', href: '#' },
      { text: 'Newsroom', href: '#' },
      { text: 'Partnerships', href: '#' },
      { text: 'Media Assets', href: '#' },
      { text: 'Release Notes', href: '#', highlight: true },
    ],
  },
  {
    key: 'business',
    label: 'Business',
    links: [
      { text: 'Option A', href: '#' },
      { text: 'Option B', href: '#' },
      { text: 'Option C', href: '#' },
    ],
  },
  {
    key: 'company',
    label: 'Company',
    links: [
      { text: 'Item X', href: '#' },
      { text: 'Item Y', href: '#' },
      { text: 'Item Z', href: '#' },
    ],
  },
];

const BottomNav = () => {
  const [mobileMenuView, setMobileMenuView] = useState<boolean>(false);
  const [menuMounted, setMenuMounted] = useState<boolean>(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null); 

  // Dynamic state for dropdowns
  const [dropdownState, setDropdownState] = useState(
    DROPDOWNS.reduce((acc, d) => {
      acc[d.key] = { open: false, mounted: false };
      return acc;
    }, {} as Record<string, { open: boolean; mounted: boolean }>)
  );
  const dropdownRefs = useRef(
    DROPDOWNS.reduce((acc, d) => {
      acc[d.key] = React.createRef<HTMLDivElement | null>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement | null>>)
  );
  // Timeout references to handle dropdown closing delays
  const closeTimeoutRefs = useRef<Record<string, NodeJS.Timeout | null>>({});

  // Derive if any dropdown is open
  const isAnyDropdownOpen = Object.values(dropdownState).some(d => d.open);

  // Handlers
  const openDropdown = (key: string, e: React.MouseEvent) => {
    // Clear any pending close timeout for this dropdown
    if (closeTimeoutRefs.current[key]) {
      clearTimeout(closeTimeoutRefs.current[key]!);
      closeTimeoutRefs.current[key] = null;
    }
    
    setClickX(e.clientX);
    setClickY(e.clientY);
    setDropdownState(prev => ({
      ...prev,
      [key]: { open: true, mounted: true },
    }));
  };
  
  const closeDropdown = (key: string) => {
    // Use timeout to delay closing, giving user time to move to the dropdown content
    closeTimeoutRefs.current[key] = setTimeout(() => {
      setDropdownState(prev => ({
        ...prev,
        [key]: { ...prev[key], open: false },
      }));
      setTimeout(() => {
        setDropdownState(prev => ({
          ...prev,
          [key]: { ...prev[key], mounted: false },
        }));
      }, 300);
    }, 200); // Delay closing to give time to move to dropdown content
  };

  // Toggle dropdown on click
  const toggleDropdown = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (dropdownState[key].open) {
      // If open, close immediately without delay
      setDropdownState(prev => ({
        ...prev,
        [key]: { ...prev[key], open: false },
      }));
      setTimeout(() => {
        setDropdownState(prev => ({
          ...prev,
          [key]: { ...prev[key], mounted: false },
        }));
      }, 300);
    } else {
      openDropdown(key, e);
    }
  };

  // Handle clicks on dropdown items
  const handleDropdownItemClick = (e: React.MouseEvent) => {
    // Prevent event bubbling which might close the dropdown
    e.stopPropagation();
  };

  // GSAP animation for dropdowns
  useEffect(() => {
    DROPDOWNS.forEach(({ key }) => {
      const ref = dropdownRefs.current[key].current;
      if (!ref) return;
      if (dropdownState[key].open) {
        // Set initial state at click point
        gsap.set(ref, {
          clipPath: `circle(0% at ${clickX}px ${clickY}px)`,
          visibility: 'visible',
          opacity: 1,
          pointerEvents: 'auto'
        });
        // Animate to full screen
        gsap.to(ref, {
          clipPath: 'circle(150% at 50% 50%)',
          duration: 0.5,
          ease: 'power2.out'
        });
      } else {
        // Animate back to click point
        gsap.to(ref, {
          clipPath: `circle(0% at ${clickX}px ${clickY}px)`,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            ref.style.visibility = 'hidden';
            ref.style.pointerEvents = 'none';
          }
        });
      }
    });
  }, [dropdownState, clickX, clickY]);

  // Initial GSAP set
  useEffect(() => {
    DROPDOWNS.forEach(({ key }) => {
      const ref = dropdownRefs.current[key].current;
      if (ref) {
        gsap.set(ref, { 
          clipPath: 'circle(0% at 50% 50%)',
          visibility: 'hidden',
          pointerEvents: 'none'
        });
      }
    });
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

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  console.log(activeDropdown)

  // const toggleDropdown = (key: string) => {
  //   setActiveDropdown(activeDropdown === key ? null : key);
  // };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navClass = `fixed bottom-4 left-0 right-0 mx-auto bg-blue-600 text-white py-2 px-2 flex justify-around items-center z-[100] shadow-lg transition-all duration-300 ease-in-out ${
    isAnyDropdownOpen
      ? 'rounded-b-full rounded-tl-none rounded-tr-none w-[400px] px-[20px]'
      : 'rounded-full md:w-[400px] w-fit'
  }`;

  const openMenu = (e: any) => {
    setMenuMounted(true);
    setClickX(e.clientX);
    setClickY(e.clientY);
    setMobileMenuView(true);
  };

  const closeMenu = () => {
    setMobileMenuView(false);
    setTimeout(() => setMenuMounted(false), 800); // match GSAP duration
  };

  // const handleMouseLeaveDropdown = (setter: React.Dispatch<React.SetStateAction<boolean>>, timeoutRef: React.MutableRefObject<number | null>, name: string) => {
  //   console.log(`Mouse LEFT ${name} area`);
  //   timeoutRef.current = window.setTimeout(() => {
  //     setter(false);
  //   }, 300); // Reduced delay for better responsiveness
  // };

  return (
    <nav className={navClass}>
      <div className="flex items-center space-x-2">
        {/* Home Icon (Active State) */}
        <a href="#" className="p-2 bg-blue-700 rounded-full md:flex items-center justify-center shadow-md hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75m-6 2.25h.008v.008H10.5v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </a>

        {/* Mobile view - Toggle button for the full-screen menu */}
        <div className='md:hidden flex gap-3 items-center w-fit'>
          <h1>Menu</h1>
          <BiMenu onClick={openMenu} />
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="md:flex space-x-1 hidden">
          {DROPDOWNS.map(({ key, label }) => (
            <div
              key={key}
              className="group relative flex items-center"
              onMouseEnter={(e) => openDropdown(key, e)}
              onMouseLeave={() => closeDropdown(key)}
            >
              <a 
                href="#" 
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors group-hover:bg-blue-600"
                onClick={(e) => toggleDropdown(key, e)}
              >
                <span className='text-[0.8rem]'>{label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </a>
              {/* Dropdown Content */}
              {dropdownState[key].mounted && (
                <div
                  ref={dropdownRefs.current[key]}
                  onMouseEnter={() => {
                    // Clear any pending close timeout
                    if (closeTimeoutRefs.current[key]) {
                      clearTimeout(closeTimeoutRefs.current[key]!);
                      closeTimeoutRefs.current[key] = null;
                    }
                  }}
                  onMouseLeave={() => closeDropdown(key)}
                  className="fixed bottom-[60px] left-1/2 -translate-x-1/2 w-[400px] bg-blue-600 text-white rounded-t-3xl py-4 px-2 md:flex md:flex-col z-60"
                >
                  {DROPDOWNS.find(d => d.key === key)?.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      onClick={handleDropdownItemClick}
                      className={`block px-3 py-1.5 hover:bg-blue-700 rounded-md text-sm${link.highlight ? ' bg-blue-700 font-semibold' : ''}`}
                    >
                      {link.text}
                    </a>
                  ))}
                  {/* Placeholder for the image on the right for Personal */}
                  {key === 'personal' && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-blue-800 rounded-md flex items-center justify-center text-xs">
                      Icon
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay - Conditional Rendering */}
      {menuMounted && (
        <div ref={mobileMenuRef} className="fixed inset-0 bg-blue-600 text-white z-[9999] flex flex-col">
          {/* Top Bar: Language and Sign up */}
          <div className="flex justify-between items-center px-4 py-4 border-b border-blue-500">
            {/* Language Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-white">
              <IoGlobeOutline className="text-xl" />
              <span>EN</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            {/* Sign up button */}
            <a href="#" className="px-4 py-2 bg-white text-blue-600 rounded-full font-semibold">Sign up</a>
          </div>

          {/* Menu Items */}
          <div className="flex-grow overflow-y-auto py-4 px-4">
            {/* Homepage */}
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg bg-blue-700 mb-4">
              {/* Placeholder Icon - Replaced with a styled div to mimic the image's icon */}
              <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center">
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
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-blue-700">
              {/* Jeton Card Icon */}
              <FiCreditCard className="text-2xl w-8 h-8 rounded-lg bg-blue-800 p-1" /> 
              <span className="text-lg font-semibold">Jeton Card</span>
            </a>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-blue-700">
              {/* Fees Icon - Using a placeholder div to mimic the image */}
              <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6.25l-2.222-2.222a.75.75 0 00-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 00-1.06-1.06L12.75 12.25V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-semibold">Fees</span>
            </a>

            {/* Business Section */}
            <h2 className="text-sm text-gray-300 px-2 mt-6 mb-2">Business</h2>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-blue-700">
              {/* Business Icon */}
              <HiOutlineBriefcase className="text-2xl w-8 h-8 rounded-lg bg-blue-800 p-1" /> 
              <span className="text-lg font-semibold">Business</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            {/* Company Section */}
            <h2 className="text-sm text-gray-300 px-2 mt-6 mb-2">Company</h2>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-blue-700">
              {/* About Icon */}
              <HiOutlineLightBulb className="text-2xl w-8 h-8 rounded-lg bg-blue-800 p-1" /> 
              <span className="text-lg font-semibold">About</span>
            </a>
            <a href="#" className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-blue-700">
              {/* Newsroom Icon */}
              <HiOutlineNewspaper className="text-2xl w-8 h-8 rounded-lg bg-blue-800 p-1" /> 
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
              <HiOutlineDocumentText className="text-2xl w-8 h-8 rounded-lg bg-blue-800 p-1" /> 
              <span className="text-lg font-semibold">Release Notes</span>
            </a>
          </div>

          {/* Close Button */}
          <div className="flex justify-center pb-8 pt-4">
            <button onClick={closeMenu} className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold flex items-center gap-2">
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