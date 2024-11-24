import React from 'react';
import { Plus, ArrowLeft } from 'lucide-react';

interface DeckHeaderProps {
  deckName: string;
  onAddCard: () => void;
  onBack: () => void;
}

export default function DeckHeader({ deckName, onAddCard, onBack }: DeckHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-900">{deckName}</h2>
      </div>
      <button
        onClick={onAddCard}
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Card
      </button>
    </div>
  );
}