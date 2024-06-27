import React, { useState } from "react";
import search from "/icons/MagnifyingGlass.svg";
import { useSummaryData } from "../context/SummaryContext";
import { Link } from "react-router-dom";

export default function Search() {
  const { handleSetShow, show, summaryData } = useSummaryData();

  console.log("first", summaryData);

  const [searchItem, setSearchItem] = useState("");
  const [filteredSummaries, setFilteredSummaries] = useState(summaryData)


  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredName = summaryData.filter((summary) => summary.contact_name.toLowerCase().includes(searchTerm.toLowerCase()))

    setFilteredSummaries(filteredName)
  };

  return (
    <>
      <div className="search-container relative flex items-center">
        <img src={search} className="absolute bg-teal-900 p-4 rounded-full" />
        <input
          type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type name to search'

          onFocus={() => handleSetShow()}
          onBlur={()=>handleSetShow()}
          className="search w-full border-2 border-gray-300 rounded-full py-4 pl-16 pr-4"
        />
      </div>

      {show && (
        <div className="overlay-screen-container h-screen ">
          <div>
            {filteredSummaries.map((summary) => (
              <Link key={summary.id} to={`/projectDetail/${summary.id}`}
               className="flex items-center p-4 gap-4 border-b-2 border-gray-200 rounded-lg"
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
      )}
    </>
  );
}
