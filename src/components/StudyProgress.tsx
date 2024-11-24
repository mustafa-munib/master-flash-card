import React from 'react';
import type { StudyStats } from '../types';

interface StudyProgressProps {
  stats: StudyStats;
  totalCards: number;
  currentCardIndex: number;
}

export default function StudyProgress({ stats, totalCards, currentCardIndex }: StudyProgressProps) {
  // Calculate progress percentage based on cards completed
  const progressPercentage = Math.round((currentCardIndex / totalCards) * 100);
  
  // Calculate accuracy percentage
  const total = stats.correct + stats.incorrect;
  const accuracyPercentage = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
  
  const circumference = 2 * Math.PI * 45; // circle radius = 45
  const offset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="64"
                cy="64"
              />
              <circle
                className="text-indigo-600 transition-all duration-1000 ease-in-out"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="64"
                cy="64"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-gray-700">{progressPercentage}%</span>
              <span className="text-sm text-gray-500">Progress</span>
            </div>
          </div>
        </div>

        <div className="col-span-3 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
            <p className="text-sm text-gray-600">Correct</p>
            <p className="text-xs text-gray-500 mt-1">{accuracyPercentage}% accuracy</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{stats.incorrect}</p>
            <p className="text-sm text-gray-600">Incorrect</p>
            <p className="text-xs text-gray-500 mt-1">{totalCards - currentCardIndex} remaining</p>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <p className="text-2xl font-bold text-indigo-600">{stats.streak}</p>
            <p className="text-sm text-gray-600">Streak</p>
            <p className="text-xs text-gray-500 mt-1">Best: {stats.streak}</p>
          </div>
        </div>
      </div>
    </div>
  );
}