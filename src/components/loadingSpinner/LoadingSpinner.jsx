import React from 'react'
import loading from "./loading.gif";
import "./loadingSpinner.css"; 

export default function LoadingSpinner() {
  return (
    <>
            <div className='loadingSpinner'>
                 <img alt="loading.." src={loading} ></img>   
            </div>     
    </>
  )
}
