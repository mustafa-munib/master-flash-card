import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCardModalProps {
  deckId: string;
  onAdd: (front: string, back: string) => void;
  onClose: () => void;
}

export default function AddCardModal({ onAdd, onClose }: AddCardModalProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (front.trim() && back.trim()) {
      onAdd(front.trim(), back.trim());
      setFront('');
      setBack('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Add New Card</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="front" className="block text-sm font-medium text-gray-700 mb-1">
                Front
              </label>
              <textarea
                id="front"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-1">
                Back
              </label>
              <textarea
                id="back"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                required
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Add Card
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}