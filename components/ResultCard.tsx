
import React from 'react';
import { CoachResponse } from '../types';

const Icons = {
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  Warning: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  ),
};

interface ResultCardProps {
  response: CoachResponse;
}

const ResultCard: React.FC<ResultCardProps> = ({ response }) => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Friendly Intro */}
      <div className="bg-[#F5F5DC]/40 p-4 rounded-xl border border-[#E9DCC9] border-dashed text-[#8B5E3C] font-medium text-center italic">
        {response.greeting}
      </div>

      {/* Concept Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E9DCC9]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#F5F5DC] rounded-lg">
            <Icons.Book />
          </div>
          <h3 className="text-xl font-bold text-[#8B5E3C]">Concept Explained Simply</h3>
        </div>
        <p className="text-[#4A3728] leading-relaxed text-lg">
          {response.conceptExplanation}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Examiner Section */}
        <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#D2B48C]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg text-green-700">
              <Icons.Check />
            </div>
            <h3 className="text-lg font-bold text-[#8B5E3C]">What Examiners Look For</h3>
          </div>
          <ul className="space-y-3">
            {response.examinerExpectations.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-[#4A3728]">
                <span className="text-[#8B5E3C]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mistakes Section */}
        <div className="bg-[#FFF9F5] p-6 rounded-2xl border border-orange-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-700">
              <Icons.Warning />
            </div>
            <h3 className="text-lg font-bold text-[#8B5E3C]">Where Marks Are Lost</h3>
          </div>
          <ul className="space-y-3">
            {response.commonMistakes.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-[#4A3728]">
                <span className="text-orange-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Model Answer Section */}
      <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-[#D2B48C]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Icons.Star />
          </div>
          <h3 className="text-2xl font-bold text-[#8B5E3C]">Model Answer (10 Key Points)</h3>
        </div>
        <div className="space-y-4 p-6 bg-[#FDFBF7] rounded-xl border border-dashed border-[#D2B48C]">
          {response.modelAnswer.map((point, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="min-w-[28px] h-[28px] bg-[#8B5E3C] text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                {index + 1}
              </div>
              <p className="text-[#4A3728] leading-relaxed text-lg font-medium">
                {point}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-[#8B5E3C] italic text-center">
          Notice how breaking it into 10 clear points makes it so much easier for an examiner to award marks? You've got this!
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
