import React, { useState, useEffect } from 'react';
import { RotateCw, Check, X } from 'lucide-react';
import type { Flashcard } from '../types';

interface StudyCardProps {
  card: Flashcard;
  onResult: (correct: boolean) => void;
}

export default function StudyCard({ card, onResult }: StudyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Reset interaction state when card changes
  useEffect(() => {
    setIsFlipped(false);
    setHasInteracted(false);
  }, [card.id]);

  const handleFlip = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsFlipped(true);
    }
  };

  const handleResult = (correct: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasInteracted) {
      onResult(correct);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="relative h-[400px] cursor-pointer"
        onClick={handleFlip}
      >
        <div
          className={`absolute w-full h-full transition-all duration-500 transform preserve-3d
            ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden">
            <div className="h-full bg-white rounded-xl shadow-lg p-8 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <p className="text-2xl text-gray-800 text-center">{card.front}</p>
              </div>
              <div className="text-center text-gray-500 mt-4">
                <RotateCw className="w-5 h-5 mx-auto" />
                <p className="text-sm mt-2">Click to reveal answer</p>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <div className="h-full bg-white rounded-xl shadow-lg p-8 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <p className="text-2xl text-gray-800 text-center">{card.back}</p>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={(e) => handleResult(false, e)}
                  className="flex items-center px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  disabled={!hasInteracted}
                >
                  <X className="w-5 h-5 mr-2" />
                  Incorrect
                </button>
                <button
                  onClick={(e) => handleResult(true, e)}
                  className="flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  disabled={!hasInteracted}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Correct
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}