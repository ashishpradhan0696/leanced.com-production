import React from 'react'
import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup  } from "firebase/auth";
import {auth} from "../../../fireBaseConfig/firebase";
import {emailValidator} from "./loginValidation";
import "./login.css";
import GoogleButton from "react-google-button";
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';
import Button from '@mui/material/Button';


export default function Login({handleClose}) {
   const [email,setEmail]= useState("");
   const [password,setPassword]= useState("");
  
   const [loading,setLoading]=useState(false);
   const [error, setError] = useState(false); 

   
   //set emailFlag=true when entered email matches with regex pattern
   const [emailFlag,setEmailFlag]=useState(false);

 
//    const [emptyFieldAlert,setEmptyFieldAlert] =useState(false);

    //validate user email upon onBlur event
    const validateUserEmail=(e)=>{
        e.preventDefault();
        setEmailFlag(emailValidator(e.target.value));
    }

  
//login with email
    const handleLogin=(e)=>{
        e.preventDefault();
        
        if(emailFlag===true){
            console.log("proceed further");
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                setError(false);
                setLoading(false);
               
                handleClose();
            })
            .catch((error) => {
                setLoading(false);
                setError(true);
                // const errorCode = error.code;
                // const errorMessage = error.message;
            });

        }
        else{
            console.log("not allowed");
        }

    }


    const googleProvider= new GoogleAuthProvider();

    //handle Google signIn
     const signInWithGoogle=()=>{
        signInWithPopup(auth,googleProvider).then((res)=>{
            console.log("login successful")
             handleClose();
        }).catch(error=>{
        console.log(error);
        console.log("not successful")
     })

    }


    return (
    <>
    <div className='login'> 
     <form>
        <div className="loginWrapper">  
            <div className="loginInputItem">
                <span className='loginInputItemName'>Email</span>
                <input placeholder='abc@gmail.com' id="useremail" className='loginInput' required onBlur={validateUserEmail} onChange={e=>setEmail(e.target.value)}></input>
                <span id="emailvalidationError">Hmm..That doesn't look like a email-address</span> 
                
            </div>
            <div className="loginInputItem">
                <span className='loginInputItemName'>Password</span>
                <input placeholder='Axm12_Ty' type="password" id="password" className='loginInput' required onChange={e=>setPassword(e.target.value)}></input>
                {error && <span className='loginError'>Incorrect email ID or password</span>}
               
            </div>
         
            
            <div className="loginButton">
                <Button variant='contained'
                        style={{
                            width:330,
                            height:40,
                            backgroundColor:"black",
                           
                        }} 
                    onClick={handleLogin}
                > 
                    Login
                </Button>
            </div>
            <span>OR</span>
            <div className="googleButton">
                <GoogleButton
                style={{width:"100%", outline:"none"}}
                onClick={signInWithGoogle}
                />
            </div> 
             <div className="loginLoading">
                  {loading && <LoadingSpinner/>}       
             </div>
        </div>
        </form>
     
    </div>
    </>
  )
}
