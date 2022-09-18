import React, { useState ,useEffect}  from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./creatineFaq.css";
import creatineSVG from "../../assets/commonImages/creatineFaq_image.svg";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../../fireBaseConfig/firebase";
import { doc, onSnapshot } from 'firebase/firestore';



export default function CreatineFaq() {

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
    <div className='creatinefaq'>
      <div className="creatineFaqContainer">

        <div className="creatineFaqContainer-header">
            <div className="creatineFaqContainer-header-title">
                <span className='faq-title'>FAQ</span>
                <span className='faq-para'>Few things to know about <span className='faq-label'> creatine </span></span>
            </div>
            <div className="creatineFaqContainer-header-image">
                <img src={creatineSVG} alt="Creatine FAQ image"  className="header-image"/>
            </div>
        </div>
        <div className="creatineFaqContainer-content">
                <Accordion style={{ width: "80%", margin:"auto"}}  >
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>What is creatine?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    Creatine (Cr) is a naturally occurring amino compound found in the human body that helps supply energy to cells throughout the body, particularly muscle cells. 

                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ width: "80%",margin: "auto" }}>
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>What does creatine do?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                        They are great for improving strength and building stamina. Creatine supplies energy to your muscles .The body stores creatine primarily in muscle cells in the form of phosphocreatine that your body uses as fuel when you perform any high-intensity activities
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ width: "80%",margin: "auto" }}>
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>Where is creatine found?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                        About half is produced in the body itself , and the rest comes from your diet from foods such as milk, red meat and seafood , and also from creatine supplement
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ width: "80%",margin: "auto" }}>
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>Why take creatine supplement ,if body already produces it by itself?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                        Although you can obtain creatine naturally from some foods such as meat and fish, the body is only capable of synthesizing about one gram of creatine per day. When you are involved in intense activities, the creatine levels in the body start receding and they cannot be replenished just by your daily diet. This is why many athletes take creatine in supplement form.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ width: "80%",margin: "auto"  }}>
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>Who should take creatine?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    Professional and amateur athletes at all levels have been known to take creatine supplements to aid their workout routines and improve workout recovery.
Most people who use creatine supplements are male athletes and are mostly involved in power sports, such as football, wrestling, hockey ,bodybuilding or fitness enthusiasts


                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ width: "80%",margin: "auto" }}>
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>Benefits of creatine?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    • Accelerates muscle growth process
• Is great for post workout recovery
• Reduces fatigue and tiredness
• Aids in gaining lean muscle mass
• Improves athletic performance, strength, and stamina



                    </Typography>
                    </AccordionDetails>
                </Accordion>




                <Accordion style={{ width: "80%",margin: "auto"  }}>
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>What should I keep in mind while taking a creatine supplement?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    Don't overdose creatine in search of crazy muscle growth. That won't happen.
                    You should drink atleast 3-5 litres of water per day, while using creatine to avoid dehydration.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ width: "80%",margin: "auto" }}>
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>How much creatine should you take per day?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    There is no established dose. Many different dosages of creatine supplements have been used in studies. For athletic performance, some people start with 10 grams to 20 grams of creatine a day which is typically divided into four 5-gram servings throughout the day. (loading phase) .
This is typically followed by a maintenance dose of 2 grams to 5 grams of creatine a day (maintenance phase)


                    </Typography>
                    </AccordionDetails>
                </Accordion>

               
         </div>
      
      </div>

    </div>
    <Footer/>
    </>
  )
}
