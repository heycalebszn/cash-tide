import { BsArrowDown } from "react-icons/bs";
import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import { hero_bg } from "../../assets";

const HeroSection = ({ onScrollButtonClick }: { onScrollButtonClick: () => void }) => {
  return (
    <div className="relative h-screen overflow-x-hidden w-full">
      {/* Background Video (common to both mobile and desktop) */}
      <video className="absolute inset-0 w-full h-full object-cover z-0 brightness-100" autoPlay loop muted playsInline preload="metadata">
        <source src={hero_bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Desktop View (hidden on mobile) - Your perfect desktop code goes here */}
      <div className="absolute bottom-[55px] left-0 right-0 z-10 pb-[50px] text-left md:flex hidden justify-between items-center w-full text-white">
        <h2 className="text-7xl font-bold leading-[80px] pl-[50px]">
        Tap. Type. <br /> Transferred.
        </h2>

        <div className="flex flex-col mr-[50px]">
        <p className="text-[1.3rem] pt-4 w-[400px]">
        Crypto transfers simplified, no wallet address needed.
        </p>
        <div className="flex justify-start items-center gap-4 pt-8">
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors py-[5px]" aria-label="Download on the App Store">
            <AiFillApple className="text-3xl" />
            <div className="flex flex-col text-left">
            <span className="text-[0.6rem]">Download on the</span>
            <span className="font-semibold text-sm md:text-[1rem]">App Store</span>
            </div>
          </a>
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors py-[5px]" aria-label="Get it on Google Play">
            <FaGooglePlay className="text-3xl" />
            <div className="flex flex-col text-left">
            <span className="text-[0.6rem]">GET IT ON</span>
            <span className="font-semibold text-sm md:text-[1rem]">Google Play</span>
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
          <h2 className="text-[2.5rem] font-medium leading-[50px] text-left pt-[80px]">
          Tap. Type. <br /> Transferred.
          </h2>

          {/* Spacer to push content to bottom on mobile */}
          <div className="flex-grow"></div> 

          {/* Bottom part: Paragraph and Buttons for mobile */}
          <div className="flex flex-col text-left mt-[250px]">
            <p className="text-[1.3rem] mb-4 w-[350px]">
            Crypto transfers simplified, no wallet address needed.
            </p>
            <div className="flex justify-start items-start gap-4">
              <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors py-1" aria-label="Download on the App Store">
                <AiFillApple className="text-2xl" />
                <div className="flex flex-col text-left">
                <span className="text-[0.6rem]">Download on the</span>
                <span className="font-semibold text-sm md:text-[1rem]">App Store</span>
              </div>
              </a>
              <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors py-1" aria-label="Get it on Google Play">
                <FaGooglePlay className="text-2xl" />
                <div className="flex flex-col text-left">
                <span className="text-[0.6rem]">GET IT ON</span>
                <span className="font-semibold text-sm md:text-[1rem]">Google Play</span>
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