function Questionnaire() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white text-center flex flex-col">

      <h1 className="text-3xl md:text-4xl font-serif font-bold pt-36 pb-10">
        Q1. Choose a genre you like:
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-4 mx-10 md:mx-16">
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          Action
        </button>
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          Adventure
        </button>
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-60 sm:w-64 md:w-72 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          Role-playing game
        </button>
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          Horror
        </button>
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          Shooter
        </button>
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          Action
        </button>
      </div>

      <div className="w-full bg-gray-300 h-2 rounded-full mx-auto mt-10">
        <div className="bg-[#f6a302] h-2 rounded-full w-1/3"></div>
      </div>

      <h1 className="text-3xl md:text-4xl font-serif font-bold pt-10 pb-10">
        Q2. Choose your age category:
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-4 mx-10 md:mx-16">
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          under 12
        </button>
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          12-17
        </button>
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          18+
        </button>
      </div>

      <div className="w-full bg-gray-300 h-2 rounded-full mx-auto mt-10">
        <div className="bg-[#f6a302] h-2 rounded-full w-2/3"></div>
      </div>

      {/* Question 3 */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold pt-10 pb-10">
        Q3. Do you prefer solo or multi-player games?
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-4 mx-10 md:mx-16">
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          Solo
        </button>
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          Multi-player
        </button>
        <button className="m-4 bg-[#f6a302] font-bold py-2 px-4 rounded-full w-40 sm:w-48 md:w-60 transition transform hover:bg-[#fa9a00ef] hover:scale-110">
          Both
        </button>
      </div>

      <div className="w-full bg-gray-300 h-2 rounded-full mx-auto mt-10">
        <div className="bg-[#f6a302] h-2 rounded-full w-full"></div>
      </div>

      {/* Continue Button */}
      <div className="flex items-center justify-center md:justify-end p-4 bg-transparent mt-auto">
        <a href="/shop" className="flex items-center">
          <img className="w-10 mr-2" src="/arrow.jpg" />
          <p className="text-xl font-semibold">Continue</p>
        </a>
      </div>
    </div>
  );
}

export default Questionnaire;
