import React from 'react';
import { getUser } from '../utils/common';


export const Home = (props) => {

  const user = getUser()

  return (
    <div>
      Welcome home <i>{user.email}</i> !
    </div>
  )
}