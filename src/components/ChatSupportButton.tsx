import { useState, useRef, useEffect } from 'react';
import { BiChat } from 'react-icons/bi';
import { FiSearch, FiMinus } from 'react-icons/fi';
import { gsap } from 'gsap';

const ChatSupportButton = () => {
  const [showChatSupport, setShowChatSupport] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const popupRef = useRef(null);

  useEffect(() => {
    if (showChatSupport) {
      gsap.fromTo(popupRef.current, 
        { y: 50, opacity: 0, scale: 0.8 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.3, delay: 0.1, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(popupRef.current, { y: 50, opacity: 0, scale: 0.8, duration: 0.2, ease: 'power1.in' });
    }
  }, [showChatSupport]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="fixed bottom-4 right-[15px] z-[9999]">
      {!showChatSupport ? (
        // Message Icon (when chat is closed)
        <button 
          className="p-3 rounded-full bg-blue-300 hover:bg-[#3182ce] transition-colors flex items-center justify-center text-white shadow-lg border border-gray-300 cursor-pointer"
          onClick={() => setShowChatSupport(true)}
        >
          <BiChat className='text-[22px]' />
        </button>
      ) : (
        // Chat Support Popup (when chat is open)
        <div 
          ref={popupRef} 
          className="w-[300px] h-[400px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200"
        >
          {/* Header */}
          <div className="bg-[#3182ce] p-4 flex justify-between items-center rounded-t-lg">
            <h2 className="text-lg font-semibold text-white">Support</h2>
            <button 
              onClick={() => setShowChatSupport(false)} 
              className="text-white hover:text-gray-700 text-2xl cursor-pointer"
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
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Chat messages area */}
          <div className="flex-grow p-4 overflow-y-auto text-gray-700 space-y-4 bg-gray-50">
            {searchQuery ? (
              <div className="text-center text-gray-500">
                Searching for: "{searchQuery}"
              </div>
            ) : (
              <>
                <div className="bg-white p-3 rounded-lg max-w-[80%] shadow-sm border border-gray-100">
                  <p className="text-sm">👋 Hi there! How can I help you today?</p>
                </div>
                <div className="bg-white p-3 rounded-lg max-w-[80%] shadow-sm border border-gray-100">
                  <p className="text-sm">You can ask me about:</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Account management</li>
                    <li>• Payment methods</li>
                    <li>• Transaction history</li>
                    <li>• Security settings</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg max-w-[80%] shadow-sm border border-gray-100">
                  <p className="text-sm">Or type your question in the search box above!</p>
                </div>
              </>
            )}
          </div>

          {/* Footer - Zendesk */}
          <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-100 bg-white">
            Powered by Zendesk
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSupportButton; 