import { useState, useRef, useEffect } from 'react';
import { BiChat } from 'react-icons/bi';
import { FiSearch, FiMinus } from 'react-icons/fi';
import { gsap } from 'gsap';

const ChatSupportButton = () => {
  const [showChatSupport, setShowChatSupport] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    if (showChatSupport) {
      gsap.fromTo(popupRef.current, 
        { y: 50, opacity: 0, scale: 0.8 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.3, delay: 0.1, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(popupRef.current, { y: 50, opacity: 0, scale: 0.8, duration: 0.2, ease: 'power1.in', onComplete: () => {
        // Optionally, reset state or remove element from DOM after animation
      }});
    }
  }, [showChatSupport]);

  return (
    <>
      {!showChatSupport ? (
        // Message Icon (when chat is closed)
        <a 
          href="#" 
          className="fixed bottom-4 right-10 p-2 rounded-full bg-gray-600/50 hover:bg-gray-600/70 transition-colors flex items-center justify-center z-50 text-white"
          onClick={() => setShowChatSupport(true)}
        >
          <BiChat className='text-[25px]' />
        </a>
      ) : (
        // Chat Support Popup (when chat is open)
        <div 
          ref={popupRef} 
          className="fixed bottom-4 right-10 w-[300px] h-[400px] bg-white rounded-lg shadow-xl z-[100] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#FFE2DF] p-4 flex justify-between items-center rounded-t-lg">
            <h2 className="text-lg font-semibold text-[#DE352F]">Support</h2>
            <button 
              onClick={() => setShowChatSupport(false)} 
              className="text-[#DE352F] hover:text-gray-700 text-2xl cursor-pointer"
              aria-label="Minimize chat"
            >
              <FiMinus className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="p-4">
            <div className="relative flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FiSearch className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="How can we help?" 
                className="w-full focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Chat messages area - Placeholder, as per previous conversation, the chat is not interactive yet */}
          <div className="flex-grow p-4 overflow-y-auto text-gray-700">
            {/* If there were chat messages, they would go here. For now, it's empty as per the image. */}
          </div>

          {/* Footer - Zendesk */}
          <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-100">
            zendesk
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSupportButton; 