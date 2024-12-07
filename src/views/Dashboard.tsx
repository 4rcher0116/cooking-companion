import React, { useState, useEffect, useMemo } from "react";
import styles from "./styles/_Dashboard.module.css";
import { Button, Menu, MenuItem, IconButton, Modal, useMediaQuery } from "@mui/material";
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
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
    
  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
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

  const isXs = useMediaQuery('(max-width:600px)');
  const isSm = useMediaQuery('(min-width:600px) and (max-width:960px)');
  const isMd = useMediaQuery('(min-width:960px) and (max-width:1280px)');
  const isLg = useMediaQuery('(min-width:1280px) and (max-width:1920px)');
  const isXl = useMediaQuery('(min-width:1920px)');

  const viewportWidth = useMemo(() => {
    if (isXs) return 'xs';
    if (isSm) return 'sm';
    if (isMd) return 'md';
    if (isLg) return 'lg';
    if (isXl) return 'xl';
    return 'unknown';
  }, [isXs, isSm, isMd, isLg, isXl]);

   // Memoize the button style based on the viewport width
   const closeButtonStyle = useMemo(() => {
    let transformValue = 'translate(0, -100%)'; // Default transform

    switch (viewportWidth) {
      case 'xs':
        transformValue = 'translate(15%, -100%)'; // Adjust for extra small screens
        break;
      case 'sm':
        transformValue = 'translate(10%, -100%)'; // Adjust for small screens
        break;
      case 'md':
        transformValue = 'translate(-100%, -100%)'; // Adjust for medium screens
        break;
      case 'lg':
        transformValue = 'translate(-260%, -100%)'; // Adjust for large screens
        break;
      case 'xl':
        transformValue = 'translate(-380%, -100%)'; // Adjust for extra-large screens
        break;
      default:
        transformValue = 'translate(0, -100%)';
    }

    return {
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: 1000000,
      transform: transformValue,
      fontSize: '28px',
      backgroundColor: 'transparent',
      color: '#555',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, color 0.2s ease',
    };
  }, [viewportWidth]);


  return (
    <div className={styles.dashboardContent}>
      <div className={styles.headerContent}>
        <p className={styles.headerText}>Cooking Companion</p>
        <IconButton className={styles.iconButtonStyles} onClick={handleMenuOpen}>
          <PermIdentityIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigate("/userAccount")}>
            Achievements
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/bookmark")}>
            Bookmarks
          </MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </div>

      <div className={styles.body}>
        <div className={styles.recipeDashboardContainer}>
          <RecipeDashboard />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.animatedCharacterContainer}>
            <AnimatedCharacter sourceImage={emotion === "knife" ? characterKnife : emotion === "cry" ? characterCry : characterImage} message={message} />
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

      <Modal open={open} onClose={handleClose}>
        <div className={styles.modalContent}>
          <div className={styles.contentContainer}>
            <button className={styles.closeButton} onClick={handleClose}>
              Close
            </button>
            <LeaderboardScreen />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
