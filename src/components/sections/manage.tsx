import { manage_bg } from "../../assets";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const ManageSection = () => {
    return(
        <section className="relative h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Background Video */}
            <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
                <source src={manage_bg} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Content */}
            <div className="relative z-20 flex flex-col px-4 pt-[50px] w-full max-w-6xl mx-auto items-start justify-between">
                <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4 max-w-2xl text-left md:w-[450px] w-[300px]">All your finances, in one app.</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl text-left">Join 1M+ happy users today.</p>
                
                <a href="#" className="px-8 py-4 bg-white text-orange-500 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors mb-8">
                    Get Started
                </a>

                <div className="flex flex-col sm:flex-row gap-4 justify-start mt-[50px]">
                    <a href="#" className="flex items-center space-x-2 border border-white rounded-lg px-6 py-2 hover:bg-white/10 transition-colors">
                        <FaGooglePlay className="text-2xl" />
                        <div className="flex flex-col text-left text-sm">
                            <span>GET IT ON</span>
                            <span className="font-semibold text-base">Google Play</span>
                        </div>
                    </a>
                    <a href="#" className="flex items-center space-x-2 border border-white rounded-lg px-6 py-2 hover:bg-white/10 transition-colors">
                        <FaApple className="text-2xl" />
                        <div className="flex flex-col text-left text-sm">
                            <span>Download on the</span>
                            <span className="font-semibold text-base">App Store</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default ManageSection;