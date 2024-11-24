import React from 'react';
import { PlusCircle, BookOpen } from 'lucide-react';
import type { Deck } from '../types';

interface DeckListProps {
  decks: Deck[];
  onSelectDeck: (deck: Deck) => void;
  onCreateDeck: () => void;
}

export default function DeckList({ decks, onSelectDeck, onCreateDeck }: DeckListProps) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => (
        <div
          key={deck.id}
          onClick={() => onSelectDeck(deck)}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span className="text-sm text-gray-500">
              {deck.cards.length} cards
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{deck.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{deck.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>Last studied: {deck.lastStudied 
              ? new Date(deck.lastStudied).toLocaleDateString()
              : 'Never'}</span>
          </div>
        </div>
      ))}
      
      <button
        onClick={onCreateDeck}
        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-indigo-400 transition-colors group"
      >
        <PlusCircle className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 mb-2" />
        <span className="text-gray-500 group-hover:text-indigo-600 font-medium">
          Create New Deck
        </span>
      </button>
    </div>
  );
}