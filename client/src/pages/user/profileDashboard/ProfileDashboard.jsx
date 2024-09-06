import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileSideNavbar from './sideNavbar/ProfileSideNavbar'

const ProfileDashboard = () => {
  return (
    <div className='flex  py-20 lg:px-9 bmin-h-screen bg-white'>
        <ProfileSideNavbar/>
        <Outlet/>
    </div>
  )
}

export default ProfileDashboard