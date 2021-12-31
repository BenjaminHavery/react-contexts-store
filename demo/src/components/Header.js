
import React from 'react'

import { useDispatch, useNavOpen } from 'Store'


const Header = () => {
  const dispatch = useDispatch(),
        navOpen = useNavOpen();

  console.log(navOpen)
  
  return (
    <>
      <span className='header bg'/>
      <div className='header'>
        <h1>React-Contexts-Store</h1>
        <button className='hamburger' dataOpen={navOpen} onClick={() => dispatch('toggleNav')}>=</button>
      </div>
    </>
  )
}

export default Header
