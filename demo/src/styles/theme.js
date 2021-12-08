
import React from 'react'

// export default () => <style>{`
export default () => <style jsx>{`
body {
  max-width: 1000px;
  padding: 30px;
  margin: 0 auto;
  font-family: sans-serif;
  line-height: 1.4
}

pre {
  background: black;
  opacity: 0.8;
  color: white;
  font-family: monospace;
  padding: 15px;
  overflow-x: auto;
}

p, pre {
  margin: 0 0 10px;
}

ol, ul {
  margin: 10px 0;
  padding-left: 1rem;
}
li {
  margin: 0 0 10px;
}

h1, h2, h3, h4 {
  font-weight: bold;
  margin: 20px 0 10px;
  line-height: 1;
}
h1 {
  font-size: 36px;
}
h2 {
  font-size: 26px;
}
h3 {
  font-size: 20px;
}

b { font-weight: bold; }
em { font-style: italic; }

table {
  width: 100%;
  text-align: left;
}
table, tr, td, th { border-collapse: collapse; }
th, td {
  border: 2px solid black;
  padding: 5px;
}
th {
  font-weight: bold;
}

`}</style>
