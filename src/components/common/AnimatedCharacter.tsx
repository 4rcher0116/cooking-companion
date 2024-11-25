import TypewriterComponent from "typewriter-effect";
import styles from "./styles/_AnimatedCharacter.module.css";

type AnimatedCharacterProps = {
  sourceImage: string | undefined;
  message: string;
};

const AnimatedCharacter = ({
  sourceImage,
  message,
}: AnimatedCharacterProps) => {
  return (
    <div className={styles.mascotContainer}>
      <img className={styles.mascotImage} src={sourceImage} alt="character" />
      <div className={styles.iconBorder}>
        <div className={styles.bottomLeft}></div>
        <div className={styles.bottomRight}></div>
        <div className={styles.textContainer}>
          <TypewriterComponent
            options={{
              autoStart: true,
              loop: false,
              delay: 75,
              cursorClassName: styles.speechBubbleCursor,
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1500)
                .typeString(
                  `<span class="${styles.speechBubbleTypography}">${message}</span>`
                )
                .pauseFor(500)
                .start();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedCharacter;
