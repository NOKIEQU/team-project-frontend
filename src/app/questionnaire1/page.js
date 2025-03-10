
import Link from 'next/link';

function questionnaire1() {
    return (
      <div>
        <div className="min-h-screen bg-[#1A1A22] text-white text-center px-6 py-12 border-2 border-white">
          {/* Progress indicator */}
          <div className="mb-8">
            <p className="text-xl mb-4">1/3</p>
            <div className="w-full bg-gray-600 h-2 rounded-full mx-auto">
              <div className="bg-white h-2 rounded-full w-1/3"></div>
            </div>
          </div>
  
          {/* Question Card */}
          <div className="bg-white text-black rounded-xl p-4 px-6 mb-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold">
              Q1. CHOOSE A GENRE YOU LIKE
            </h1>
          </div>
  
          {/* Buttons Grid */}
          <div className="grid grid-cols-2 gap-6 mx-auto max-w-2xl mb-8">
            <button className="bg-white text-black rounded-xl py-3 px-8 min-w-[150px] font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              ACTION
            </button>
            <button className="bg-white text-black rounded-xl py-3 px-8 min-w-[150px] font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              RPG
            </button>
            <button className="bg-white text-black rounded-xl py-3 px-8 min-w-[150px] font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              ADVENTURE
            </button>
            <button className="bg-white text-black rounded-xl py-3 px-8 min-w-[150px] font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              SHOOTER
            </button>
            <button className="bg-white text-black rounded-xl py-3 px-8 min-w-[150px] font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              ACTION
            </button>
            <button className="bg-white text-black rounded-xl py-3 px-8 min-w-[150px] font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              ACTION
            </button>
          </div>
  
          {/* Continue Button */}
          <div className="flex justify-end mr-12">
            <Link href="/questionnaire2">
              <button className="bg-[#F0ECEC]
               text-black rounded-xl py-2 px-8 font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default questionnaire1;
