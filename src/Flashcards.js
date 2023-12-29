import React, { useState, useEffect } from 'react';
import styles from './styles/flashcards.module.scss';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [flippedStates, setFlippedStates] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/cards')
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
    console.log(`Edit clicked for card with id: ${cardId}`);
  };

  const handleDelete = (cardId) => {
    console.log(`Delete clicked for card with id: ${cardId}`);
  };

  const handleAddFlashcard = () => {
    if ((newQuestion || newAnswer) && (newQuestion !== newAnswer)) {
      const isImageLink = (input) => {
        return input.startsWith('http') || /\.(jpeg|jpg|gif|png)$/i.test(input);
      };

      const newFlashcard = {
        front: {
          content: newQuestion,
          type: isImageLink(newQuestion) ? 'image' : 'text',
        },
        back: {
          content: newAnswer,
          type: isImageLink(newAnswer) ? 'image' : 'text',
        },
        updateDate: new Date().toISOString(),
        status: 'Learned', 
      };

      fetch('http://localhost:3001/cards', {
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
          fetch('http://localhost:3001/cards')
            .then((response) => response.json())
            .then((data) => {
                setFlashcards(data);
                setFlippedStates(Array(data.length).fill(false));
            })
            .catch((error) => console.error('Error fetching flashcards:', error));
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
          <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
        </label>
        <label>
          Back Content (Answer or Information or Image URL):
          <input type="text" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
        </label>
        <button onClick={handleAddFlashcard}>Add Flashcard</button>
      </form>
  </div>
  );
};

export default Flashcards;
