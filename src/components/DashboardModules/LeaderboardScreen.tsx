import React, { useState, ChangeEvent } from 'react';
import styles from './styles/_LeaderboardScreen.module.css';
import { players } from '../../constants/SampleLeaderboard';


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

  const users = [
    { name: 'John Doe', score: 100 },
    { name: 'Jane Smith', score: 90 },
    { name: 'Alice Johnson', score: 80 },
    { name: 'Bob Brown', score: 70 },
    { name: 'Charlie Davis', score: 60 },
  ];

  return (
    <div className={styles.container}>
      {/* <header className={styles.header}>
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
      )} */}

<div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            let rankClass = '';
            if (index === 0) {
              rankClass = 'gold'; // Gold for 1st place
            } else if (index === 1) {
              rankClass = 'silver'; // Silver for 2nd place
            } else if (index === 2) {
              rankClass = 'bronze'; // Bronze for 3rd place
            }

            return (
              <tr key={index} className={rankClass}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default LeaderboardScreen;
