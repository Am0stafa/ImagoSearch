import React from 'react'
import './Loading.css'


export const Loading = () => {
  return (
    <div>
      <div className="loading wave">
        Loading
      </div>
      <div className="loading loading-2 wave wave-2">
        <div className="ff">Almost there getting all similar images</div>
        <div className="loading-2-text" />
      </div>
    </div>
  )
}
