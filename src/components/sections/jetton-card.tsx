import { jeton_card_video } from "../../assets";
import CurrencyExchange from '../CurrencyExchange';

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
      <p className="text-orange-500 text-[0.8rem] w-[450px] text-center">*The displayed conversion rates and fees may vary during the currency exchange process, d the rates shown were last updated at 00:59 on 05:06.2025.</p>
      </div>

      <CurrencyExchange />

      </section>
    </section>
  )
}

export default JettonCardSection;