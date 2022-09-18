import React , { useEffect,useState }from 'react'
import Navbar from '../../components/navbar/Navbar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import faq_whey from "../../assets/commonImages/faq_whey.jpg"
import faq_creatine from "../../assets/commonImages/faq_creatine.jpg"
import faq_fishoil from "../../assets/commonImages/faq_fishoil.jpg"
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../../fireBaseConfig/firebase";
import { doc, onSnapshot } from 'firebase/firestore';
import "./faq.css"
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

export default function Faq() {

    const navigate=useNavigate();

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
        <div className="faq">
                <div className="faqContainer">
                   
                        <div className="faqContainerHeader">
                                <div className="faqContainerHeader-title">
                                    FREQUENTLY ASKED QUESTIONS(FAQ)
                                </div>
                                <div className="faqContainerHeader-para">
                                    Do you have questions ? Well, we have the answers.
                                </div>
                        </div>

                        <div className="faqContainerContent">
                            <div className="faqContainerContent-cards">
                                    <Card sx={{ maxWidth: 300 }} onClick={()=>navigate("/faq/whey")}>
                                        <CardActionArea>
                                            <CardMedia
                                            component="img"
                                            height="140"
                                            image={faq_whey}
                                            alt="green iguana"
                                            />
                                            <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                Whey Protein
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                A high-quality source of protein naturally found in dairy.
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>

                                    <Card sx={{ maxWidth: 300 }} onClick={()=>navigate("/faq/creatine")}>
                                        <CardActionArea>
                                            <CardMedia
                                            component="img"
                                            height="140"
                                            image={faq_creatine}
                                            alt="green iguana"
                                            />
                                            <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                Creatine
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                               Creatine is a nitrogenous organic acid that helps supply energy to cells throughout the body, particularly muscle cells.
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>

                                    <Card sx={{ maxWidth: 300 }} onClick={()=>navigate("/faq/fishoil")}>
                                        <CardActionArea>
                                            <CardMedia
                                            component="img"
                                            height="140"
                                            image={faq_fishoil}
                                            alt="green iguana"
                                            />
                                            <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                Fish oil
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                               Fish oil is one of the most commonly consumed dietary supplements, which are rich in omega-3 fatty acids
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>

                            </div>
                                    
                        </div>
                    
                </div>
        </div>
        
        <Footer/>
    </>

  )
}
