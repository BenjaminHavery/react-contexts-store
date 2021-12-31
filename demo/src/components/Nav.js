
import React, { useMemo } from 'react'

import { useDispatch, usePages, useNavOpen } from 'Store';


const Nav = () => {
  const dispatch = useDispatch(),
        pages = usePages(),
        open = useNavOpen();
        
  const className = useMemo(() => {
          const c = ['nav'];
          if (open) c.push('open');
          return c.join(' ');
        }, [open]),
        background = useMemo(() => `bg ${className}`, [className]);
  
  return (
    <>
      <span className={background}/>
      <ul {...{ className }}>
        { pages.map(page => (
          <li
            key={page.slug}
            onClick={() => dispatch({ type: 'setPage', page })}
          >{ page.title }</li>
        ))}
      </ul>
    </>
  )
}

export default Nav;
