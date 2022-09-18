import React ,{ useEffect, useState }from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import "./about.css"
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../../fireBaseConfig/firebase";
import { doc, onSnapshot } from 'firebase/firestore';


export default function About() {

    //managing state of logged in user 
        const [user,setUser]=useState(null);
         useEffect(() => {
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    setUser(user)
                }
                else{
                    setUser(null)
                }
            })
           
         }, [])
             

         const [watchlist, setWatchList]=useState([]);
         useEffect(() => {
            if(user){
            const proteinRef=doc(db,"proteinwatchlist", user.uid);
        
            var unsubscribe=onSnapshot(proteinRef,(ele)=>{
            if(ele.exists()){
                console.log(ele.data().proteins);
                setWatchList(ele.data().proteins);
                console.log("watchlist is", watchlist);
            }
            else{
                console.log("no items in watchlist");
            }
        });

        return()=>{
            unsubscribe();
        }
      }

      
    }, [user])


  return (
    <>
    <Navbar user={user} watchlist={watchlist}/>
        <div className="about">
            
                <div className="aboutContainer">
                    
                    <div className="aboutDescription">
                          <span> <em style={{color:"black", fontSize:"18px"}}>How many standard apples should a standard human eat to get a standard dose of Vitamin C ? </em> <br/>
                            <span style={{color:"black"}}>Not easy, right ? </span><br/>
                            Lets be honest, we spend too much time on the nutrition facts searching for the perfect supplement , and most of the time we don’t find it that easily either. 
                            Leanced is a platform which brings you the vital key nutrition facts related to health supplements in an easily accessible and efficient way , so you don’t have to do.
                            <br></br>
                            <span style={{color:"red"}}>*</span> This website currently provides information for only whey proteins , and we plan to add more health supplements as we move ahead.

                        </span>
                    </div>
                    <div className="aboutTitle">
                            <h1>ABOUT</h1>
                    </div>
                  
                </div>
            
        </div>
        <Footer/>
    </>
  )
}
