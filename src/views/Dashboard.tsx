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
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [emotion, setEmotion] = React.useState<"knife" | "cry" | "hype">("hype");
  const [message, setMessage] = React.useState("");

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
