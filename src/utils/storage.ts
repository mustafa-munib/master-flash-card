import type { Deck } from '../types';

const STORAGE_KEY = 'flashmaster_decks';

export const loadDecks = (): Deck[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  const decks = JSON.parse(stored);
  return decks.map((deck: Deck) => ({
    ...deck,
    created: new Date(deck.created),
    lastStudied: deck.lastStudied ? new Date(deck.lastStudied) : null,
    cards: deck.cards.map(card => ({
      ...card,
      lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : null,
      nextReview: card.nextReview ? new Date(card.nextReview) : null
    }))
  }));
};

export const saveDecks = (decks: Deck[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
};