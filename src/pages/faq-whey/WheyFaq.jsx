import React, { useState ,useEffect}  from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../../components/navbar/Navbar';
import "./wheyFaq.css";
import wheySVG from "../../assets/commonImages/wheyFaq_image.svg";
import Footer from '../../components/footer/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../../fireBaseConfig/firebase";
import { doc, onSnapshot } from 'firebase/firestore';


export default function WheyFaq() {

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
                //console.log("watchlist is", watchlist);
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
    <div className='wheyfaq'>
      <div className="wheyFaqContainer">

        <div className="wheyFaqContainer-header">
            <div className="wheyFaqContainer-header-title">
                <span className='faq-title'>FAQ</span>
                <span className='faq-para'>Few things to know about <span className='faq-label'> proteins </span></span>
            </div>
            <div className="wheyFaqContainer-header-image">
                <img src={wheySVG} alt="Whey FAQ image" className="header-image"/>
            </div>
        </div>
        <div className="wheyFaqContainer-content">
                <Accordion style={{ width: "80%", margin:"auto"}}  >
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>Who needs protein?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    Every human being ! Every cell in the human body contains protein. The basic structure of protein is a chain of amino acids. You need protein in your diet to help your body repair cells and make new ones
            Protein is also a critical part of the processes that fuel your energy and carry oxygen throughout your body in your blood.

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
                    <Typography style={{fontWeight:"600", color:"grey"}}>What is whey protein?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                        Like poultry, fish and eggs , whey is a "complete" protein, meaning it contains all the essential amino acids, that the human body requires for proper repair and function. This high-quality source of protein naturally found in dairy, is commonly marketed and ingested as a dietary supplement, was once considered a useless by product of cheese manufacturing
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
                    <Typography style={{fontWeight:"600", color:"grey"}}>How is whey Protein made?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                        Whey is a natural by-product from the cheese-making industry.It’s the liquid that remains when the solids in milk are pressed together to form cheese. This liquid is then filtered and purified into a powder that is high in quality protein but very low in fat.
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
                    <Typography style={{fontWeight:"600", color:"grey"}}>What are the benefits of whey protein over other proteins?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                        Whey protein has a very high nutritional value, and it is one of the best dietary sources of high quality protein. It is highly digestible and absorbed quickly compared to other proteins, and hence is widely popular among bodybuilders and athletes
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
                    <Typography style={{fontWeight:"600", color:"grey"}}>How many types of whey are there?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    There are three main types of whey protein powder:
                        concentrate (WPC)
                    isolate (WPI)
                    hydrolysate (WPH)

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
                    <Typography style={{fontWeight:"600", color:"grey"}}>What is the difference between whey protein isolate and whey protein concentrate?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    The main difference between whey isolate and concentrate is that whey isolate undergoes more processing, which results in a higher protein content with less carbohydrates, lactose and fat. Whey isolate is typically more expensive than whey concentrate . 
            While isolate is superficial in protein content, whey protein concentrate is the most economical option per gram of protein.


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
                    <Typography style={{fontWeight:"600", color:"grey"}}>Can protein help in weight loss?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    Protein is the single most important nutrient for weight loss and a better looking body, ofcourse combined with exercise . A high protein intake boosts metabolism, reduces appetite and changes several weight-regulating hormones
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
                    <Typography style={{fontWeight:"600", color:"grey"}}>How much protein do you need per day?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    The exact amount of protein you need depends on many factors including activity level, age, muscle mass, and overall health.
            As a thumb rule, you need anywhere around 0.8 -1 gm protein per Kg of your bodyweight through your diet to maintain a healthy lifestyle. However, this number differs based on your lifestyle factors like muscle building, sports activity etc

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
                    <Typography style={{fontWeight:"600", color:"grey"}}>Is there a difference between animal and plant-based proteins?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    In general, animal proteins like meat, dairy, and eggs contain all the essential amino acids. Plant-based proteins from foods like beans, grains, nuts, and soy are rich in some amino acids but may lack others

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
                    <Typography style={{fontWeight:"600", color:"grey"}}>What are amino acids?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    Amino acids are molecules used by all living things to make proteins. Your body needs 20 different amino acids to function correctly. 
            Nine of these amino acids are called essential amino acids. The rest eleven are the non-essential amino acids .
            While your body produces the 11 non-essential amino acids you need , the essential amino acids must be consumed through the food you eat like eggs, fish and whey


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
                    <Typography style={{fontWeight:"600", color:"grey"}}>What is protein?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    protein, highly complex substance that is present in all living organisms. Proteins are of great nutritional value and are directly involved in the chemical processes essential for life

                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ width: "80%",margin: "auto"}}>
                    <AccordionSummary
                    style={{backgroundColor:"whitesmoke"}}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography style={{fontWeight:"600", color:"grey"}}>What are the 9 essential amino acids?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    The 9 essential amino acids are: histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, tryptophan, and valine.
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
                    <Typography style={{fontWeight:"600", color:"grey"}}>What are the 11 non-essential amino acids?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize:"14px"}}>
                    Non-essential amino acids include alanine, arginine, asparagine, aspartic acid, cysteine, glutamic acid, glutamine, glycine, proline, serine, and tyrosine
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
