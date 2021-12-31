
import React from 'react'

// export default () => <style jsx>{`
export default () => <style jsx>{`
.layout {
  display: grid;
  min-height: 100vh;
  width: 100vw;
  grid-template-columns: auto 90% auto;
  grid-template-rows: auto 1fr auto;

  margin: 0;
  padding: 0;

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

@media only screen and (min-width: 800px) {
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
