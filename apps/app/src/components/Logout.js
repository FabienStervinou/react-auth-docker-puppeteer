
import React from 'react'
import { removeUserSession } from '../utils/common';


export const Logout = (props) => {

   const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
   }
  
  return (
      <input type="button" onClick={handleLogout} value="Logout" />
  )
}