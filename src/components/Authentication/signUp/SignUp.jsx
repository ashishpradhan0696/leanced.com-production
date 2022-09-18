
import React, { useState ,useEffect} from 'react'
import {emailValidator,passwordValidator, confirmPasswordValidator} from "./SignUpValidation";

import {auth} from "../../../fireBaseConfig/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Button from '@mui/material/Button';
import "./signup.css";
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';



export default function SignUp({handleClose}) {

     const [loading,setLoading]=useState(false);


    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");

    //disable the button in the beginning
    const [active, setActive] = useState(true);

    //set flags to true so that no error is displayed at the beginning
    const [emailFlag,setEmailFlag]=useState(false);
    const [passwordFlag,setPasswordFlag]=useState(false);
    const [confirmPasswordFlag,setconfirmPasswordFlag]=useState(false);


   

    const handleRegister=(e)=>{
        e.preventDefault();

        setLoading(true);
        try{
            createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        // const user = userCredential.user;
                        setLoading(false);
                        // console.log(user);
                        
                        handleClose();
                
                    })
                    .catch((error) => {
                        // const errorCode = error.code;
                        // const errorMessage = error.message;
                         setLoading(false);
                        // ..
                    });
        }

        catch(err){
            console.log("Unable to register");
            console.log(err);
        }
        
    }


    //validate user email upon onBlur event
    const validateUserEmail=(e)=>{
        e.preventDefault();
        setEmailFlag(emailValidator(e.target.value));
    }

    //validate user password upon onBlur event
    const validateUserPassword=(e)=>{
        e.preventDefault();
        setPasswordFlag(passwordValidator(e.target.value));
    }

    //validate and confirm user password upon onBlur event
    const validateConfirmPassword=(e)=>{
        e.preventDefault();
        setconfirmPasswordFlag(confirmPasswordValidator(e.target.value,password));
    }

    useEffect(() => {
        //   console.log(emailFlag,passwordFlag,confirmPasswordFlag);
                if(emailFlag && passwordFlag===true && confirmPasswordFlag===true){
                    // console.log("validated");
                    setActive(false);
                }
                else{
                    setActive(true);
                }
        }, [emailFlag,passwordFlag,confirmPasswordFlag])
   
      

  return (
    <div className='register'> 
        <div className="registerWrapper">               
            <div className="registerInputItem">
                <span className='registerInputItemName'>Email</span>
                <input placeholder='abc@gmail.com' id="useremail" className='registerInput' onBlur={validateUserEmail} onChange={e=>setEmail(e.target.value)}></input>
                <span id="emailvalidationError"> Your email must be a valid email</span>
            </div>
            <div className="registerInputItem">
                <span className='registerInputItemName'>Password</span>
                <input placeholder='Axm12_Ty' type="password" id="password" className='registerInput' onBlur={validateUserPassword} onChange={e=>setPassword(e.target.value)}></input>
                <span id="passwordvalidationError"> 8-20 characters, atleast one digit, atleast one uppercase alphabet,atleast one lowercase alphabet,atleast one special character and no white spaces</span> 
            </div>
            <div className="registerInputItem">
                <span className='registerInputItemName'>Confirm Password</span>
                <input placeholder='Axm12_Ty' type="password" id="confirmPassword" className='registerInput' onBlur={validateConfirmPassword} onChange={e=>setConfirmPassword(e.target.value)}></input>
                <span id="confirmpasswordvalidationError"> Passwords don't match</span>
            </div>
            <div className="registerButton">
                 
                    <Button variant='contained'
                            style={{
                                width:330,
                                height:40,
                                backgroundColor:"black",
                                color:"white"
                            }} 
                    onClick={handleRegister} disabled={active}
                    > 
                        SIGN UP
                    </Button>
                
            </div>
            <div className="signUpLoading">
                  {loading && <LoadingSpinner/>}       
             </div>

    
        </div>
    </div>
    
  )
}
