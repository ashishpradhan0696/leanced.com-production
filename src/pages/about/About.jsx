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
                // console.log(ele.data().proteins);
                setWatchList(ele.data().proteins);
                // console.log("watchlist is", watchlist);
            }
            else{
                // console.log("no items in watchlist");
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
                            Diet and a good health is an integral part of our life, and so do supplements. Lets be honest, we spend too much time searching for the right health supplement that fits our needs, be it a whey protein, fish oil or a multi vitamin, and most of the times end up in a dilemma of choosing the right product, or sometimes, its just too confusing for a beginner who has just started out his fitness journey to crawl over the internet and spend countless hours watching reviews on his/her way to decide what fits best.
                            Leanced is a platform which brings you the vital key nutrition facts related to health supplements in an easily accessible way. Leanced lets you choose a product and visualize the key nutrition facts in it, and decide for yourself which product fits your needs. 
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
