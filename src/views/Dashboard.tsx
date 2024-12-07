import React, { useState, useEffect } from "react";
import styles from "./styles/_Dashboard.module.css";
import { Button, Menu, MenuItem, IconButton, Modal } from "@mui/material";
import LeaderboardScreen from "../components/DashboardModules/LeaderboardScreen";
import RecipeDashboard from "../components/DashboardModules/RecipeDashboard";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from "react-router-dom";
import { calculateTotalScore } from "../utils/localStorageUtils";
import AnimatedCharacter from "../components/common/AnimatedCharacter";
import characterImage from "../assets/Character/redpandaNom.png";
import characterKnife from "../assets/Character/redpandaKnife.png";
import characterCry from "../assets/Character/redpandaCry.png";

interface Player {
  id: number;
  name: string;
  score: number;
}

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [emotion, setEmotion] = useState<"knife" | "cry" | "hype">("hype");
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => setMenuAnchor(null);
  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  // Fetch updated leaderboard data
  const fetchLeaderboardData = () => {
    const currentUserScore = calculateTotalScore();
    const mockPlayers: Player[] = [
      { id: 1, name: "John Doe", score: 20 },
      { id: 2, name: "Jane Smith", score: 15 },
      { id: 3, name: "Alex Johnson", score: 10 },
      { id: 4, name: "You", score: currentUserScore },
    ];

    // Sort players by score descending
    const sortedPlayers = mockPlayers.sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  useEffect(() => {
    let idleTimeoutShort: NodeJS.Timeout | null = null;
    let idleTimeoutLong: NodeJS.Timeout | null = null;

    const resetIdleTimer = () => {
      if (idleTimeoutShort) clearTimeout(idleTimeoutShort);
      if (idleTimeoutLong) clearTimeout(idleTimeoutLong);
      setEmotion("hype");
      setMessage("Cooking is your superpower! What’s next on the menu?");

      idleTimeoutShort = setTimeout(() => {
        setEmotion("cry");
        setMessage("Oh no, don’t go! The recipe isn’t done yet!");
      }, 10000);

      idleTimeoutLong = setTimeout(() => {
        setEmotion("knife");
        setMessage("I might have to use this... on some ingredients, of course!");
      }, 20000);
    };

    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("click", resetIdleTimer);
    resetIdleTimer();

    return () => {
      if (idleTimeoutShort) clearTimeout(idleTimeoutShort);
      if (idleTimeoutLong) clearTimeout(idleTimeoutLong);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("click", resetIdleTimer);
    };
  }, []);

  const emotionImages = {
    knife: characterKnife,
    cry: characterCry,
    hype: characterImage,
  };

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.headerContent}>
        <p className={styles.headerText}>Cooking Companion</p>
        <IconButton className={styles.iconButtonStyles} onClick={handleMenuOpen}>
          <PermIdentityIcon />
        </IconButton>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleNavigate("/userAccount")}>Achievements</MenuItem>
          <MenuItem onClick={() => handleNavigate("/bookmark")}>Bookmarks</MenuItem>
        </Menu>
      </div>

      <div className={styles.body}>
        <div className={styles.recipeDashboardContainer}>
          <RecipeDashboard />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.animatedCharacterContainer}>
            <AnimatedCharacter sourceImage={emotionImages[emotion]} message={message} />
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.leaderboardPreview} onClick={handleOpen}>
              <h3 className={styles.leaderboardPreviewTitle}>Leaderboard Preview</h3>
              <ul className={styles.leaderboardPreviewList}>
                {players.slice(0, 3).map((player) => (
                  <li key={player.id} className={styles.leaderboardPreviewItem}>
                    {player.name}: {player.score} pts
                  </li>
                ))}
              </ul>
              <p className={styles.leaderboardPreviewFooter}>Click to see full leaderboard</p>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className={styles.modalContent}>
          <div className={styles.contentContainer}>
            <Button className={styles.closeButton} onClick={handleClose}>
              <span className={styles.buttonText}>Close</span>
            </Button>
            <LeaderboardScreen />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
