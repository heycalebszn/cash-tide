import { BsArrowDown } from "react-icons/bs";
import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import { jeton_home } from "../../assets";

const HeroSection = ({ onScrollButtonClick }: { onScrollButtonClick: () => void }) => {
  return (
    <div className="relative h-screen overflow-x-hidden w-full">
      {/* Background Video (common to both mobile and desktop) */}
      <video className="absolute inset-0 w-full h-full object-cover z-0 brightness-100" autoPlay loop muted playsInline preload="metadata">
        <source src={jeton_home} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Desktop View (hidden on mobile) - Your perfect desktop code goes here */}
      <div className="absolute bottom-[55px] left-0 right-0 z-10 pb-[50px] text-left md:flex hidden justify-between items-center w-full text-white">
        <h2 className="text-8xl font-bold leading-[90px] pl-[50px]">
          Transfers <br /> made easy
        </h2>

        <div className="flex flex-col mr-[50px]">
        <p className="text-2xl pt-4">
          Single account for all your payments.
        </p>
        <div className="flex justify-start items-center gap-4 pt-8">
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors py-1" aria-label="Download on the App Store">
            <AiFillApple className="text-3xl" />
            <div className="flex flex-col text-left">
              <span className="text-xs">Download on the</span>
              <span className="text-lg font-semibold">App Store</span>
            </div>
          </a>
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors py-1" aria-label="Get it on Google Play">
            <FaGooglePlay className="text-3xl" />
            <div className="flex flex-col text-left">
              <span className="text-xs">GET IT ON</span>
              <span className="text-lg font-semibold">Google Play</span>
            </div>
          </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-[30px] left-[50px] z-10 md:flex items-center justify-center gap-2 text-white border border-white rounded-full px-4 py-2 cursor-pointer hidden"
        onClick={onScrollButtonClick}
      >
        <BsArrowDown className="text-[0.8rem]" />
        <span className="text-[0.7rem]">Scroll</span>
      </div>

      {/* Mobile View (hidden on desktop) */}
      <div className="block md:hidden relative h-screen overflow-x-hidden w-full">
        {/* Content for mobile */}
        <div className="absolute inset-0 z-10 flex flex-col text-white px-4 pt-8 pb-[150px]">
          {/* Top part: H1 heading for mobile */}
          <h2 className="text-[2.2rem] font-bold leading-[60px] text-left pt-[50px]">
            Transfers made easy
          </h2>

          {/* Spacer to push content to bottom on mobile */}
          <div className="flex-grow"></div> 

          {/* Bottom part: Paragraph and Buttons for mobile */}
          <div className="flex flex-col text-left ml-0">
            <p className="text-[1.5rem] mb-4">
              Single account for all your payments.
            </p>
            <div className="flex justify-start items-start gap-4">
              <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors py-1" aria-label="Download on the App Store">
                <AiFillApple className="text-2xl" />
                <div className="flex flex-col text-left">
                  <span className="text-xs">Download on the</span>
                  <span className="text-base font-semibold">App Store</span>
                </div>
              </a>
              <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors py-1" aria-label="Get it on Google Play">
                <FaGooglePlay className="text-2xl" />
                <div className="flex flex-col text-left">
                  <span className="text-xs">GET IT ON</span>
                  <span className="text-base font-semibold">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 