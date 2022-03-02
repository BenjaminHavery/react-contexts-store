
import React from 'react'

import { media } from './theme';

// export default () => <style jsx>{`
export default () => <style jsx>{`
.header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}
.header.bg {
  background: blue;
}
.hamburger {
  flex: 0 0 auto;
}

@media ${media.up.lg} {
  .hamburger {
    display: none;
  }
}
`}</style>
