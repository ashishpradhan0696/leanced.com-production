import React, { useEffect, useState } from 'react'
import {useLocation, Link} from "react-router-dom";
import PieChart from '../../components/pieChart/PieChart';
import "./singleProduct.css"
import myData from "../../data/proteinDatabase.json";
import AminoAcidChart from '../../components/aminoAcidChart/AminoAcidChart';
import ProteinChart from '../../components/proteinChart/ProteinChart';
import Navbar from '../../components/navbar/Navbar';
import { Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { auth, db } from '../../fireBaseConfig/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import TimelineIcon from '@mui/icons-material/Timeline';
import tooltipClasses from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Footer from '../../components/footer/Footer';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));



export default function SingleProduct() {
    const location=useLocation();
    const currentId=location.pathname.split("/")[2];
    
    const index=myData.filter((ele,index)=>
        ele.id.toString()===currentId    
    )

    const singleData=index[0];
    //console.log(singleData);

    //managing state of logged in user 
        const [user,setUser]=useState(null);
         useEffect(() => {
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    setUser(user);
                   
                }
                else{
                    setUser(null)
                    
                }
            })
           
         }, [])



    // properties for alert(if user tries to add to watchlist)

    const [watchlist, setWatchList]=useState([]);
    const inWatchList=watchlist.includes(singleData?.name);   //true or false

    const [open, setOpen] = React.useState(false);

    const [addWatchListSuccess, setAddWatchListSuccess] = React.useState(false);
    const [removeWatchListSuccess, setRemoveWatchListSuccess] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
             return;
        }

     setOpen(false);
     setAddWatchListSuccess(false);
     setRemoveWatchListSuccess(false);
    };

    //add to watchlist functionality
     const addToWatchList= async()=>{
        if(user){
            const proteinRef=doc(db,"proteinwatchlist", user.uid);
           // console.log(user.uid);
            try{
                await setDoc(proteinRef,
                    {proteins:watchlist ? [...watchlist,singleData?.name]:[singleData?.name]}
                )
                setAddWatchListSuccess(true);
            }
            catch(error){
                console.log(error);
                console.log("unable to add to watchlist")
            }

        }
        else{
            setOpen(true);
        }
    }    


    useEffect(() => {
      if(user){
        const proteinRef=doc(db,"proteinwatchlist", user.uid);
        
        var unsubscribe=onSnapshot(proteinRef,(ele)=>{
            if(ele.exists()){
                //console.log(ele.data().proteins);
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
    

    const removeFromWatchList=async ()=>{
        
        const proteinRef=doc(db,"proteinwatchlist", user.uid);
        //console.log(user.uid);
        
        try{
            await setDoc(proteinRef,
                    {proteins: watchlist.filter((ele)=>ele!==singleData.name)},
                    {merge:"true"}
                )

                setRemoveWatchListSuccess(true);
            }
            catch(error){
                console.log(error);
                console.log("unable to add to watchlist");
            }    
    }

    //


    const [currentView,setCurrentView]=useState("You are currently viewing 'Per Serving view' .Toggle to switch to 'Per 100g view'");
    
   

   //energy calorie
    const[calorie,setCalorie]=useState(singleData.nutritionPerServing.energyPerServing);

    //nutritionBreakdownChart
    const [breakdown,setBreakdown]=useState({
        labels:["Carbohydrates(g)","Added sugar(out of carbs)(g)","Fat(g)","Protein(g)"] ,
        datasets: [{
            label:["Carbohydrates(g)","Added sugar(out of carbs)(g)","Fat(g)","Protein(g)"],
            data : [singleData.nutritionPerServing.carbsPerServing, singleData.nutritionPerServing.addedSugarPerServing,singleData.nutritionPerServing.fatsPerServing,singleData.nutritionPerServing.proteinPerServing],
            backgroundColor: [" #94e8b4", "#8f8073", " #2D3A51","#3B969B"],
            hoverOffset:2,
        }]
    })

    //aminoAcidProfileChart 
    const[aminoProfile,setAminoProfile]=useState(
        singleData.aminoAcidProfile ? 
        {
            labels:["Isoleucine(g)","Leucine(g)","Valine(g)","Lysine(g)","Methionine(g)","Phenylalanine(g)","Threonine(g)","Tryptophan(g)","Histidine(g)"] ,
            datasets: [{
                label:["Isoleucine(g)","Leucine(g)","Valine(g)","Lysine(g)","Methionine(g)","Phenylalanine(g)","Threonine(g)","Tryptophan(g)","Histidine(g)"],
                data : [singleData.aminoAcidProfile.Isoleucine, singleData.aminoAcidProfile.Leucine,singleData.aminoAcidProfile.Valine, singleData.aminoAcidProfile.Lysine, singleData.aminoAcidProfile.Methionine, singleData.aminoAcidProfile.Phenylalanine,singleData.aminoAcidProfile.Threonine,singleData.aminoAcidProfile.Tryptophan,singleData.aminoAcidProfile.Histidine],
                backgroundColor: [" #a2a77f", " #BADBCA", " #364652","#b5bec6","#e3879e","#F7DBA7","#C57B57","#f26419","#478978"],
                hoverOffset: 12, 
                
            }]      
        }
    :
       {
            labels:["Complete breakdown of 9 EAAs not provided by the brand"] ,
            datasets: [{
                label:["No data exists"],
                data : [],
                backgroundColor: ["#f9fafa"],
            }]
        }
    
    )
   
    //Protein Chart
    const[protein,setProtein]=useState({
        labels:["Serving Size/Scoop(g)", "Protein(g)"] ,
        datasets: [{
            label:[],
            data : [singleData.servingSize, singleData.nutritionPerServing.proteinPerServing],
            backgroundColor: [" #5b9279", "#3B969B"],
            hoverBorderWidth:1
        }]
    })
 
    //options for removing the dataset for bar chart, since we don't need it here 
                const proteinChartOptions= {
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        maintainAspectRatio:true ,
                        responsive: true
                    }
                
                const aminoChartOptions= {
                                plugins:{
                                    legend: {
                                        position: 'top'
                                    }
                            },
                            maintainAspectRatio:false            
                        }

                const calorieBreakdownChartOptions= {
                    plugins:{
                        legend: {
                            position: 'top'
                        }
                 },
                 maintainAspectRatio:true  ,
                  responsive: true          
            }

    const breakdownHundred=(num)=>{
        return ((num/singleData.servingSize)*100).toFixed(2);
    }   

    const aminoHundred=(num)=>{
        return ((num/singleData.servingSize)*100).toFixed(2);
    }      

   

  //toggling nutritionBreakdownChart ,amino acid chart and protein chart
    const toggleView=(e)=>{
        if(e.target.checked){
          //  console.log(true);

            setCurrentView("You are currently viewing 'Per 100g view' .Toggle to switch to 'Per Serving view'");

            setCalorie(((singleData.nutritionPerServing.energyPerServing/singleData.servingSize)*100).toFixed(2));
            
            setBreakdown({
                labels:["Carbohydrates(g)","Added sugar(out of carbs)(g)","Fat(g)","Protein(g)"] ,
                datasets: [{
                    label:["Carbohydrates(g)","Added sugar(out of carbs)(g)","Fat(g)","Protein(g)"],
                    data : [singleData.nutritionPerServing.carbsPerServing, singleData.nutritionPerServing.addedSugarPerServing,singleData.nutritionPerServing.fatsPerServing,singleData.nutritionPerServing.proteinPerServing].map(breakdownHundred),

                    backgroundColor: [" #86cba1", "#766a5f", " #1f2735","#31797d"],
                    hoverOffset:2,
                }]
            }) 
        
                setProtein({
                labels:["Serving Size/Scoop(g)", "Protein(g)"] ,
                datasets: [{
                    label:[],
                    data : [100, ((singleData.nutritionPerServing.proteinPerServing/singleData.servingSize)*100).toFixed(2)],
                    backgroundColor: [" #507f6a", "#358589"],
                    hoverBorderWidth:1
                }]
            })

                setAminoProfile(
                    singleData.aminoAcidProfile ? 
                    {
                        labels:["Isoleucine(g)","Leucine(g)","Valine(g)","Lysine(g)","Methionine(g)","Phenylalanine(g)","Threonine(g)","Tryptophan(g)","Histidine(g)"] ,
                        datasets: [{
                            label:["Isoleucine(g)","Leucine(g)","Valine(g)","Lysine(g)","Methionine(g)","Phenylalanine(g)","Threonine(g)","Tryptophan(g)","Histidine(g)"],
                            data : [singleData.aminoAcidProfile.Isoleucine, singleData.aminoAcidProfile.Leucine,singleData.aminoAcidProfile.Valine, singleData.aminoAcidProfile.Lysine, singleData.aminoAcidProfile.Methionine, singleData.aminoAcidProfile.Phenylalanine,singleData.aminoAcidProfile.Threonine,singleData.aminoAcidProfile.Tryptophan,singleData.aminoAcidProfile.Histidine].map(aminoHundred),
                            backgroundColor: [" #8e9372", " #accabb", " #2f3b45","#a0a7ae","#cf7d91","#dac295","#a76c4e","#d65e1d","#3a6e61"],
                            hoverOffset: 12, 
                        }]      
                    }
                    :
                    {
                        labels:["No breakdown provided by brand"] ,
                        datasets: [{
                            label:["No data exists"],
                            data : [],
                            backgroundColor: ["#f9fafa"],
                        }]
                    })

    }

        

        else{
           // console.log(false);
            setCurrentView("You are currently viewing 'Per Serving view' .Toggle to switch to 'Per 100g view'");

            setCalorie(singleData.nutritionPerServing.energyPerServing);


            setBreakdown({
                labels:["Carbohydrates(g)","Added sugar(out of carbs)(g)","Fat(g)","Protein(g)"] ,
                datasets: [{
                    label:["Carbohydrates(g)","Added sugar(out of carbs)(g)","Fat(g)","Protein(g)"],
                    data : [singleData.nutritionPerServing.carbsPerServing, singleData.nutritionPerServing.addedSugarPerServing,singleData.nutritionPerServing.fatsPerServing,singleData.nutritionPerServing.proteinPerServing],
                    backgroundColor: [" #94e8b4", "#8f8073", " #2D3A51","#3B969B"],
                    hoverOffset:2,
                }]
            })

    
                setAminoProfile(
                    singleData.aminoAcidProfile ? 
                    {
                        labels:["Isoleucine(g)","Leucine(g)","Valine(g)","Lysine(g)","Methionine(g)","Phenylalanine(g)","Threonine(g)","Tryptophan(g)","Histidine(g)"] ,
                        datasets: [{
                            label:["Isoleucine(g)","Leucine(g)","Valine(g)","Lysine(g)","Methionine(g)","Phenylalanine(g)","Threonine(g)","Tryptophan(g)","Histidine(g)"],
                            data : [singleData.aminoAcidProfile.Isoleucine, singleData.aminoAcidProfile.Leucine,singleData.aminoAcidProfile.Valine, singleData.aminoAcidProfile.Lysine, singleData.aminoAcidProfile.Methionine, singleData.aminoAcidProfile.Phenylalanine,singleData.aminoAcidProfile.Threonine,singleData.aminoAcidProfile.Tryptophan,singleData.aminoAcidProfile.Histidine],
                            backgroundColor: [" #a2a77f", " #BADBCA", " #364652","#b5bec6","#e3879e","#F7DBA7","#C57B57","#f26419","#478978"],
                            hoverOffset: 12,    
                                    
                        }]      
                    }
                :
                {
                        labels:["No breakdown provided by brand"] ,
                        datasets: [{
                            label:["No data exists"],
                            data : [],
                            backgroundColor: ["#f9fafa"],
                        }]
                    }
                
                )
            
            setProtein({
                    labels:["Serving Size/Scoop(g)", "Protein(g)"] ,
                    datasets: [{
                        label:[],
                        data : [singleData.servingSize, singleData.nutritionPerServing.proteinPerServing],
                        backgroundColor: [" #5b9279", "#3B969B"],
                        hoverBorderWidth:1
                    }]
                })

        }

      
    }

    

    return (
    <>      
    <Navbar user={user} watchlist={watchlist}/>

        <div className="singleProduct">
            <div className="topHeader">
                <div className="topHeaderTitle">
                    <span>Supplement facts </span>
                    <TimelineIcon className='topHeaderTitleIcon'/>
                </div>
                <div className="topHeaderToggleButton">
                    <Tooltip  title={currentView}  leaveDelay={400} arrow>
                        <Switch onClick={toggleView}/>
                    </Tooltip>
                </div>
            </div>

            


            <div className="cardContainer">
                <div className="cardItems">
                    <div className="cardDisplay">{calorie}</div>
                    <div className="cardName">Energy(<b>kcal</b>)</div>
                </div>
                <div className="cardItems">
                    <div className="cardDisplay">{protein.datasets[0].data[0]}</div>
                    <div className="cardName">Serving Size(<b>g</b>)</div>
                </div>
                <div className="cardItems">
                    <div className="cardDisplay">{protein.datasets[0].data[1]}</div>
                    <div className="cardName">Protein(<b>g</b>)</div>
                </div>
                <div className="cardItems">
                    <div className="cardDisplay">{(((protein.datasets[0].data[1])/(protein.datasets[0].data[0]))*100).toFixed(2)}</div>
                    <div className="cardName">Protein Content(<b>%</b>)</div>
                </div>
            </div>

             <div className="displayContainer">
                    <div className="productDisplayContainer">
                        <div className="productDisplayContainerLeft">
                            <div className="leftImageContainer">
                                {/* <img src={`/assets/${singleData.id}.png`} className="leftImageContainer-image" /> */}
                                {/* <img src={require(`../../assets/productImages/${singleData.image}`)} className="leftImageContainer-image" /> */}

                                <HtmlTooltip sx={{color:"red"}}placement="left-start"
                                                    title={
                                                    <React.Fragment>
                                                        <Typography variant="h7"><a style={{textDecoration:"underline", color:"rgb(150, 150, 150)"}} href={singleData.imgCitation} target="_blank" rel="noreferrer"><i>Image source</i></a></Typography>
                                                    </React.Fragment>
                                                    }   
                                                leaveDelay={100}>   
                                                    <img src={require(`../../assets/productImages/${singleData.image}`)} alt={singleData.name} className="leftImageContainer-image" />
                                                </HtmlTooltip>
                            </div>
                            <div className="leftNameContainer">{singleData.name}</div>
                            <div className="leftButtonContainer">
                                <Button variant='contained' style={{backgroundColor:"black",width:200,height:50, fontSize:"12px"}} 
                                            className='watchListButton'
                                            onClick={inWatchList ? removeFromWatchList : addToWatchList}
                                >
                                            {inWatchList ? "Remove from watchlist" : "Add to watchlist"}
                                </Button>
                            </div>
                                <Stack spacing={10} sx={{ width: '100%' }}>
                                            <Snackbar anchorOrigin={{ vertical :"left", horizontal:"center" }} open={open} autoHideDuration={5000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                                                        You need to be logged in.
                                                </Alert>
                                            </Snackbar>
                                </Stack>
                                <Stack spacing={10} sx={{ width: '100%' }}>
                                            <Snackbar anchorOrigin={{ vertical :"left", horizontal:"center" }} open={addWatchListSuccess} autoHideDuration={5000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                                        Added to watchlist
                                                </Alert>
                                            </Snackbar>
                                </Stack>
                                <Stack spacing={10} sx={{ width: '100%' }}>
                                            <Snackbar anchorOrigin={{ vertical :"left", horizontal:"center" }} open={removeWatchListSuccess} autoHideDuration={5000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                                        Removed from watchlist
                                                </Alert>
                                            </Snackbar>
                                </Stack>

                        
                        </div>

                        <div className="productDisplayContainerRight">
                            <div className="toolTipContainer">

                                <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        <Typography color="inherit">What are Amino acids ?</Typography>
                                        <em>Amino acids</em>, often referred to as the building blocks of proteins, are compounds that play many critical roles in your body. 
                                         You need them for vital processes such as building proteins, hormones, and neurotransmitters. Unlike non-essential amino acids , essential amino acids are a classification of amino acids, and are those which cannot be synthesized or produced by the body and are required from food or food supplements.
                                         <br/>There are 9 essential amino acids that include leucine, isoleucine, histidine, lysine, methionine, threonine, phenylalanine, tryptophan, and valine. Like fish, eggs and poultry, whey is a complete source of protein which consists of all 9 essential amino acids.
                                         <br/><br/><em><b>This chart </b></em>represents the breakdown of those 9 essential amino acids, which is a key thing to look at in any whey protein's nutrition facts label. <br/><br/>
                                         Hover over each section to view the breakdown or click on any label from the top to un-select it .<br/><br/>
                                         Read more at <em><Link to="/faq" style={{color:"whitesmoke"}}>FAQ</Link></em> section

                                    </React.Fragment>
                                    }
                                leaveDelay={400}>   
                                    <InfoOutlinedIcon/>
                                </HtmlTooltip>
                                
                            </div>
                            <div className="aminoChartContainer">
                                
                                <AminoAcidChart chartData={aminoProfile} options={aminoChartOptions}/>
                                
                            </div>
                            <div className="aminoDescriptionContainer">Essential Amino acid Profile(EAAs)</div>
                            
                        </div>
                    </div>
            </div>

            <div className="bottomContainer">
                <div className="bottomContainerLeft">
                        <PieChart chartData={breakdown} options={calorieBreakdownChartOptions}/>
                        Nutritional Information breakdown   
                </div>
                <div className="bottomContainerRight">
                        <ProteinChart chartData={protein} options={proteinChartOptions}/>
                       Serving size vs Protein content 
                </div>
            </div>
            
        </div>


 <Footer/>

    </>
  )
}
