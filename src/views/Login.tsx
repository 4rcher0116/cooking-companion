import React from 'react'
import SignIn from '../components/LoginModules/Signin'
import styles from './styles/_Login.module.css'

const Login = () => {
  return (
    <div className={styles.mainbackground}>
      <SignIn />
    </div>
  )
}

export default Login