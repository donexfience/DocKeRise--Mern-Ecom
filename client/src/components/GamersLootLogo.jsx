import React from 'react'
import LOGO from '../assets/LOGO.png'

const GamersLootLogo = () => {
  return (
<div className='flex items-center'>
    <img src={LOGO} alt='GamersLoot-logo' className='w-10 h-10 mr-2'/> {/* Adjust the width and height of the image */}
    <p className='text-xl text-violet-500 font-bold'>GamersLoot</p> {/* Adjust the font size and weight of the text */}
</div>

  )
}

export default GamersLootLogo