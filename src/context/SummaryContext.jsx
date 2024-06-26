import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import data from "../data/data.json"
import newdata from "../data/newdata.json"
import axios from "axios";
import fetchData from "../services/fetchSummaryData";

export const SummaryContext = createContext();

export function useSummaryData() {
    return useContext(SummaryContext);
}

export function SummaryDataProvider({ children }) {

    const [summaryData, setSummaryData] = useState([])

    useEffect(() => {
      const fetchDataAsync = async () => {
        try {
          const result = await fetchData();
          setSummaryData(result)
        } catch (error) {
          console.log(error)
        }
      };
  
      fetchDataAsync();
    }, []);
    

  //   useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Define the API endpoint URL
  //       const apiUrl = 'https://us-central1-udhyam-tech.cloudfunctions.net/cloud_sql_api';
    
  //       // Define the data to be sent in the request
  //       const postData = {
  //         "flow_id" : "0",
  //         "query" : "SELECT * FROM student_portfolio.summaries a left join student_portfolio.users b on a.contact_id = b.contact_id where approved = 1"
  //     };
    
  //       const response = await axios.post(apiUrl, postData);
  //       // Handle the successful response here
  //       console.log('POST Response:', response.data.data);
  //       const convertIntoArray = Object.values(response.data.data)
  //       //console.log(convertIntoArray)
  //       setSummaryData(convertIntoArray);
  //     } catch (error) {
  //       // Handle errors here
  //       console.error('POST Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
    

//     const fetchSummary = async () => {
//         try {
            
//             //const response = await axios(data);
//             //const data = await response.json();
//             setSummaryData(data);
//             console.log(data)
//             console.log(summaryData)
// b 
//         } catch (error) {
//             console.error("Error fetching summary:");
//         }

//     }

    useEffect(() => {
        
        //setSummaryData(newdata.data);
        //console.log(newdata.data)
        // console.log(data)

    }, [])
    

    const contextValue = {
        summaryData
    };

return (
    <SummaryContext.Provider value={contextValue}>
      {children}
    </SummaryContext.Provider>
  );
}

SummaryDataProvider.propTypes = {
    children: PropTypes.node, // PropTypes.node allows any valid JSX content
  };
  
export default SummaryDataProvider;