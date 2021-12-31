
import { useEffect, useRef } from 'react'

import { useDispatch, useRoute } from 'Store'


export default () => {

  const dispatch = useDispatch(),
        route = useRoute(),
        first = useRef(true);
  
  useEffect(() => { // Watch route
    if (first.current || window?.location?.pathname === route) { first.current = false; }
    else history.pushState({}, '', route);
  }, [route]);
  
  useEffect(() => { // Watch URL
    if (!window) return;
    const callback = () => {
      const [pageSlug, section] = (window?.location?.pathname || '').split('/').filter(s => !!s);
      dispatch({ type: 'setPage', pageSlug });
    }
    callback();
    window.addEventListener('popstate', callback);
    window.addEventListener('pushstate', callback);
    return () => {
      window.removeEventListener('popstate', callback);
      window.removeEventListener('pushstate', callback);
    }
  }, []);


  return null;
}
