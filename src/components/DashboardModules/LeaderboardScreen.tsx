import React, { useState, ChangeEvent, useEffect } from 'react';
import styles from './styles/_LeaderboardScreen.module.css';
import { calculateTotalScore } from '../../utils/localStorageUtils';

interface User {
  id: number;
  name: string;
  achievements: number;
}

const LeaderboardScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');
  const [user, setUser] = useState<User>({ id: 15, name: 'You', achievements: 0 });
  const [users, setUsers] = useState<User[]>([]);

  // Function to fetch and update user and leaderboard data
  const fetchLeaderboardData = () => {
    const currentUser: User = {
      id: 15,
      name: 'You',
      achievements: calculateTotalScore(),
    };
    setUser(currentUser);

    // Mock users data (replace with actual API call if needed)
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', achievements: 20 },
      { id: 2, name: 'Jane Smith', achievements: 15 },
      { id: 3, name: 'Alex Johnson', achievements: 10 },
    ];

    setUsers(mockUsers);
  };

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  // Combine and sort users by achievements in descending order
  const sortedUsers = [...users, user].sort((a, b) => b.achievements - a.achievements);

  return (
    <div className={styles.leaderboardContainer}>
      <h1 className={styles.leaderboardTitle}>🏆 Leaderboard 🏆</h1>
      <div className={styles.headerRow}>
        <div className={`${styles.headerText} ${styles.rankHeader}`}>Rank</div>
        <div className={`${styles.headerText} ${styles.nameHeader}`}>Player Name</div>
        <div className={`${styles.headerText} ${styles.scoreHeader}`}>Score</div>
      </div>
      {sortedUsers.map((player, index) => {
        const rank = index + 1;
        return (
          <div key={player.id} className={styles.playerRow}>
            <div className={styles.rankContainer}>
              {/* Display medal icons for the top 3 ranks */}
              {rank === 1 && <span className={styles.goldMedal}>🥇</span>}
              {rank === 2 && <span className={styles.silverMedal}>🥈</span>}
              {rank === 3 && <span className={styles.bronzeMedal}>🥉</span>}
              {rank > 3 && <div className={styles.rank}>{rank}</div>}
            </div>
            <div className={styles.playerName}>
              {player.name} {player.id === user.id ? '(me)' : ''}
            </div>
            <div className={styles.playerScore}>{player.achievements}</div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardScreen;
