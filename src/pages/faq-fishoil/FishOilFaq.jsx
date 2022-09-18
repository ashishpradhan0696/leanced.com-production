import React, { useState ,useEffect}  from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./fishOilFaq.css";
import fishoilSVG from "../../assets/commonImages/fishoilFaq_image.svg";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../../fireBaseConfig/firebase";

import { doc, onSnapshot } from 'firebase/firestore';


export default function FishOilFaq() {

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
                //console.log("no items in watchlist");
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
    <div className='fishoilfaq'>
      <div className="fishoilFaqContainer">

        <div className="fishoilFaqContainer-header">
            <div className="fishoilFaqContainer-header-title">
                <span className='faq-title'>FAQ</span>
                <span className='faq-para'>Few things to know about <span className='faq-label'> fish oil </span></span>
            </div>
            <div className="fishoilFaqContainer-header-image">
                <img src={fishoilSVG} alt="Fish oil FAQ image"  className="header-image"/>
            </div>
        </div>
        <div className="fishoilFaqContainer-content">
                <Accordion style={{ width: "80%", margin:"auto"}}  >
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>What is fish oil?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    Fish oil is one of the most commonly consumed dietary supplements. Fish oil is the oil derived from the tissues of oily fish. It contains the omega-3 fatty acids eicosapentaenoic acid (EPA) and docosahexaenoic acid (DHA).

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
                    <Typography style={{fontWeight:"600", color:"grey"}}>What are Omega 3 fatty acids?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                       Omega-3 fatty acids are a family of important fats that you must obtain from your diet. These play important roles in your body and may provide a number of health benefits
The three most important types are ALA (alpha-linolenic acid), DHA (docosahexaenoic acid), and EPA (eicosapentaenoic acid). ALA is mainly found in plants, while DHA and EPA occur mostly in animal foods and algae.

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
                    <Typography style={{fontWeight:"600", color:"grey"}}>How do I complete my intake of these fatty acids?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                        As your body cannot produce them on its own, you must get them from your diet. Common foods that are high in omega-3 fatty acids include fatty fish, fish oils, flax seeds, chia seeds, flaxseed oil, and walnuts.
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
                    <Typography style={{fontWeight:"600", color:"grey"}}>How is fish oil made?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                        Fish oil is the fat or oil that’s extracted from fish tissue.
It usually comes from oily fish such as herring, tuna, anchovies, and mackerel. However, it’s also sometimes produced from the livers of other fish, as is the case with cod liver oil.

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
