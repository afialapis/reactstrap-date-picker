import React from 'react'

const InputOverlay = ({oid, overlayContainerRef, children}) =>
  <div   
    ref       = {overlayContainerRef}
    id        = {oid}
    className = 'rdp-overlay'>
    {children}
  </div>

export  {InputOverlay}
