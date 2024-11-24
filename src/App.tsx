import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import type { Deck, Flashcard, StudyStats } from './types';
import DeckList from './components/DeckList';
import StudyCard from './components/StudyCard';
import StudyProgress from './components/StudyProgress';
import DeckHeader from './components/DeckHeader';
import AddCardModal from './components/AddCardModal';
import AddDeckModal from './components/AddDeckModal';
import Footer from './components/Footer';
import { calculateNextReview } from './utils/srs';
import { loadDecks, saveDecks } from './utils/storage';

// Sample deck for initial state
const sampleDeck: Deck = {
  id: '1',
  name: 'JavaScript Fundamentals',
  description: 'Core concepts of JavaScript programming',
  cards: [
    {
      id: '1',
      front: 'What is hoisting in JavaScript?',
      back: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top of their scope before code execution.',
      lastReviewed: null,
      nextReview: null,
      level: 0
    },
    {
      id: '2',
      front: 'What is closure in JavaScript?',
      back: 'A closure is the combination of a function and the lexical environment within which that function was declared.',
      lastReviewed: null,
      nextReview: null,
      level: 0
    }
  ],
  created: new Date(),
  lastStudied: null
};

function App() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [stats, setStats] = useState<StudyStats>({
    correct: 0,
    incorrect: 0,
    streak: 0
  });

  // Load decks from localStorage on initial render
  useEffect(() => {
    const storedDecks = loadDecks();
    setDecks(storedDecks.length ? storedDecks : [sampleDeck]);
  }, []);

  // Save decks to localStorage whenever they change
  useEffect(() => {
    if (decks.length) {
      saveDecks(decks);
    }
  }, [decks]);

  const startStudying = (deck: Deck) => {
    setCurrentDeck(deck);
    setCurrentCard(deck.cards[0]);
    setCurrentCardIndex(0);
    setStats({ correct: 0, incorrect: 0, streak: 0 });
  };

  const handleCardResult = (correct: boolean) => {
    if (!currentCard || !currentDeck) return;

    // Update stats
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
      streak: correct ? prev.streak + 1 : 0
    }));

    // Update card SRS data
    const updatedCard = {
      ...currentCard,
      lastReviewed: new Date(),
      nextReview: calculateNextReview(currentCard.level, correct),
      level: correct ? Math.min(currentCard.level + 1, 5) : 0
    };

    // Update deck with modified card
    const updatedDeck = {
      ...currentDeck,
      lastStudied: new Date(),
      cards: currentDeck.cards.map(card =>
        card.id === currentCard.id ? updatedCard : card
      )
    };

    // Update decks in state
    setDecks(prevDecks =>
      prevDecks.map(deck =>
        deck.id === currentDeck.id ? updatedDeck : deck
      )
    );

    // Move to next card or finish
    const nextIndex = currentCardIndex + 1;
    const nextCard = currentDeck.cards[nextIndex] || null;
    setCurrentCard(nextCard);
    setCurrentCardIndex(nextIndex);

    if (!nextCard) {
      setCurrentDeck(null);
    }
  };

  const handleAddCard = (front: string, back: string) => {
    if (!currentDeck) return;

    const newCard: Flashcard = {
      id: Date.now().toString(),
      front,
      back,
      lastReviewed: null,
      nextReview: null,
      level: 0
    };

    const updatedDeck = {
      ...currentDeck,
      cards: [...currentDeck.cards, newCard]
    };

    setDecks(prevDecks =>
      prevDecks.map(deck =>
        deck.id === currentDeck.id ? updatedDeck : deck
      )
    );
    setCurrentDeck(updatedDeck);
  };

  const handleAddDeck = (name: string, description: string) => {
    const newDeck: Deck = {
      id: Date.now().toString(),
      name,
      description,
      cards: [],
      created: new Date(),
      lastStudied: null
    };

    setDecks(prevDecks => [...prevDecks, newDeck]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">FlashMaster</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentDeck ? (
          <>
            <DeckHeader
              deckName={currentDeck.name}
              onAddCard={() => setShowAddCard(true)}
              onBack={() => {
                setCurrentDeck(null);
                setCurrentCard(null);
                setCurrentCardIndex(0);
              }}
            />
            {currentCard ? (
              <>
                <StudyProgress 
                  stats={stats} 
                  totalCards={currentDeck.cards.length}
                  currentCardIndex={currentCardIndex}
                />
                <StudyCard card={currentCard} onResult={handleCardResult} />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  You've completed all cards in this deck!
                </p>
                <button
                  onClick={() => startStudying(currentDeck)}
                  className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Study Again
                </button>
              </div>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Decks</h2>
            <DeckList
              decks={decks}
              onSelectDeck={startStudying}
              onCreateDeck={() => setShowAddDeck(true)}
            />
          </div>
        )}

        {showAddCard && (
          <AddCardModal
            deckId={currentDeck?.id || ''}
            onAdd={handleAddCard}
            onClose={() => setShowAddCard(false)}
          />
        )}

        {showAddDeck && (
          <AddDeckModal
            onAdd={handleAddDeck}
            onClose={() => setShowAddDeck(false)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;