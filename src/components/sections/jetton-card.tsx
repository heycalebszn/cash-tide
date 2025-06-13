import { BiTransfer } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { jeton_card_video } from "../../assets";

const JettonCardSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="text-orange-500 border border-orange-500 rounded-full px-4 py-1 text-[0.8rem]">Jeton Card</div>

      <div className="flex flex-col gap-[100px] items-center justify-center">
        <h1 className="text-orange-600 text-[2.5rem] w-[550px] text-center font-semibold">Contactless payments? Sure.
    Spending limits? Check.
    Card freezing? Also check.</h1>

    <video src={jeton_card_video} className="h-[500px] w- rounded-xl" />

    <div className="flex flex-col gap-6 items-center justify-center">
    <h1 className="text-orange-600 text-[5rem] w-[800px] text-center font-semibold leading-[80px]">Jeton Card: Your Go-To for Every Purchase</h1>
    <a href="#" className="p-4 bg-orange-500 text-white text-[0.9rem] rounded-md w-[150px] text-center">Learn more</a>
    </div>
      </div>

      <section className="flex flex-col items-center justify-center">
      <div className="text-orange-500 border border-orange-500 rounded-full px-4 py-1 text-[0.8rem] mt-[200px] w-fit">Exchange</div>

      <div className="flex flex-col gap-[30px] items-center justify-center">
      <h1 className="text-orange-600 text-[5rem] w-[500px] text-center font-semibold leading-[70px]">Convert fiat cash easily.</h1>
      <p className="text-orange-500 text-[0.8rem] w-[500px]">*The displayed conversion rates and fees may vary during the currency exchange process, d the rates shown were last updated at 00:59 on 05:06.2025.</p>
      </div>

      <div className="flex flex-col items-center gap-4 p-4">
      {/* AUD Card */}
      <div className="bg-pink-100/50 rounded-xl p-4 flex items-center justify-between w-full max-w-sm">
        <div className="flex items-center gap-3">
          {/* Placeholder for AUD Flag */}
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">AUD</div>
          <span className="font-semibold text-black text-lg">AUD</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-black">$10</span>
          <FaChevronDown className="text-red-500 text-lg" />
        </div>
      </div>

      {/* Exchange Icon */}
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-200">
        <BiTransfer className="text-blue-500 text-2xl rotate-90" />
      </div>

      {/* GBP Card */}
      <div className="bg-pink-100/50 rounded-xl p-4 flex items-center justify-between w-full max-w-sm">
        <div className="flex items-center gap-3">
          {/* Placeholder for GBP Flag */}
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">GBP</div>
          <span className="font-semibold text-black text-lg">GBP</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-black">£ 4,8</span>
          <FaChevronDown className="text-red-500 text-lg" />
        </div>
      </div>
    </div>
      </section>
    </section>
  )
}

export default JettonCardSection;