
import React from 'react'

import { media } from './theme'


// export default () => <style jsx>{`
export default () => <style jsx>{`
.nav {
  color: white;
  margin: 0;
  padding: 0;
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.nav.bg {
  background: red;
}
.nav.open { transform: translateX(0%) }

@media ${media.up.lg} {
  .nav {
    transform: none !important;
    transition: none;
  }
}
`}</style>
