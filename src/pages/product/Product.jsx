import React , { useEffect ,useState}from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./product.css"
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../fireBaseConfig/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PaginationComponent from './PaginationComponent';
import Tooltip from '@mui/material/Tooltip';
import Footer from '../../components/footer/Footer';
import proteinBanner from "../../assets/commonImages/proteinBanner.jpg"; 


export default function Product({data, numberOfPages , currentPage, setCurrentPage , myData}) {

    const [search, setSearch] = useState("");
        const [filter, setFilter] = useState("");

        const searchProduct=(e)=>{
            e.preventDefault();
            setSearch(e.target.value.toLowerCase());
        }

        const filterProduct=(e)=>{
            e.preventDefault();
            setFilter(e.target.value.toLowerCase());
        }

        console.log("filter is", filter);

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


    const filterOptions=["MuscleBlaze", "Optimum Nutrition" , "Ultimate Nutrition", "MyProtein","Labrada", "Dymatize Nutrition",
                         "MuscleTech" , "Asitis", "L-MEN" ,"Legion" ,"Transparent Labs" ,"BigMuscles Nutrition" ] ;


    const resetFilter=()=>{
        document.getElementById("select").value=0;
        setFilter("");
    }                        

  return (
    <>
    <Navbar user={user} watchlist={watchlist}/>
    <div className='product'>
                        <div className="bannerContainer">
                            <div className="bannerImageContainer">
                                    <img src={proteinBanner} className="bannerImage" ></img>
                            </div>
                           
                            <div className="bannerHeaderContainer">
                                        <div className="bannerTitle">
                                            <span><hr/></span>
                                            <span className='bannerLogo'>LEANCED</span>
                                            <span><hr/></span>
                                        </div>
                                        <div className="bannerDescription">
                                            All things <em className='supplement'>"supplement"</em>
                                        </div>
                            </div>         
                        </div>
                        
                        <div className="productTitleContainer">
                            <h2>Search for a product</h2>
                        </div>
                    <div className="productContainer">
                        <div className="inputContainer">
                            <Tooltip  title="Make sure to reset the filter before searching" leaveDelay={200} arrow placement="right" >
                                <div className="searchInputContainer">
                                    <span className="searchInputIcon"><SearchOutlinedIcon fontSize="medium"/></span>
                                    <span><input placeholder='Search for a protein' className='searchInput' onChange={searchProduct}/> </span>       
                                </div>
                            </Tooltip>     
                                <div className="filterContainer">

                                
                                    <div className="filterInputContainer">
                                        <select className='filterInput' id="select" onChange={filterProduct} defaultValue={"0"}>
                                            {/* <option value="0" selected disabled>Filter by manufacturer</option> */}
                                            <option value="0" disabled>Filter by manufacturer</option>
                                            {filterOptions.map(ele=>(
                                                <option>{ele}</option>    
                                            ))}
                                            
                                        </select>                                    
                                    </div>

                                    <div className="resetFilterButton" onClick={resetFilter}>
                                        Reset filter
                                    </div>
                                </div>
                               
                               
                        </div>
 
                        { !filter && !search ?
                        data.map(ele=>
                               
                                (

                                    <div className="productListsContainer" >
                                        <div className="imageContainer">
                                             <img className="productImage" title={ele.name} src={require(`../../assets/productImages/${ele.image}`)} onClick={()=>navigate(`/product/${ele.id}`)}/>                                           
                                        </div>

                                        <div className="detailsContainer">
                                            <div className="nameContainer">
                                                {ele.name}
                                            </div>
                                            
                                            <div className="descriptionContainer">
                                                <span>Manufacturer : {ele.brand}</span>
                                                <span>Flavors : {ele.flavours}</span>
                                                <span>Country of origin : {ele.origin}</span>
                                            </div>
                                        </div>  
                                        
                                        <div className="buttonContainer">
                                           
                                                <Button variant='contained' style={{backgroundColor:"black",width:200,height:50}} 
                                                className='supplementButton'
                                                onClick={()=>navigate(`/product/${ele.id}`)}
                                                >
                                                    Supplement facts
                                                </Button>
                                        </div>   
                                </div>
                                        
                                )) 
                            :
                            filter ?
                             myData.map(ele=>
                                ele.name.toLowerCase().includes(filter) &&
                                (

                                    <div className="productListsContainer" >
                                        
                                        <div className="imageContainer">
                                            <img className="productImage" title={ele.name} src={require(`../../assets/productImages/${ele.image}`)} onClick={()=>navigate(`/product/${ele.id}`)}/>
                                            
                                        </div>

                                        <div className="detailsContainer">
                                            <div className="nameContainer">
                                                {ele.name}
                                            </div>
                                            <div className="descriptionContainer">
                                                <span>Manufacturer : {ele.brand}</span>
                                                <span>Flavors : {ele.flavours}</span>
                                                <span>Country of origin : {ele.origin}</span>
                                            </div>
                                        </div>  
                                        
                                        <div className="buttonContainer">
                                            <Button variant='contained' style={{backgroundColor:"black",width:200,height:50}} 
                                            className='button'
                                            onClick={()=>navigate(`/product/${ele.id}`)}
                                            >
                                                Supplement facts
                                            </Button>
                                          
                                        </div>
                                      
                                        
                                </div>
                                        
                                ))
                                :
                                search ?
                             myData.map(ele=>
                                ele.name.toLowerCase().includes(search) &&
                                (

                                    <div className="productListsContainer" >
                                        
                                        <div className="imageContainer">
                                            <img className="productImage" title={ele.name} src={require(`../../assets/productImages/${ele.image}`)} onClick={()=>navigate(`/product/${ele.id}`)}/>
                                            
                                        </div>

                                        <div className="detailsContainer">
                                            <div className="nameContainer">
                                                {ele.name}
                                            </div>
                                            <div className="descriptionContainer">
                                                <span>Manufacturer : {ele.brand}</span>
                                                <span>Flavors : {ele.flavours}</span>
                                                <span>Country of origin : {ele.origin}</span>
                                            </div>
                                        </div>  
                                        
                                        <div className="buttonContainer">
                                            <Button variant='contained' style={{backgroundColor:"black",width:200,height:50}} 
                                            className='button'
                                            onClick={()=>navigate(`/product/${ele.id}`)}
                                            >
                                                Supplement facts
                                            </Button>
                                          
                                        </div>
                                      
                                        
                                </div>
                                        
                                ))
                                :""
                            }                                    
                    </div>


                    <div className="paginationComponentContainer">
                        <div className="paginationList">
                                 <PaginationComponent
                                        numberOfPages = { numberOfPages }
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                />
                        </div>
                    </div>
                
        </div>
        
        <Footer/>

    </>
  )
}
