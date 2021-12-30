
import React from 'react'
import { usePage } from 'Store';


const Page = () => {
  const { title, Component } = usePage();
  return (
    <>
      <h2>{ title }</h2>
      <Component/>
    </>
  )
}

export default Page;
