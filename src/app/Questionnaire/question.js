'use client';

export default function Question({
  question,
  options,
  selectedOption,
  onSelect,
  currentQuestion,
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">{question}</h2>
      <div className="space-y-3">
        {options.map((option, index) => {
          // For age question (currentQuestion === 1), we need to check if the boolean value matches
          const isSelected =
            currentQuestion === 1
              ? selectedOption === (index === 1) // true for "18+", false for "Under 18"
              : selectedOption === option;

          return (
            <button
              key={option}
              onClick={() => onSelect(option, index)}
              className={`w-full text-left p-4 border rounded-lg transition-colors duration-200 flex justify-between items-center ${
                isSelected
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'border-gray-700 hover:bg-gray-800/50 text-gray-300'
              }`}
            >
              <span>{option}</span>
              <span
                className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-[#F0ECEC]' : 'border-gray-600'
                }`}
              >
                <span
                  className={`h-3 w-3 rounded-full ${
                    isSelected ? 'bg-[#F0ECEC]' : 'bg-transparent'
                  }`}
                ></span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
