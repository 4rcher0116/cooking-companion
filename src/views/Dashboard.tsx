import React from "react";
import styles from "./styles/_Dashboard.module.css";
import { Button, Icon, IconButton, Modal } from "@mui/material";
import LeaderboardScreen from "../components/DashboardModules/LeaderboardScreen";
import RecipeDashboard from "../components/DashboardModules/RecipeDashboard";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.headerContent}>
        <p className={styles.headerText}>Cooking Companion</p>
        <IconButton className={styles.iconButtonStyles}
          onClick={()=> {navigate("/userAccount")}}>
          <PermIdentityIcon></PermIdentityIcon></IconButton>
      </div>
      <div className={styles.body}>
        <div className={styles.recipeDashboardContainer}>
          <RecipeDashboard />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.animatedCharacterContainer}>
            Animated Character Placeholder
          </div>
          <div>
            <Button onClick={handleOpen}>Open Leadrboard</Button>
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
