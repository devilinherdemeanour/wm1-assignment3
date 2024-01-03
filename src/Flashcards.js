import React, { useState, useEffect } from 'react';
import styles from './styles/flashcards.module.scss';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [flippedStates, setFlippedStates] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingCardId, setEditingCardId] = useState(null);
  const [editedFrontContent, setEditedFrontContent] = useState('');
  const [editedBackContent, setEditedBackContent] = useState('');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/cards')
      .then((response) => response.json())
      .then((data) => {
        setFlashcards(data);
        setFlippedStates(Array(data.length).fill(false));
      })
      .catch((error) => console.error('Error fetching flashcards:', error));
  }, []);

  const handleFlip = (index) => {
    setFlippedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleEdit = (cardId) => {
    setEditingCardId(cardId);
    const cardToEdit = flashcards.find((card) => card.id === cardId);
    setEditedFrontContent(cardToEdit.front.content);
    setEditedBackContent(cardToEdit.back.content);
  };

  const handleSaveEdit = () => {
    if (editingCardId) {
      fetch(`http://localhost:3000/cards/${editingCardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          front: { content: editedFrontContent, type: 'text' },
          back: { content: editedBackContent, type: 'text' },
        }),
      })
        .then((response) => response.json())
        .then(() => {
          setFlashcards((prevFlashcards) =>
            prevFlashcards.map((card) =>
              card.id === editingCardId
                ? {
                    ...card,
                    front: { content: editedFrontContent, type: 'text' },
                    back: { content: editedBackContent, type: 'text' },
                  }
                : card
            )
          );
          setEditingCardId(null);
        })
        .catch((error) => console.error('Error editing flashcard:', error));
    }
  };

  const handleDelete = (cardId) => {
    fetch(`http://localhost:3000/cards/${cardId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setFlashcards((prevFlashcards) =>
          prevFlashcards.filter((card) => card.id !== cardId)
        );
        setFlippedStates((prevStates) =>
          prevStates.filter(
            (state, index) => index !== flashcards.findIndex((card) => card.id === cardId)
          )
        );
      })
      .catch((error) => console.error('Error deleting flashcard:', error));
  };

  const handleAddFlashcard = () => {
    if ((newQuestion || newAnswer) && newQuestion !== newAnswer) {
      const isImageLink = (input) => input.startsWith('http') || /\.(jpeg|jpg|gif|png)$/i.test(input);

      const newFlashcard = {
        front: { content: newQuestion, type: isImageLink(newQuestion) ? 'image' : 'text' },
        back: { content: newAnswer, type: isImageLink(newAnswer) ? 'image' : 'text' },
        updateDate: new Date().toISOString(),
        status: 'Learned',
      };

      fetch('http://localhost:3000/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFlashcard),
      })
        .then((response) => response.json())
        .then((data) => {
          setFlashcards(data);
          setFlippedStates((prevStates) => [...prevStates, false]);
        })
        .catch((error) => console.error('Error adding flashcard:', error))
        .finally(() => {
          setNewQuestion('');
          setNewAnswer('');
        });
    }
  };

  return (
    <div>
      <h2>Flashcards</h2>
      <div>
        {flashcards && flashcards.length > 0 ? (
          flashcards.map((card, index) => (
            <div
              key={card.id}
              className={`${styles.flashcard} ${flippedStates[index] ? styles.flipped : ''}`}
              onClick={() => handleFlip(index)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {hovered && (
                <div className={styles.buttons}>
                  <button onClick={() => handleEdit(card.id)}>Edit</button>
                  <button onClick={() => handleDelete(card.id)}>Delete</button>
                </div>
              )}
              <div className={styles.front}>
                {card.front.type === 'image' ? (
                  <img src={card.front.content} alt="Front Image" />
                ) : (
                  <p>{card.front.content}</p>
                )}
              </div>
              <div className={styles.back}>
                {card.back.type === 'image' ? (
                  <img src={card.back.content} alt="Back Image" />
                ) : (
                  <p>{card.back.content}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading flashcards...</p>
        )}
      </div>
      <h3>Add a New Flashcard</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Front Content (Question or Image URL):
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </label>
        <label>
          Back Content (Answer or Information or Image URL):
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </label>
        <button onClick={handleAddFlashcard}>Add Flashcard</button>
      </form>
      {editingCardId && (
        <div>
          <h3>Edit Flashcard</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Edited Front Content:
              <input
                type="text"
                value={editedFrontContent}
                onChange={(e) => setEditedFrontContent(e.target.value)}
              />
            </label>
            <label>
              Edited Back Content:
              <input
                type="text"
                value={editedBackContent}
                onChange={(e) => setEditedBackContent(e.target.value)}
              />
            </label>
            <button onClick={handleSaveEdit}>Save Edit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
