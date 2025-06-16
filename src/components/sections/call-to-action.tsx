import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";

const CallToActionSection = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center text-center h-screen gap-16 relative bg-white">
      <div className="relative z-10">
        <h1 className="text-[4rem] w-[400px] font-bold leading-[3.5rem] md:text-[8rem] md:w-[1000px] md:leading-[130px] text-orange-500">1 million users, plus you.</h1>
      </div>

      <p className="text-[1rem] text-orange-500 md:text-[1.5rem]">It only takes few seconds to get started.</p>

      <div className="flex items-center gap-4">
        <a href="#" className="flex items-center space-x-2 bg-transparent border border-orange-500 text-orange-500 px-4 h-fit rounded-lg transition-colors" aria-label="Download on the App Store">
          <AiFillApple className="text-2xl md:text-3xl" />
          <div className="flex flex-col text-left">
            <span className="text-xs">Download on the</span>
            <span className="text-base font-semibold md:text-lg">App Store</span>
          </div>
        </a>
        <a href="#" className="flex items-center space-x-2 bg-transparent border border-orange-500 text-orange-500 px-4 h-fit rounded-lg transition-colors" aria-label="Get it on Google Play">
          <FaGooglePlay className="text-2xl md:text-3xl" />
          <div className="flex flex-col text-left">
            <span className="text-xs">GET IT ON</span>
            <span className="text-base font-semibold md:text-lg">Google Play</span>
          </div>
        </a>
      </div>
    </section>
  )
}

export default CallToActionSection;