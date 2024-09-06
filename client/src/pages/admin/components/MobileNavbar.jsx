import React, { useState } from 'react'

const MobileNavbar = () => {
    const [showSideNavbar,setShowSideNavbar]=useState(false);
    const toggleSideNavbar=()=>{
        setShowSideNavbar(!showSideNavbar);
    }
  return (
    <div className='lg:hidden p-5 shadow-lg z-10 flex items-center justify-between'></div>
  )
}

export default MobileNavbar