import React, { useEffect, useState } from "react";
import search from "/icons/MagnifyingGlass.svg";
import { useSummaryData } from "../context/SummaryContext";
import { Link } from "react-router-dom";
import close from "/icons/X.svg"

export default function Search() {

  const { handleSetShow, show, summaryData, fetchDataAsync } = useSummaryData();

  const [loading, setLoading] = useState(true)

  const [searchItem, setSearchItem] = useState("");

  const [filteredSummaries, setFilteredSummaries] = useState([])

  const [locallySavedSummaries, setLocallySavedSummaries] = useState([])

  useEffect(() => {
    
    setLocallySavedSummaries(summaryData)
    setFilteredSummaries(summaryData)
    console.log("usee")
  }, [summaryData])

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredName = locallySavedSummaries.filter((summary) => summary.contact_name.toLowerCase().includes(searchTerm.toLowerCase()))

    setFilteredSummaries(filteredName)
    console.log("first", summaryData);

  };

  return (
    <>
      <div className="search-container relative flex items-center ">
        <img src={search} className="absolute bg-teal-900 p-4 rounded-full" />
        <input
          type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type name to search'

          onFocus={() => { 
              handleSetShow()
              fetchDataAsync()
            }}
          onBlur={()=>handleSetShow()}
          className="search w-full border-2 border-gray-300 rounded-full py-4 pl-16 pr-4"
        />
      </div>

      { show === true  &&

        <div className="overlay-screen-container h-screen relative">

            <button className="absolute right-0 py-2 px-4 rounded-full bg-gray-100 flex items-center gap-1" onClick={() => handleSetShow()} > <img src={close} alt="close" /><span className="text-black font-semibold text-lg">Close</span></button>
            <div className="mt-16">
            {filteredSummaries.map((summary) => (
              <Link key={summary.id} to={`/projectDetail/${summary.id}`}
               className="flex items-center p-4 gap-4 border-b-2 border-gray-200 rounded-lg bg-gray-50"
               >  
                <img className="w-16 h-16 rounded-md" src={summary.generated_image_link} alt="/" />
                <div>

                <span className=" text-lg font-semibold flex flex-col">{summary.idea_title}</span>
                <span>{summary.contact_name}</span>
                </div>
                
              </Link>
            ))}
              </div>
      
        </div>
      
      
      }
    </>
  );
}
