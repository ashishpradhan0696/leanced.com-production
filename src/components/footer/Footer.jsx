import React from 'react'
import "./footer.css";
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <div className='footer'>
        <div className="footerContainer">
          <div className="footerContainer-top">
              <div className="footerContainer-topLeft">
                    <div className="footer-logoContainer">
                        <h3>LEANCED</h3>
                    </div>
                    <p className="footer-descriptionContainer">
                        Leanced is an online informational platform which brings you vital key nutrition facts related to health supplements in an easily accessible way.
                    </p>
              </div>
              <div className="footerContainer-topMid">
                    <h4>QUICK LINKS</h4>
                    <ul className='usefulLinks'>
                      <Link to="/home" className='links'>Home</Link>
                      <Link to="/contact" className='links'>Feedback</Link>
                      <Link to="/faq" className='links'>FAQ</Link>
                      <Link to="/about" className='links'>About</Link>
                      <Link to="/contact" className='links'>Contact</Link>
                      <Link to="/disclaimer" className='links'>Disclaimer</Link>
                    </ul>
              </div>
              <div className="footerContainer-topRight">
                  <h4>CONTACT</h4>
                  <span><EmailIcon/><a href="mailto: ashish.pradhan0696@gmail.com" className='links'>ashish.pradhan0696@gmail.com</a></span>
                  <em>or</em> 
                 <Link to="/contact" className='links'>Reach out to me here</Link>
              </div>
          </div>
          <hr className='bottomHR'/>
           <div className="footerContainer-bottom">
                  &#169;2022 Copyright ; Leanced.com | Developed by Ashish
          </div>
        </div>
    </div>
  )
}
