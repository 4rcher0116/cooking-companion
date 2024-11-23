import React, { useState, ChangeEvent } from 'react';
import styles from './styles/_LeaderboardScreen.module.css';

interface Player {
  id: number;
  name: string;
  score: number;
}

const LeaderboardScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');

  const handleJoinLeaderboard = (): void => setModalVisible(true);
  const closeModal = (): void => setModalVisible(false);

  const handleJoin = (): void => {
    console.log('Join Code Entered:', joinCode);
    setModalVisible(false);
  };

  const handleGenerateCode = (): void => {
    const newCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    console.log('Generated Code:', newCode);
    alert(`Generated Code: ${newCode}`); // Or handle display as needed
  };

  const handleJoinCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setJoinCode(event.target.value);
  };

  const players: Player[] = [
    { id: 1, name: 'Alice', score: 120 },
    { id: 2, name: 'Bob', score: 95 },
    { id: 3, name: 'Charlie', score: 110 },
    { id: 4, name: 'David', score: 85 },
    { id: 5, name: 'Eve', score: 130 },
    { id: 6, name: 'Frank', score: 90 },
    { id: 7, name: 'Grace', score: 105 },
    { id: 8, name: 'Hank', score: 75 },
    { id: 9, name: 'Ivy', score: 115 },
    { id: 10, name: 'Jack', score: 100 },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <i className={`fas fa-trophy ${styles.headerIcon}`}></i>
      </header>
      <main className={styles.leaderboard}>
        <h1 className={styles.title}>Leaderboard</h1>
        <ul className={styles.playerList}>
          {players.map((player) => (
            <li key={player.id} className={styles.playerItem}>
              {player.name}: {player.score} points
            </li>
          ))}
        </ul>
        <button className={styles.joinButton} onClick={handleJoinLeaderboard}>
          Join Leaderboard
        </button>
      </main>
      {isModalVisible && (
        <div className={styles.modalBackground}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <h2 className={styles.modalTitle}>Join the Leaderboard</h2>
            <div className={styles.modalContent}>
              <div className={styles.inputContainer}>
                <label htmlFor="joinCode" className={styles.label}>
                  Enter Join Code:
                </label>
                <input
                  id="joinCode"
                  type="text"
                  value={joinCode}
                  onChange={handleJoinCodeChange}
                  className={styles.input}
                />
                <button className={styles.submitButton} onClick={handleJoin}>
                  Join
                </button>
              </div>
              <div className={styles.divider}></div>
              <button className={styles.generateButton} onClick={handleGenerateCode}>
                Generate Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardScreen;
