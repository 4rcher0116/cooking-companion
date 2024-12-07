// src/views/Leaderboard.tsx

import React from 'react';
// import 'src/Leaderboard.css';  // Import the CSS file for styling

const Leaderboard = () => {
  const users = [
    { name: 'John Doe', score: 100 },
    { name: 'Jane Smith', score: 90 },
    { name: 'Alice Johnson', score: 80 },
    { name: 'Bob Brown', score: 70 },
    { name: 'Charlie Davis', score: 60 },
  ];

  return (
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
  );
};

export default Leaderboard;
