import { BsArrowDown } from "react-icons/bs";
import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";

const HeroSection = ({ onScrollButtonClick }: { onScrollButtonClick: () => void }) => {
  return (
    <div className="relative h-screen flex items-center text-white px-[50px] overflow-x-hidden w-full">
      {/* Background Video */}
      <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline preload="metadata">
        <source src="https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-41.402Z-jeton-homepage-hd2.mp4#t=0.01" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 space-y-8 text-left flex justify-between items-center w-full mt-[230px]">
        <h2 className="text-8xl font-bold leading-[90px]">
          One app <br /> for all needs
        </h2>

        <div className="flex flex-col mr-[50px]">
        <p className="text-2xl pt-4">
          Single account for all your payments.
        </p>
        <div className="flex justify-start items-center gap-4 pt-8">
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors" aria-label="Download on the App Store">
            <AiFillApple className="text-3xl" />
            <div className="flex flex-col text-left">
              <span className="text-xs">Download on the</span>
              <span className="text-lg font-semibold">App Store</span>
            </div>
          </a>
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 h-fit rounded-lg transition-colors" aria-label="Get it on Google Play">
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
        className="absolute bottom-[30px] left-[50px] z-10 flex items-center justify-center gap-2 text-white border border-white rounded-full px-4 py-2 cursor-pointer"
        onClick={onScrollButtonClick}
      >
        <BsArrowDown className="text-[0.8rem]" />
        <span className="text-[0.7rem]">Scroll</span>
      </div>
    </div>
  );
};

export default HeroSection; 