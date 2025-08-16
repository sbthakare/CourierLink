import React from 'react'
import Slidebarforemployee from './Slidebarforemployee'
import { Outlet } from 'react-router-dom'

export default function LayoutforEmployee() {
  return (
    <div className="dashboard">
      <Slidebarforemployee /> 
      <div className="main-content">
        <Outlet /> 
      </div>
    </div>
  )
}
