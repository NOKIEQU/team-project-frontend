function Questionnaire() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white text-center pt-10 pb-20">
        {/* Question 1 */}
        <h1 className="text-4xl font-serif font-bold pb-5">
          Q1. Choose a genre you like:
        </h1>

        <div className="grid grid-cols-3 justify-items-center gap-2 mx-16 md:mx-24">
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            Action
          </button>
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            Adventure
          </button>
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-60 transition transform hover:scale-110">
            Role-playing game
          </button>
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            Horror
          </button>
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            Shooter
          </button>
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            Action
          </button>
        </div>

        <div className="w-full bg-gray-300 h-2 rounded-full mx-auto mt-10">
          <div className="bg-[#f6a302] h-2 rounded-full w-1/3"></div>
        </div>

        {/* Question 2 */}
        <h1 className="text-4xl font-serif font-bold pt-20 pb-10">
          Q2. Choose your age category:
        </h1>
        <div className="grid grid-cols-3 justify-items-center gap-2 mx-16 md:mx-24">
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            under 12
          </button>
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            12-17
          </button>
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            18+
          </button>
        </div>

        <div className="w-full bg-gray-300 h-2 rounded-full mx-auto mt-10">
          <div className="bg-[#f6a302] h-2 rounded-full w-2/3"></div>
        </div>

        {/* Question 3 */}
        <h1 className="text-4xl font-serif font-bold pt-20 pb-10">
          Q3. Do you prefer solo or multi-player games?
        </h1>
        <div className="grid grid-cols-3 justify-items-center gap-2 mx-16 md:mx-24">
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            Solo
          </button>
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            Multi-player
          </button>
          <button className="m-4 bg-[#f6a302] hover:bg-[#fa9a00ef] font-bold py-2 px-4 rounded-full w-40 transition transform hover:scale-110">
            Both
          </button>
        </div>

        <div className="w-full bg-gray-300 h-2 rounded-full mx-auto mt-10">
          <div className="bg-[#f6a302] h-2 rounded-full w-full"></div>
        </div>

        {/* Continue Button */}
        <div className="flex items-center justify-end p-2 fixed bottom-10 right-10 bg-transparent">
          <a href="/shop" className="flex items-center">
            <img className="w-10 mr-2" src="/arrow.jpg" alt="Continue arrow" />
            <p className="text-xl font-semibold">Continue</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
