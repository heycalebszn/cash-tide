import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";

const CallToActionSection = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center text-center h-screen gap-16">
      <h1 className="text-[8rem] w-[1000px] text-orange-500 font-bold leading-[130px]">1 million users, plus you.</h1>
      <p className="text-[1.5rem] text-orange-500">It only takes few seconds to get started.</p>

      <div className="flex items-center gap-4">
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-orange-500 text-orange-500 px-4 h-fit rounded-lg transition-colors" aria-label="Download on the App Store">
            <AiFillApple className="text-3xl" />
            <div className="flex flex-col text-left">
              <span className="text-xs">Download on the</span>
              <span className="text-lg font-semibold">App Store</span>
            </div>
          </a>
          <a href="#" className="flex items-center space-x-2 bg-transparent border border-orange-500 text-orange-500 px-4 h-fit rounded-lg transition-colors" aria-label="Get it on Google Play">
            <FaGooglePlay className="text-3xl" />
            <div className="flex flex-col text-left">
              <span className="text-xs">GET IT ON</span>
              <span className="text-lg font-semibold">Google Play</span>
            </div>
          </a>
          </div>
    </section>
  )
}

export default CallToActionSection;
