import React, { useState } from "react";
import SignIn from "../components/LoginModules/Signin";
import styles from "./styles/_Login.module.css";
import TypewriterComponent from "typewriter-effect";
import wavingCharacter from "../assets/Character/waving_mascot.png";

const Login = () => {
  return (
    <div className={styles.mainBackground}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.allContentContainer}>
        <div className={styles.leftContainer}>
          <h1 className={styles.title}>Cooking Companion</h1> {/* Static title */}
          <div className={styles.mascotContainer}>
            <img
              className={styles.mascotImage}
              src={wavingCharacter}
              alt="character"
            />
            <div className={styles.speechBubblePrompt}>
              <TypewriterComponent
                options={{
                  autoStart: true,
                  loop: false,
                  delay: 75,
                  // cursorClassName: showCursor ? styles.speechBubbleCursor : styles.cursorHidden, // Conditionally apply cursor class
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      `<span class="${styles.speechBubbleTypography}">Welcome Chef! Log in to begin your cooking adventure!</span>`
                    )
                    .pauseFor(500)
                    .start();
                }}
              />
            </div>
          </div>
        </div>

        <SignIn />
      </div>
    </div>
  );
};

export default Login;