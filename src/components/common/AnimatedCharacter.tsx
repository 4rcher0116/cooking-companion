import TypewriterComponent from "typewriter-effect";
import styles from "./styles/_AnimatedCharacter.module.css";
import { ReactNode } from "react";
import CookieIcon from "@mui/icons-material/CookieOutlined";
import IcecreamIcon from "@mui/icons-material/IcecreamOutlined";
import LocalPizzaIcon from "@mui/icons-material/LocalPizzaOutlined";
import LunchDiningIcon from "@mui/icons-material/LunchDiningOutlined";

type AnimatedCharacterProps = {
  sourceImage: string | undefined;
  message: string;
  messageClassName?: string; // Add the optional prop for dynamic styling
};

const AnimatedCharacter = ({
  sourceImage,
  message,
  messageClassName, // Destructure messageClassName
}: AnimatedCharacterProps) => {
  return (
    <div className={styles.mascotContainer}>
      <img className={styles.mascotImage} src={sourceImage} alt="character" />
      <IconBorder>
        <div className={styles.textContainer}>
          <TypewriterComponent
            key={message}
            options={{
              autoStart: true,
              loop: false,
              delay: 75,
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1500)
                .typeString(
                  `<span class="${styles.speechBubbleTypography} ${messageClassName || ""}">${message}</span>`
                )
                .pauseFor(500)
                .start();
            }}
          />
        </div>
      </IconBorder>
    </div>
  );
};

type IconBorderProps = {
  children: ReactNode;
};

const IconBorder = ({ children }: IconBorderProps) => {
  return (
    <div className={styles.iconBorder}>
      {/* Top-left corner */}
      <CookieIcon className={`${styles.cornerIcon} ${styles.topLeft}`} />

      {/* Top-right corner */}
      <LocalPizzaIcon className={`${styles.cornerIcon} ${styles.topRight}`} />

      {/* Bottom-left corner */}
      <LunchDiningIcon className={`${styles.cornerIcon} ${styles.bottomLeft}`} />

      {/* Bottom-right corner */}
      <IcecreamIcon className={`${styles.cornerIcon} ${styles.bottomRight}`} />

      {/* Inner content */}
      {children}
    </div>
  );
};

export default AnimatedCharacter;
