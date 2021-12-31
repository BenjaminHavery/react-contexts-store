
import React from 'react'

// export default () => <style jsx>{`
export default () => <style>{`
body {
  font-family: sans-serif;
  line-height: 1.4
}

pre {
  background: black;
  opacity: 0.8;
  color: white;
  font-family: monospace;
  padding: 15px;
  word-wrap: normal;
  overflow-x: auto;
  white-space: pre;
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
  display: block;
  width: 100%;
  overflow: auto;
  text-align: left;
  margin: 0 0 10px;
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
