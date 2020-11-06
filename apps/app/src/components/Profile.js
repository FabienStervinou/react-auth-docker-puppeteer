import React from 'react'
import { getUser } from '../utils/common';

export const Profile = () => {

  const user = getUser()

  return (
    <div>
      <h3>
        Profile page 
      </h3>
      <div>
        Welcome home <i>{user.email}</i> !
      </div>
    </div>
  )
}