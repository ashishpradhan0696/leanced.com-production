import React from 'react'
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Avatar } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../fireBaseConfig/firebase';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



const useStyles=makeStyles({
    container:{
      width:300,
      padding:25,
      height:"100%",
      display:"flex",
      flexDirection :"column"
    },
    profile :{
      flex:1,
      display: "flex",
      flexDirection: "column",
      alignItems:"center",
      gap:"20px",
      height:'92%'
    },
    picture:{
      width:100,
      height:100,
      cursor:"pointer",
      backgroundColor: "black",
      objectFit: "contain"
    },
    logout:{
      height: "8%",
      width:"100%",
      backgroundColor:"black",
      marginTop:20 
    },
    watchlist:{
      flex:1,
      width:"100%",
      backgroundColor:"whitesmoke",
      borderRadius:5,
      padding: 15,
      display:"flex",
      flexDirection :"column",
      alignItems :"center",
      gap:12,
      overflowY :"scroll"
    },
    proteinList:{
      fontSize:13,
      fontWeight:"500",
      backgroundColor:"rgb(121, 116, 116)",
      padding: 6,
      border: "1px solid rgb(222, 218, 218)" ,
      borderRadius:3,
      color:"white",
      width:"100%",
      display: "flex",
      justifyContent:"space-evenly",
      alignItems:"center"
    }
  })





export default function UserProfile({user,watchlist}) {
  

  const navigate=useNavigate();

  const classes=useStyles();
  const [state, setState] = React.useState({
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    
  };


  //logout functionality
  const logOut=async()=>{
    try{
      await signOut(auth);
      toggleDrawer();
     // window.location.reload(true);   //to reload the page in order to display "Add to watchlist" instead of "remove" upon logout
      navigate("/home");
    }
    catch(error){
      console.log(error);
      console.log("unable to sign out")
    }

    // signOut(auth);
    // setLogoutSuccess(true);
    // toggleDrawer();   //close the side drawer upon logout
    
  }
 


  const removeFromWatchList=async (ele)=>{
        
        const proteinRef=doc(db,"proteinwatchlist", user.uid);
       
        
        try{
            await setDoc(proteinRef,
                    {proteins: watchlist.filter((element)=>element!==ele)},
                    {merge:"true"}
                )
            }
            catch(error){
                console.log(error);
                console.log("unable to add to watchlist");
            }    
    }


  return (
    <div>

      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Avatar 
          onClick={toggleDrawer(anchor, true)} 
          styles={{height:38,width:38,cursor:"pointer"}}
          src={user.photoURL}
          alt={user.displayName || user.email}
          />


          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className={classes.container}>
                <div className={classes.profile}>
                        <Avatar 
                        className={classes.picture}
                          src={user.photoURL}
                          alt={user.displayName || user.email}
                        />
                        <span
                        style={{
                          width:"100%",
                          fontSize:25,
                          textAlign:"center",
                          fontWeight:"bolder",
                          wordWrap: "break-word"
                        }}

                        >
                          {user.displayName || user.email}
                        </span>
                        <div className={classes.watchlist}>
                            <span style={{fontSize:15, fontWeight:700}}>
                              Watchlist
                            </span>
                            
                              { watchlist && watchlist.map((ele)=>(
                                <div className={classes.proteinList}>
                                  <span > {ele}  </span>
                                  
                                  <span>
                                    <DeleteOutlineOutlinedIcon style={{cursor:"pointer" ,fontSize:15}} onClick={()=>removeFromWatchList(ele)}/> 
                                  </span>
                                

                                </div>  
                              ))
                              } 
                            
                        </div>

                </div>
                <Button
                  variant="contained"
                  className={classes.logout}
                  onClick={logOut}
                  >
                  Logout
                </Button>
                
            </div>
          </SwipeableDrawer>
           
        </React.Fragment>    

      ))}
    
    </div>
  );
}



