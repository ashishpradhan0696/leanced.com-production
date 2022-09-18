import React from 'react'
import Footer from '../../components/footer/Footer'
import "./disclaimer.css" 


export default function Disclaimer() {
  return (
    <>
        <div className="disclaimer">
            <div className="disclaimerContainer">
                <div className="disclaimerTop">
                        <h1>DISCLAIMER</h1>
                </div>
                <div className="disclaimerBottom">
                        <p>
                            This website in no means promotes,  compares or reviews any products. 
                            The information provided by this website on <a href="https://www.leanced.com/" target="_blank" rel="noreferrer">https://www.leanced.com/</a> is for general information purposes only. All information on this site is provided in good faith as per official product information ,however we make no representation or warranty of any kind , express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site. The medical/fitness/health/other information is provided for general information and educational purposes only and is not a substitute for professional advice.
                            Under no circumstances, shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance of any information provided on 	the site. Your use of the site and your reliance on any information on the site is solely at your own risk.

                        </p>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
