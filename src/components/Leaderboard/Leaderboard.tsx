import React, { useEffect, useState } from 'react';
import { calculateAchievementScore } from '../../components/Achievement/AchievementsUtils';
import { getAchievementProgress, setAchievementProgress } from '../../utils/localStorageUtils'; // Functions to get and set achievement progress
import { achievementsList } from '../../constants/AchievementsList'; // List of all achievements
import './Leaderboard.css'; // Optional CSS for styling

// Defining User type for mock data
interface User {
  id: number;
  name: string;
  achievements: number; // List of achievement IDs the user has completed
}

const userScore = calculateAchievementScore();
console.log(`User's total achievement score: ${userScore}`);

const Leaderboard = () => {
  const [userScore, setUserScore] = useState<number>(0); // State for storing the current user's score
  const [users, setUsers] = useState<User[]>([]); // State for storing other users in the leaderboard
  const [user, setUser] = useState<User>(); 

  // Example user data, replace with actual API or state management
  // UseEffect hook to calculate the user's score when the component is loaded
  useEffect(() => {
    // Calculate the user's score
    const currentUser: User = {
      id: 1, name: 'John Doe', achievements: 1
    }
    setUser(currentUser)


    // Fetch the leaderboard data (can be from API or mock data)
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', achievements: 1 },
      { id: 2, name: 'Jane Smith', achievements: 2 },
      { id: 3, name: 'Alex Johnson', achievements: 3 },
    ];

    setUsers(mockUsers); // Set users in the leaderboard (replace with actual API call)
  }, []);

  // Function to calculate achievement score based on the achievements the user has completed
  const calculateAchievementScore = (completedAchievements: number[]): number => {
    // Sum up the progress for each achievement
    const totalProgress = completedAchievements.reduce((acc, achievementId) => {
      const progress = getAchievementProgress(achievementId); // Get individual achievement progress from localStorage
      return acc + progress;
    }, 0);

    // Calculate average progress as the total score
    const score = totalProgress / completedAchievements.length;
    return score; // Return score as a percentage
  };

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="current-user">
        <h2>{user?.name}'s Score</h2>
        <h2>Your Achievement Score: {userScore}%</h2>
      </div>

      <h2>Other Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}: {user.achievements}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
