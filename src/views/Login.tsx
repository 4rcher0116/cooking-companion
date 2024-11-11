import React from 'react'
import SignIn from '../components/LoginModules/Signin'
import styles from './styles/_Login.module.css'

const Login = () => {
  return (
    <div className={styles.mainbackground}>
      <div className={styles.blackText}>Sliding Title here</div>
      <SignIn />
    </div>
  )
}

export default Login