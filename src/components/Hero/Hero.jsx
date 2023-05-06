import React from 'react'
import QUOTES from '../../assets/QUOTES'

const Hero = () => {
  
  const randomNo = Math.ceil(Math.random()* QUOTES.length-1) 
  const singleQuote = QUOTES[randomNo]
  
  return (
    <div className='main_hero'>
      <div>
        <p>Investment Tracker</p>
      </div>
      <h1>{singleQuote}</h1>
    </div>
  )
}

export default Hero