'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Question from './question';

// TODO: will remove it cause it's not needed
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function QuizForm() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizData, setQuizData] = useState({
    favoriteGenres: [],
    isAdult: '',
    gamePlayPreference: '',
  });

  // For single-select questions
  const [currentSelection, setCurrentSelection] = useState('');

  // For multi-select genre question
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');

  // Static questions for age and play style
  const questions = [
    {
      id: 'favoriteGenres',
      question: 'Choose genre(s) you like:',
      isMultiSelect: true,
      // Options will be loaded from API
    },
    {
      id: 'isAdult',
      question: 'Choose your age category:',
      isMultiSelect: false,
      options: ['Under 18', '18+'],
      values: [false, true], // Boolean values corresponding to each option
    },
    {
      id: 'gamePlayPreference',
      question: 'Do you prefer Single or Multi player games?',
      isMultiSelect: false,
      options: ['SinglePlayer', 'MultiPlayer'],
    },
  ];

  // Fetch genres when component mounts
  useEffect(() => {
    async function fetchGenres() {
      try {
        setIsLoading(true);
        const response = await fetch('http://51.77.110.253:3001/api/genres');

        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }

        const data = await response.json();
        setGenres(data);
      } catch (err) {
        console.error('Error fetching genres:', err);
        setError('Failed to load genres. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchGenres();
  }, []);

  // Update the handleOptionSelect function to handle boolean values for age
  const handleOptionSelect = (option, index) => {
    // If this is the age question, store the boolean value
    if (currentQuestion === 1) {
      const booleanValue = questions[1].values[index];
      setCurrentSelection(booleanValue);
    } else {
      setCurrentSelection(option);
    }
  };

  // Handle multi-select option (for genres)
  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      } else {
        return [...prev, genreId];
      }
    });
  };

  // Update the handleNext function to handle the age category correctly
  const handleNext = () => {
    // For the genre question (multi-select)
    if (currentQuestion === 0) {
      if (selectedGenres.length === 0) return; // Don't proceed if nothing selected

      // Save selected genres
      setQuizData({ ...quizData, favoriteGenres: selectedGenres });
    } else {
      // For other questions (single-select)
      if (currentSelection === '') return; // Don't proceed if nothing selected

      // Save the current selection
      const questionId = questions[currentQuestion].id;
      setQuizData({ ...quizData, [questionId]: currentSelection });
    }

    // Move to next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentSelection(''); // Reset current selection for the next question
    }
  };

  const handleSubmit = async () => {
    // For the last question (which is not the genre question)
    if (!currentSelection) return; // Don't submit if nothing is selected

    // Save the final selection
    const questionId = questions[currentQuestion].id;
    const finalData = {
      ...quizData,
      [questionId]: currentSelection,
    };

    setIsSubmitting(true);
    setSubmitError('');
    await sleep(2000);

    try {
      console.log('🚀 ~ handleSubmit ~ finalData:', finalData);

      // TODO: will do this later
      //   const response = await fetch('http://localhost:3001/api/questionnaire', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(finalData),
      //   });

      //   if (!response.ok) {
      //     throw new Error('Failed to submit quiz');
      //   }

      // Navigate to the home page
      router.push('/');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setSubmitError('Failed to submit quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update the handlePrevious function to handle the age category correctly
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // Going back to genre question
      if (currentQuestion === 1) {
        // Restore previously selected genres
        setSelectedGenres(quizData.favoriteGenres || []);
      } else {
        // Restore previous single selection
        setCurrentSelection(quizData[questions[currentQuestion - 1].id]);
      }

      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isCurrentQuestionMultiSelect = currentQuestion === 0;

  // Determine if the Next/Submit button should be enabled
  const isNextEnabled = isCurrentQuestionMultiSelect
    ? selectedGenres.length > 0
    : currentSelection !== '';

  // Show loading state while fetching genres
  if (isLoading && currentQuestion === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400 mb-4"></div>
        <p className="text-gray-400">Loading genres...</p>
      </div>
    );
  }

  // Show error if genres failed to load
  if (error && currentQuestion === 0) {
    return (
      <div className="p-6">
        <div
          className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full px-6 py-2 bg-[#F0ECEC] text-[#1A1A22] font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Refresh
        </button>
      </div>
    );
  }

  // Show error if submission failed
  if (submitError) {
    return (
      <div className="p-6">
        <div
          className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <p>{submitError}</p>
        </div>
        <button
          onClick={() => setSubmitError('')}
          className="w-full px-6 py-2 bg-[#F0ECEC] text-[#1A1A22] font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2.5 mb-6">
        <div
          className="bg-[#F0ECEC] h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      <div className="text-right text-sm text-gray-400 mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </div>

      {currentQuestion === 0 ? (
        // Genre question (multi-select)
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {questions[0].question}
          </h2>
          <div className="space-y-3">
            {genres.map((genre) => {
              const isSelected = selectedGenres.includes(genre.id);

              return (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`w-full text-left p-4 border rounded-lg transition-colors duration-200 flex justify-between items-center ${
                    isSelected
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'border-gray-700 hover:bg-gray-800/50 text-gray-300'
                  }`}
                >
                  <span>{genre.name}</span>
                  <span
                    className={`h-5 w-5 rounded border flex items-center justify-center ${
                      isSelected
                        ? 'border-[#F0ECEC] bg-gray-700'
                        : 'border-gray-600'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-[#F0ECEC]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          {selectedGenres.length > 0 && (
            <div className="mt-4 text-sm text-gray-400">
              {selectedGenres.length} genre
              {selectedGenres.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>
      ) : (
        // Other questions (single-select)
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          selectedOption={currentSelection}
          onSelect={(option, index) => handleOptionSelect(option, index)}
          currentQuestion={currentQuestion}
        />
      )}

      <div className="mt-6 flex justify-between">
        {currentQuestion > 0 ? (
          <button
            onClick={handlePrevious}
            className="px-4 py-2 text-gray-400 hover:text-white font-medium"
          >
            ← Previous
          </button>
        ) : (
          <div></div> // Empty div to maintain flex spacing
        )}

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!isNextEnabled || isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium ${
              isNextEnabled && !isSubmitting
                ? 'bg-[#F0ECEC] text-[#1A1A22] hover:bg-gray-200'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            } transition-colors duration-200 flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#1A1A22]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isNextEnabled}
            className={`px-6 py-2 rounded-lg font-medium ${
              isNextEnabled
                ? 'bg-[#F0ECEC] text-[#1A1A22] hover:bg-gray-200'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            } transition-colors duration-200`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
