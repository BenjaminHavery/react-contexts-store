
import React from 'react'

import slugify from 'Util/slugify'

import Demo1 from 'Pages/Demo1'
import Demo2 from 'Pages/Demo2/index'
import Demo3 from 'Pages/Demo3/index'
import Demo4 from 'Pages/Demo4/index'


export default [
  {
    title: 'Home',
    slug: false,
    Component: () => (
      <>
        <h1>react-contexts-store</h1>
        <p>This is a tiny library of helper functions for creating performant React stores from simple syntax.</p>
        <p>It uses native hooks exclusively under the hood, no globals, but overcomes the well documented performance optimisation headaches attached to every other "context-store" Redux alternative I've seen.</p>
        <p>Optionally it provides extended store functionality, in the form of stable computed value selectors and dispatchable methods that allow action batching and/or async functionality.</p>
      </>
    ),
  },
  ...[
    Demo1,
    Demo2,
    Demo3,
    Demo4,
  ].map(p => ({
    ...p,
    slug: slugify(p.title),
  })),
]
