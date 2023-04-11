import React from 'react'

const InputOverlay = ({overlayContainerRef, children}) =>
  <div   
    ref       = {overlayContainerRef}
    className = 'rdp-overlay'>
    {children}
  </div>

export  {InputOverlay}
