
import React from 'react'

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

@media only screen and (min-width: 800px) {
  .hamburger {
    display: none;
  }
}
`}</style>
