import React from 'react'
import { NavLink } from 'react-router-dom'

function Error() {
  return (
    <div>404 page go to <NavLink to="/dashboard">Dashboard</NavLink></div>
  )
}

export default Error