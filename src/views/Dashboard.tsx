import React from "react";
import styles from "./styles/_Dashboard.module.css";
import { Button, Menu, MenuItem, IconButton, Modal } from "@mui/material";
import LeaderboardScreen from "../components/DashboardModules/LeaderboardScreen";
import RecipeDashboard from "../components/DashboardModules/RecipeDashboard";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from "react-router-dom";
import { players } from "../constants/SampleLeaderboard";
import AnimatedCharacter from "../components/common/AnimatedCharacter";
import characterImage from "../assets/Character/redpandaNom.png";
import characterKnife from "../assets/Character/redpandaKnife.png";
import characterCry from "../assets/Character/redpandaCry.png";

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const[menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [emotion, setEmotion] = React.useState<"knife" | "cry" | "hype">("hype");
  const [message, setMessage] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();

  const handleMenuOpen = (event:React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {setMenuAnchor(null)};
  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleSignOut = () => {
    // Clear auth data (example: token stored in localStorage)
    localStorage.removeItem('authToken');
    // Redirect to login page
    window.location.href = '/';
  };


  React.useEffect(() => {
    let idleTimeoutShort: NodeJS.Timeout | null = null;
    let idleTimeoutLong: NodeJS.Timeout | null = null;

    const resetIdleTimer = () => {
      if (idleTimeoutShort) clearTimeout(idleTimeoutShort);
      if (idleTimeoutLong) clearTimeout(idleTimeoutLong);
      setEmotion("hype"); // User is active
      setMessage("Cooking is your superpower! What’s next on the menu?");

      idleTimeoutShort = setTimeout(() => {
        setEmotion("cry");
        setMessage("Oh no, don’t go! The recipe isn’t done yet!");
      }, 10000); // 10 seconds

      idleTimeoutLong = setTimeout(() => {
        setEmotion("knife"); // Long idle
        setMessage("I might have to use this... on some ingredients, of course!");
      }, 20000); // 20 seconds
    };

    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("click", resetIdleTimer);

    // Initialize timers on load
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
    hype: characterImage, // Default image when active
  };

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.headerContent}>
        <p className={styles.headerText}>Cooking Companion</p>
        <IconButton
          className={styles.iconButtonStyles}
          onClick={handleMenuOpen}
        >
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
          <MenuItem onClick={() => handleSignOut()}>
            Sign Out
          </MenuItem>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
