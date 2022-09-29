import React from 'react'
import myData from "../../data/proteinDatabase.json";
import { useEffect ,useState} from 'react';
import Product from './Product';

export default function PaginationLogic() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // User is currently on this page
    const [recordsPerPage] = useState(6); // No of Records to be displayed on each page 

   
    useEffect(() => {
      setData(myData);
    }, [])
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    
    // Records to be displayed on the current page
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const numberOfPages = Math.ceil(data.length / recordsPerPage);

    // if(Math.random()>0.5){
    //   return new Error("Test error");  
    // }

    return (
    <>
    
    
      <Product data={currentRecords} myData={myData} numberOfPages = { numberOfPages }
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
       />
    
    </>
  )
}
