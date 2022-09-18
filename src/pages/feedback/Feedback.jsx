import React, { useState ,useEffect,useRef}  from 'react'
import "./feedback.css";
import feedback_image from "../../assets/commonImages/feedback_image.svg";
import Navbar from '../../components/navbar/Navbar';
import emailjs from '@emailjs/browser';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Footer from '../../components/footer/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../../fireBaseConfig/firebase";
import { doc, onSnapshot } from 'firebase/firestore';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Feedback() {
    
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

        setOpen(false);
        };


    const form = useRef(); 

    const handleFormSubmit=(e)=>{

            e.preventDefault();

            emailjs.sendForm('leanced.com', 'template_oi539xs', form.current, '0fz8OU6ikK6yhYckt')
            .then((result) => {
                console.log(result.text);
                setOpen(true);
                e.target.reset();
            }, (error) => {
                console.log(error.text);
            });
  };
    

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
        <div className="feedback">
            <div className="feedbackContainer">
                <div className="feedbackContainer-Left">
                    <h1>We'd love your feedback! </h1>
                    <p>If you have any questions, suggestions or other requests, feel free to contact us!</p>
                    <img src={feedback_image} alt="Feedback image" className="feedbackImage"/>
                </div>
                <div className="feedbackContainer-Right">
                    <form ref={form} onSubmit={handleFormSubmit} className="feedbackContainerForm">
                        <div className="feedbackEmailContainer">
                            <h5>Email</h5>
                            <span><input type="email" name="user_email" className='feedbackContainerInput' required/></span>
                        </div>
                         <div className="feedbackCategoryContainer">
                            <h5>Feedback category(if any)</h5>
                            <select className='feedbackContainerInput' name='feedback_category'>
                                <option selected disabled>Select a category</option>
                                <option>Website issues</option>
                                <option>General feedback/improvement</option>
                                <option>Other</option>
                                <option>NA</option>
                            </select>
                        </div>
                        <div className="feedbackTextContainer">
                            <h5>Feedback or Message</h5>
                            <textarea className='feedbackTextContainerInput' name="message" required></textarea>
                        </div> 
                         <div className="feedbackButtonContainer">
                                
                                 <input type="submit" value="SUBMIT" className='submitButton'/>
                        </div>  
                    </form> 
                    <Stack spacing={10} sx={{ width: '100%' }}>
                                    <Snackbar anchorOrigin={{ vertical :"left", horizontal:"center" }} open={open} autoHideDuration={5000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                                Your message has been sent
                                        </Alert>
                                    </Snackbar>
                    </Stack>  
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
