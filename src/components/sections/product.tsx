import { BiBookmark } from "react-icons/bi";
import { product_1, product_2 } from "../../assets";

const ProductSection = () => {
  return (
    <div className="flex flex-col bg-white px-6 py-12 gap-16 md:px-[50px] md:py-[30px] lg:px-[100px] lg:py-[60px] lg:gap-28 max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-10">
        <div className="flex flex-col gap-6 mb-6 md:mb-0">
            <div className="flex gap-3 items-center">
            <BiBookmark className="text-blue-500" />
            <span className="text-gray-700 text-[0.9rem]">Product</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium w-full md:w-[400px] lg:w-[500px] leading-tight">Send money instantly and for free</h1>
            <p className="text-gray-500 text-[1rem] w-full md:w-[400px] lg:w-[500px]">Transferring money across borders has never been easier. Just log in to CashTide with your phone number, add funds, and send them to any recipient using their phone number. No fees, no delays, no banks.</p>
            <a href="" className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit text-center shadow-2xl">Get Started</a>
        </div>

        <video src={product_1} autoPlay muted loop className="w-full md:w-[400px] lg:w-[500px] h-full object-cover rounded-lg" />
      </div>

      <div className="flex flex-col items-center md:flex-row-reverse md:justify-between gap-10">
        <div className="flex flex-col gap-6 mb-6 md:mb-0">
            <div className="flex gap-3 items-center">
            <BiBookmark className="text-blue-500" />
            <span className="text-gray-700 text-[0.9rem]">Product</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium w-full md:w-[400px] lg:w-[500px] leading-tight">Receive Money from Any Corner of the Globe</h1>
            <p className="text-gray-500 text-[1rem] w-full md:w-[400px] lg:w-[500px]">Get paid instantly from any part of the world, straight to your phone number. No paperwork or bureaucracy. CashTide makes receiving money fast, free, and accessible — even without a bank account.</p>
            <a href="" className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit text-center shadow-2xl">Enter Dapp</a>
        </div>

        <video src={product_2} autoPlay muted loop className="w-full md:w-[400px] lg:w-[500px] h-full object-cover rounded-lg" />
      </div>
    </div>
  )
}

export default ProductSection;