import React from "react";
import styles from "./styles/_Dashboard.module.css";
import { Button, Menu, MenuItem, IconButton, Modal } from "@mui/material";
import LeaderboardScreen from "../components/DashboardModules/LeaderboardScreen";
import RecipeDashboard from "../components/DashboardModules/RecipeDashboard";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from "react-router-dom";
import { players } from "../constants/SampleLeaderboard";

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const[menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
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
        </Menu>
      </div>
      <div className={styles.body}>
        <div className={styles.recipeDashboardContainer}>
          <RecipeDashboard />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.animatedCharacterContainer}>
            Animated Character Placeholder
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
