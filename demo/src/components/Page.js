
import React from 'react'
import { usePage } from 'Store';


const Page = () => {
  const { title, Component } = usePage();
  return (
    <div className='page'>
      <h2>{ title }</h2>
      <Component/>
    </div>
  )
}

export default Page;
