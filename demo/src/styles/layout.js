
import React from 'react'

import { media, air } from './theme';


// export default () => <style jsx>{`
export default () => <style jsx>{`
html, body, .demo, .layout { overflow: hidden; }
.layout {
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: auto 90% auto;
  grid-template-rows: auto 1fr auto;
}
.page {
  overflow: visible auto;
  margin-right: -50vw;
  padding-right: 50vw;
}
.header, .nav, .page, .footer {
  grid-column: 2;
  min-width: 0;
}
.bg {
  display: block;
  background: purple;
}
.header.bg, .nav.bg { grid-column: 1 / -1; }
.header { grid-row: 1; }
.nav, .page { grid-row: 2; }
.footer { grid-row: 3; }

@media ${media.up.lg} {
  .layout {
    display: grid;
    min-height: 100vh;
    width: 100%;
    grid-template-columns: 5% 20% 70% 5%;
  }
  .header, .footer { grid-column: 2 / -2; }
  .nav { grid-column: 2; }
  .nav.bg { grid-column: 1 / 3; }
  .page { grid-column: 3; }
}
`}</style>
