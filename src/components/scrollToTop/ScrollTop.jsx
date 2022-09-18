import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "./scrollTop.css";
import { useLocation } from "react-router-dom";


export default function ScrollTop() {
    const { pathname } = useLocation();

    const scrollToTop=()=>{
        // window.scrollTo(0, 0);
          window.scrollTo({
            top:0,
            behavior: "smooth"
          });
    }
    
    
  return (
    <>  
        <div className="scrollTop" onClick={scrollToTop}>
            <div className="scrollTopContainer">
                <ArrowUpwardIcon/>
            </div>
        </div>

    </>
  )
}
