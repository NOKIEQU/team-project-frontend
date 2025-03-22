'use client';

import { redirect } from 'next/navigation';
import { useUser } from '../../context/user-context';
import QuizForm from './quiz-form';

export default function QuestionnairePage() {
  const { user } = useUser();

  if (user === null) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-[#1A1A22] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A1A22] border border-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#1A1A22] border-b border-gray-800 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Preference Quiz
          </h1>
          <p className="text-gray-400 text-center mt-2">
            Tell us about your gaming preferences
          </p>
        </div>
        <QuizForm />
      </div>
    </main>
  );
}
