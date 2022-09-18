import React from 'react'
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import "./paginationComponent.css" ;


export default function PaginationComponent({numberOfPages,currentPage,setCurrentPage}) {
  
const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

const handlePrevPage=()=>{
    if(currentPage!==1){
        setCurrentPage(currentPage-1);
    }
  }
const handleNextPage=()=>{
    if(currentPage!==numberOfPages){
        setCurrentPage(currentPage+1);
    }
  }

    return (
        <>
          <div className='paginationComponent'>
                <div className="prevButton" onClick={handlePrevPage}>
                  <WestOutlinedIcon />
                </div> 
                {pageNumbers.map(itemNumber=>(
                    <div key={itemNumber} className={`paginationNumbers ${currentPage===itemNumber ? "active": ""}`} onClick={()=>setCurrentPage(itemNumber)}>
                        <span>{itemNumber}</span>
                    </div> 
                    
                ))}
                <div className="nextButton" onClick={handleNextPage}>
                  <EastOutlinedIcon />
                </div> 

          </div>
    </>
  )
}
