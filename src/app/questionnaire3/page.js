import Link from 'next/link';

function questionnaire3() {
    return (
      <div>
        <div className="min-h-screen bg-[#1A1A22] text-white text-center px-6 py-12 border-2 border-white">
          {/* Progress indicator */}
          <div className="mb-8">
            <p className="text-xl mb-4">3/3</p>
            <div className="w-full bg-gray-600 h-2 rounded-full mx-auto">
              <div className="bg-white h-2 rounded-full w-3/3"></div>
            </div>
          </div>
  
          {/* Question Card */}
          <div className="bg-white text-black rounded-xl p-6 px-6 mb-12 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold">
              Q3. DO YOU PREFER SOLO OF MULTIPLAYER GAMES?
            </h1>
          </div>
  
          {/* Buttons Stack */}
          <div className="flex flex-col gap-10 mx-auto max-w-2xl mb-8">
            <button className="bg-white text-black rounded-xl py-4 px-8 min-w-[150px] font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              MP
            </button>
            <button className="bg-white text-black rounded-xl py-4 px-16 min-w-[200px] font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              SOLO
            </button>
            <button className="bg-white text-black rounded-xl py-4 px-16 min-w-[200px] font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              BOTH
            </button>
          </div>
  
          {/* Navigation Buttons */}
          <div className="flex justify-between mx-12">
            <Link href="/questionnaire2">
              <button className="bg-[#F0ECEC] text-black rounded-xl py-2 px-8 font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
                Back
              </button>
            </Link>
            <button className="bg-[#F0ECEC] text-black rounded-xl py-2 px-8 font-bold transition-all duration-200 hover:scale-105 hover:bg-gray-200">
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default questionnaire3;
