import React from 'react'
import SignIn from '../components/LoginModules/Signin'
import styles from './styles/_Login.module.css'
import TypewriterComponent from 'typewriter-effect'
import wavingCharacter from '../assets/Character/waving_mascot.png'

const Login = () => {
  return (
    <div className={styles.mainBackground}>
       <div className={styles.backgroundOverlay}></div>
      <div className={styles.allContentContainer}>
        <div className={styles.leftContainer}>
          <TypewriterComponent
            options={{
              autoStart: true,
              loop: false,
              delay: 75,
              cursorClassName: styles.cursorStyle
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  `<span class="${styles.animatedText}">Cooking Companion.</span>`
                )
                .pauseFor(500)
                .start();
            }}
          />

          <div>
            <img className={styles.mascotImage} src={wavingCharacter} alt='character' />
          </div>
        </div>

        <SignIn />
      </div>
    </div>
  )
}

export default Login