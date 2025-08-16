import React from 'react'
import { Outlet } from 'react-router-dom'
import Slidebarforadmin from './Slidebarforadmin'

export default function Layoutforadmin() {
  return (
  
      <div className="dashboard">
      <Slidebarforadmin /> 
      <div className="main-content">
        <Outlet /> 
      </div>
    </div>
    
  )
}
