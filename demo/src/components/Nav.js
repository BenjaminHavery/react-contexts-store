
import React from 'react'

import { usePages, useDispatch } from 'Store';


const Nav = () => {
  const pages = usePages(),
        dispatch = useDispatch();
  
  return (
    <ul>
      { pages.map(page => (
        <li key={page.slug} onClick={() => dispatch({ type: 'setPage', page })}>{ page.title }</li>
      ))}
    </ul>
  )
}

export default Nav;
